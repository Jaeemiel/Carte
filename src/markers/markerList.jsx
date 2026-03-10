import Modal from "../components/Modal.jsx"
import { useMap } from "../context/useMap.js"
import { RoundIcon } from "../components/UI.jsx"

export default function MarkerList() {
    const { markers, deleteMarker, setModal } = useMap()

    return (
        <Modal title="Liste des marqueurs" onClose={() => setModal(null)}>
            {markers.length === 0 ? (
                <div className="text-center py-4 text-muted">
                    <i className="bi bi-geo-alt fs-1"></i>
                    <p className="mt-2">Aucun marqueur ajouté</p>
                </div>
            ) : (
                <div className="d-flex flex-column gap-2">
                    {markers.map(m => (
                        <div key={m.id} className="d-flex align-items-center justify-content-between p-3 rounded-3"
                             style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}>

                            <div className="d-flex align-items-center gap-3">
                                <RoundIcon icon="bi-geo-alt-fill" size={40} />
                                <div>
                                    <div className="fw-semibold" style={{ fontSize: 14 }}>{m.title}</div>
                                    {m.subtitle && <div className="text-muted" style={{ fontSize: 12 }}>{m.subtitle}</div>}
                                    <div className="text-muted" style={{ fontSize: 11 }}>
                                        <i className="bi bi-crosshair me-1"></i>
                                        {m.lat.toFixed(4)}, {m.lng.toFixed(4)}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button onClick={() => setModal({ type: 'edit', marker: m })}
                                        className="btn btn-sm btn-outline-warning">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button onClick={() => deleteMarker(m.id)}
                                        className="btn btn-sm btn-outline-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </Modal>
    )
}