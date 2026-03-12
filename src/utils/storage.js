const KEY = 'markers'
const DEFAULT_MARKERS = [
    { id: 1, title: 'Centre AFPA', subtitle: 'CANDAU', lat: 43.8913239197773, lng: -0.5051401743713332 },
    { id: 2, title: 'Centre AFPA', subtitle: 'BOSQUET', lat: 43.897170501736056, lng: -0.4921505257801499 },
]

export function getMarkers(){
    const data = localStorage.getItem(KEY)
    return data? JSON.parse(data) : DEFAULT_MARKERS
}

export function saveMarkers(markers){
    localStorage.setItem(KEY, JSON.stringify(markers))
}