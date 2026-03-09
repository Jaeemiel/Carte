import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function App() {
    return (
        <MapContainer center={[43.8934, -0.5002]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[43.8913239197773, -0.5051401743713332]}>
                <Popup>
                    Centre AFPA <br /> CANDAU
                </Popup>
            </Marker>
            <Marker position={[43.897170501736056, -0.4921505257801499]}>
                <Popup>
                    Centre AFPA <br /> BOSQUET
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default App