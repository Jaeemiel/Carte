import { MapProvider} from './context/MapProvider.jsx'
import Layout from "./components/Layout.jsx";
import MapView from "./components/MapView.jsx";


function App() {
    return (
        <MapProvider>
            <Layout>
                <MapView />
            </Layout>
        </MapProvider>
    )
}

export default App