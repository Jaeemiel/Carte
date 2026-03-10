import {useContext} from "react";
import {MapContext} from "./MapContext.js"
export function useMap() {
    return useContext(MapContext)
}