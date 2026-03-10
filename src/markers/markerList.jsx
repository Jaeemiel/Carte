import Modal from "../components/Modal.jsx"
import { useMap } from "../context/useMap.js"

export default function MarkerList() {
    const { markers, deleteMarker, setModal } = useMap()

    return (
        <Modal title="Liste des marqueurs" onClose={() => setModal(null)}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Titre</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Lat, Long</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {markers.map(m => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '8px 12px' }}>{m.id}</td>
                        <td style={{ padding: '8px 12px' }}>{m.title}</td>
                        <td style={{ padding: '8px 12px' }}>{m.lat.toFixed(3)}, {m.lng.toFixed(3)}</td>
                        <td style={{ padding: '8px 12px', display: 'flex', gap: 6 }}>
                            <button onClick={() => setModal({ type: 'edit', marker: m })}>Modifier</button>
                            <button onClick={() => deleteMarker(m.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                {markers.length === 0 && (
                    <tr>
                        <td colSpan={4} style={{ padding: 16, textAlign: 'center', color: '#999' }}>
                            Aucun marqueur
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </Modal>
    )
}