// import {useMap} from "../context/useMap.js";
//
// export default function Header() {
//     const {setModal} = useMap()
//     return (
//         <div>
//             <h1>CARTE</h1>
//             <div>
//                 <button onClick={() => setModal({type: 'list'})}>Liste des marqueurs</button>
//                 <button onClick={() => setModal({type: 'add'})}>Ajouter un marqueur</button>
//             </div>
//             // STYLE 1 — Sombre avec boutons colorés
//             <div style={{ background: '#2d3748', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <h1 style={{ color: '#fff', margin: 0, fontSize: 20, flex: 1 }}>CARTE</h1>
//                 <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px' }}>
//                     Liste
//                 </button>
//                 <button style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px' }}>
//                     Ajouter
//                 </button>
//             </div>
//
//             // STYLE 2 — Clair minimaliste avec bordure
//             <div style={{ background: '#2d3748', borderBottom: '2px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <h1 style={{ color: '#111', margin: 0, fontSize: 20, flex: 1 }}>CARTE</h1>
//                 <button style={{ background: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: 4, padding: '6px 14px' }}>
//                     Liste
//                 </button>
//                 <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px' }}>
//                     Ajouter
//                 </button>
//             </div>
//
//             // STYLE 3 — Bleu professionnel
//             <div style={{ background: '#2d3748', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <h1 style={{ color: '#fff', margin: 0, fontSize: 20, flex: 1 }}>CARTE</h1>
//                 <button style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 6, padding: '8px 16px' }}>
//                     Liste
//                 </button>
//                 <button style={{ background: '#fff', color: '#1d4ed8', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600 }}>
//                     Ajouter
//                 </button>
//             </div>
//
//             // STYLE 4 — Vert nature
//             <div style={{ background: '#2d3748', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <h1 style={{ color: '#fff', margin: 0, fontSize: 20, flex: 1 }}>CARTE</h1>
//                 <button style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '8px 16px' }}>
//                     Liste
//                 </button>
//                 <button style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px' }}>
//                     Ajouter
//                 </button>
//             </div>
//         </div>
//     )
// }

// Header.jsx


import { useMap } from "../context/useMap.js"

export default function Header() {
    const { setModal } = useMap()

    return (
        <div className="d-flex align-items-center px-4 py-2" style={{ background: '#2d3748', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            <h1 className="text-white fw-bold m-0 me-auto" style={{ letterSpacing: '0.1em', fontSize: 20 }}>
                CARTE
            </h1>
            <div className="d-flex gap-2">
                <button onClick={() => setModal({ type: 'list' })}
                        className="btn btn-outline-light btn-sm">
                    <i className="bi bi-list-ul me-2"></i>Liste
                </button>
                <button onClick={() => setModal({ type: 'add' })}
                        className="btn btn-success btn-sm">
                    <i className="bi bi-plus-lg me-2"></i>Ajouter
                </button>
            </div>
        </div>
    )
}