import { useState } from "react"
import {MapContext} from "./MapContext.js";


let nextId = 1

export function MapProvider({ children }) {
    const [markers, setMarkers] = useState([
        { id: nextId++, title: 'Centre AFPA', subtitle: 'CANDAU', lat: 43.8913239197773, lng: -0.5051401743713332 },
        { id: nextId++, title: 'Centre AFPA', subtitle: 'BOSQUET', lat: 43.897170501736056, lng: -0.4921505257801499 },
    ])
    const [modal, setModal] = useState(null)

    const addMarker = (title, subtitle, address, lat, lng) => {
        // console.log('addMarker:', title, subtitle, lat, lng, typeof lat, typeof lng)
        setMarkers([...markers, { id: nextId++, title, subtitle, address ,lat: parseFloat(lat), lng: parseFloat(lng) }])
    }

    const editMarker = (id, title, subtitle, address, lat, lng) => {
        setMarkers(markers.map(m => m.id === id ? { ...m, title, subtitle, address ,lat: parseFloat(lat), lng: parseFloat(lng) } : m))
    }

    const deleteMarker = (id) => {
        setMarkers(markers.filter(m => m.id !== id))
    }

    return (
        <MapContext.Provider value={{ markers, modal, setModal, addMarker, editMarker, deleteMarker }}>
            {children}
        </MapContext.Provider>
    )
}

