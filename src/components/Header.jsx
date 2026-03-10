import {useMap} from "../context/useMap.js";

export default function Header() {
    const {setModal} = useMap()
    return (
        <div>
            <h1>CARTE</h1>
            <div>
                <button onClick={() => setModal({type: 'list'})}>Liste des marqueurs</button>
                <button onClick={() => setModal({type: 'add'})}>Ajouter un marqueur</button>
                <button onClick={() => setModal({type: 'edit'})}>Modifier un marqueur</button>
                <button onClick={() => setModal({type: 'delete'})}>Supprimer un marqueur</button>
            </div>
        </div>
    )
}