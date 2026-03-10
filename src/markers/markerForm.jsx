import { useState } from "react"
import Modal from "../components/Modal.jsx"
import { useMap } from "../context/useMap.js"
import { RoundIcon, FormLabel } from "../components/UI.jsx"

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
        const lat = parseFloat(parts[0].trim())
        const lng = parseFloat(parts[1].trim())
        if (!title || isNaN(lat) || isNaN(lng)) return

        if (isEdit) {
            editMarker(existing.id, title, subtitle, lat, lng)
        } else {
            addMarker(title, subtitle, lat, lng)
        }
        setModal(null)
    }

    return (
        <Modal title={isEdit ? "Modifier un marqueur" : "Ajouter un marqueur"} onClose={() => setModal(null)}>

            <div className="d-flex justify-content-center mb-4">
                <RoundIcon icon={isEdit ? 'bi-pencil' : 'bi-geo-alt-fill'} size={56} />
            </div>

            <div className="mb-3">
                <FormLabel icon="bi-tag">Titre du POI</FormLabel>
                <input type="text" className="form-control" placeholder="Nom du marqueur"
                       value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="mb-3">
                <FormLabel icon="bi-card-text">
                    Sous-titre <span className="text-muted fw-normal" style={{ fontSize: 12 }}>(optionnel)</span>
                </FormLabel>
                <input type="text" className="form-control" placeholder="Sous-titre"
                       value={subtitle} onChange={e => setSubtitle(e.target.value)} />
            </div>

            <div className="mb-4">
                <FormLabel icon="bi-crosshair">Position du POI</FormLabel>
                <input type="text" className="form-control" placeholder="lat , long"
                       value={position} onChange={e => setPosition(e.target.value)} />
                <div className="form-text">Exemple : 43.8934, -0.5002</div>
            </div>

            <button onClick={handleSubmit}
                    className={`btn w-100 text-white ${isEdit ? 'btn-warning' : 'btn-success'}`}>
                <i className={`bi ${isEdit ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                {isEdit ? "Enregistrer les modifications" : "Ajouter le marqueur"}
            </button>

        </Modal>
    )
}