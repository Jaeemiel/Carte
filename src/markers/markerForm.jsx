import { useState } from "react"
import Modal from "../components/Modal.jsx"
import { useMap } from "../context/useMap.js"

export default function MarkerForm() {
    const { modal, setModal, addMarker, editMarker } = useMap()
    const isEdit = modal?.type === 'edit'
    const existing = modal?.marker

    const [title, setTitle] = useState(existing?.title || '')
    const [subtitle, setSubtitle] = useState(existing?.subtitle || '')
    const [position, setPosition] = useState(
        existing ? `${existing.lat}, ${existing.lng}` : ''
    )

    const handleSubmit = () => {
        const parts = position.split(',')
        console.log('parts:', parts)
        const lat = parseFloat(parts[0].trim())
        const lng = parseFloat(parts[1].trim())
        console.log('lat:', lat, 'lng:', lng)
        // const [lat, lng] = position.split(',').map(v => parseFloat(v.trim()))
        if (!title || isNaN(lat) || isNaN(lng)) return

        if (isEdit) {
            editMarker(existing.id, title, subtitle, lat, lng)
        } else {
            addMarker(title, subtitle, lat, lng)
        }
        setModal(null)
    }

    return (
        <Modal title={isEdit ? "MODIFIER UN MARQUEUR" : "AJOUTER UN MARQUEUR"} onClose={() => setModal(null)}>
            <p>Titre du POI</p>
            <input placeholder="Nom du marqueur" value={title} onChange={e => setTitle(e.target.value)}
                   style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box' }} />
            <p>Sous-titre du POI</p>
            <input placeholder="Nom du marqueur" value={subtitle} onChange={e => setSubtitle(e.target.value)}
                   style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box' }} />
            <p>Position du POI</p>
            <input placeholder="lat , long" value={position} onChange={e => setPosition(e.target.value)}
                   style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box' }} />
            <button onClick={handleSubmit} style={{ marginTop: 16 }}>
                {isEdit ? "Enregistrer" : "Ajouter le POI"}
            </button>
        </Modal>
    )
}