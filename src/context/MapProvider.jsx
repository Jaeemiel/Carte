import { useState } from "react"
import {MapContext} from "./MapContext.js";
import {getMarkers, saveMarkers} from "../utils/storage.js";


// let nextId = 1
// let nextId = getMarkers().reduce((max, m) => Math.max(max, m.id), 0) + 1
let genNextId = () => getMarkers().reduce((max, m) => Math.max(max, m.id), 0) + 1

export function MapProvider({ children }) {
    const [markers, setMarkers] = useState(getMarkers)
    const [modal, setModal] = useState(null)

    const addMarker = (title, subtitle, address, lat, lng) => {
        console.log('addMarker:', title, subtitle, lat, lng, typeof lat, typeof lng)
        const updated = ([...markers, { id: genNextId(), title, subtitle, address ,lat: parseFloat(lat), lng: parseFloat(lng) }])
        setMarkers(updated)
        saveMarkers(updated)
    }

    const editMarker = (id, title, subtitle, address, lat, lng) => {
        const updated= (markers.map(m => m.id === id ? { ...m, title, subtitle, address ,lat: parseFloat(lat), lng: parseFloat(lng) } : m))
        setMarkers(updated)
        saveMarkers(updated)
    }

    const deleteMarker = (id) => {
        const updated = (markers.filter(m => m.id !== id))
        setMarkers(updated)
        saveMarkers(updated)
    }

    return (
        <MapContext.Provider value={{ markers, modal, setModal, addMarker, editMarker, deleteMarker }}>
            {children}
        </MapContext.Provider>
    )
}

