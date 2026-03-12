import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from "../context/useMap.js"
import MarkerList from "../markers/MarkerList.jsx"
import MarkerForm from "../markers/MarkerForm.jsx"

export default function MapView() {
    const {modal, markers, setModal, deleteMarker} = useMap()

    return (
        <>
            <MapContainer center={[43.8934, -0.5002]} zoom={13} scrollWheelZoom={true}
                          style={{height: "100vh", width: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map(m => (
                    <Marker key={m.id} position={[m.lat, m.lng]}>
                        <Popup>
                            <div className="fw-semibold mb-1">{m.title}</div>
                            {m.subtitle && <div className="text-muted mb-2" style={{ fontSize: 12 }}>{m.subtitle}</div>}
                            <div className="d-flex gap-2 justify-content-end">
                                <button onClick={() => setModal({ type: 'edit', marker: m })}
                                        className="btn btn-sm btn-outline-warning">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button onClick={() => deleteMarker(m.id)}
                                        className="btn btn-sm btn-outline-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {modal?.type === 'list' && <MarkerList />}
            {modal?.type === 'add' && <MarkerForm />}
            {modal?.type === 'edit' && <MarkerForm />}
        </>
    )
}