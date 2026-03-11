import { useMap } from "../context/useMap.js"

export default function Header() {
    const { setModal } = useMap()

    return (
        <div className="d-flex align-items-center px-4 py-2" style={{ background: '#2d3748', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            <h1 className="text-white fw-bold m-0 me-auto" style={{ letterSpacing: '0.1em', fontSize: 20 }}>
                CARTE
            </h1>
            <div className="d-flex gap-2">
                <button onClick={() => setModal({ type: 'list' })}
                        className="btn btn-outline-light btn-sm">
                    <i className="bi bi-list-ul me-2"></i>Liste
                </button>
                <button onClick={() => setModal({ type: 'add' })}
                        className="btn btn-success btn-sm">
                    <i className="bi bi-plus-lg me-2"></i>Ajouter
                </button>
            </div>
        </div>
    )
}