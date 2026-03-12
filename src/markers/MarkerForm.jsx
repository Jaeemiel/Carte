import Modal from "../components/Modal.jsx"
import { useMap } from "../context/useMap.js"
import { RoundIcon, FormLabel } from "../components/UIComponents.jsx"
import {useCallback, useRef, useState} from "react";

export default function MarkerForm() {
    const { modal, setModal, addMarker, editMarker } = useMap()
    const isEdit = modal?.type === 'edit'
    const existing = modal?.marker

    const [title, setTitle] = useState(existing?.title || '')
    const [subtitle, setSubtitle] = useState(existing?.subtitle || '')
    const [address, setAddress] = useState(existing?.address || '')
    const [lat, setLat] = useState(existing?.lat ?? '')
    const [lng, setLng] = useState(existing?.lng ?? '')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    // pour éviter les appels API à chaque touche
    const debounceRef = useRef(null)
    // -1 = aucune sélection
    const [activeIndex, setActiveIndex] = useState(-1)

    const [addressDirty, setAddressDirty] = useState(false)

    const searchAddress = useCallback(async (query)=> {
        if(query.length < 3){
            setSuggestions([]);
            return
        }
        const response = await fetch(
            `https://data.geopf.fr/geocodage/search?autocomplete=1&q=${encodeURIComponent(query)}&index=address&limit=5`
        )
        const data = await response.json()
        setSuggestions(data.features)
        setShowSuggestions(true)
    },[])


    const handleAddressChange = (e)=>{
        const value = e.target.value
        setAddress(value)
        setAddressDirty(true) // <- l'utilisateur a retapé manuellement
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(()=> searchAddress(value),300)
    }

    const handleSelectSuggestion = (feature) => {
        const [lng, lat] = feature.geometry.coordinates
        setAddress(feature.properties.label)
        setLat(lat)
        setLng(lng)
        setAddressDirty(false) // <- coord synchros avec l'adresse
        setSuggestions([])
        setShowSuggestions(false)
    }

    const handleKeyDown = (e) => {
        if(!showSuggestions || suggestions.length === 0) return

        switch (e.key){
            case 'ArrowDown':
                e.preventDefault() //évite de bouger le curseur dans l'input
                setActiveIndex(i => Math.min(i+1, suggestions.length - 1))
                break
            case 'ArrowUp':
                e.preventDefault()
                setActiveIndex(i => Math.max(i-1, 0))
                break
            case 'Enter':
                if(activeIndex >= 0){
                    e.preventDefault() // evite de soumettre le formulaire
                    handleSelectSuggestion(suggestions[activeIndex])
                    setActiveIndex(-1)
                }
                break
            case 'Escape':
                setShowSuggestions(false)
                setActiveIndex(-1)
                break
        }
    }

    const handleSubmit = async (formData) => {
        const title = formData.get('title')
        const subtitle = formData.get('subtitle')
        const address = formData.get('address')
        let lat = parseFloat(formData.get('lat'))
        let lng = parseFloat(formData.get('lng'))

        console.log(Object.fromEntries(formData))

        if ((isNaN(lat) || isNaN(lng) || addressDirty) && address) {
            try {
                const response = await fetch(
                    `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(address)}&index=address&limit=1`
                )
                const data = await response.json()
                if (data.features?.length > 0) {
                    const [lon, lati] = data.features[0].geometry.coordinates
                    lat = lati
                    lng = lon
                }
            } catch (e) {
                console.error("Erreur API",e)
            }
            setAddressDirty(false)
        }

        if (!title || isNaN(lat) || isNaN(lng)) return

        if (isEdit) {
            editMarker(existing.id, title, subtitle, address, lat, lng)
        } else {
            addMarker(title, subtitle, address, lat, lng)
        }
        setModal(null)
    }

    return (
        <Modal title={isEdit ? "Modifier un marqueur" : "Ajouter un marqueur"} onClose={() => setModal(null)}>

            <div className="d-flex justify-content-center mb-4">
                <RoundIcon icon={isEdit ? 'bi-pencil' : 'bi-geo-alt-fill'} size={56} />
            </div>
            <form action={handleSubmit}>
                <div className="mb-3">
                    <FormLabel icon="bi-tag">Titre du POI</FormLabel>
                    <input name="title" type="text" className="form-control" placeholder="Nom du marqueur"
                           value={title} onChange={e => setTitle(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <FormLabel icon="bi-card-text">
                        Sous-titre <span className="text-muted fw-normal" style={{ fontSize: 12 }}>(optionnel)</span>
                    </FormLabel>
                    <input name="subtitle" type="text" className="form-control" placeholder="Sous-titre"
                           value={subtitle} onChange={e => setSubtitle(e.target.value)}/>
                </div>

                <div className="mb-3 position-relative">
                    <FormLabel icon="bi-search">Adresse</FormLabel>
                    <input name = "address" type="text" className="form-control"
                           placeholder="10 rue de la paix, Paris"
                           value={address}
                           onChange={(e)=>{handleAddressChange(e); setActiveIndex(-1)}}
                           onKeyDown={handleKeyDown}
                           onBlur={() => setTimeout(() => { setShowSuggestions(false); setActiveIndex(-1) }, 200)}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="list-group position-absolute w-100 shadow" style={{ zIndex: 1000, top: '100%' }}>
                            {suggestions.map((f, i) => (
                                <li key={i}
                                    className={`list-group-item list-group-item-action ${i === activeIndex ? 'active' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onMouseDown={() => handleSelectSuggestion(f)}>
                                    {f.properties.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mb-4">
                    <FormLabel icon="bi-crosshair">Position du POI</FormLabel>
                    <div className="d-flex gap-2">
                        <input name="lat" type="number" step="any" className="form-control" placeholder="Latitude"
                               value={lat} onChange={e => setLat(e.target.value)}/>
                        <input name="lng" type="number" step="any" className="form-control" placeholder="Longitude"
                               value={lng} onChange={e => setLng(e.target.value)}/>
                    </div>
                    <div className="form-text">Exemple : 43.8934 / -0.5002</div>
                </div>

                <button type="submit"
                        className={`btn w-100 text-white ${isEdit ? 'btn-warning' : 'btn-success'}`}>
                    <i className={`bi ${isEdit ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                    {isEdit ? "Enregistrer les modifications" : "Ajouter le marqueur"}
                </button>
            </form>
        </Modal>
    )
}