import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from "../context/useMap.js"
import MarkerList from "../markers/markerList.jsx"
import MarkerForm from "../markers/MarkerForm.jsx"


export default function MapView() {
    const {modal, markers} = useMap()

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
                        <Popup>{m.title} <br/> {m.subtitle} </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {modal?.type === 'list' && <MarkerList />}
            {modal?.type === 'add' && <MarkerForm />}
            {modal?.type === 'edit' && <MarkerForm />}
        </>
    )
}