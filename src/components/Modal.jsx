export default function Modal({ title, onClose, children }) {
    return (
        <div style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#fff', borderRadius: 8, padding: 24,
                minWidth: 400, maxWidth: 600, width: '90%', position: 'relative'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
                </div>

                {/* Contenu dynamique */}
                {children}

                {/* Footer */}
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                    <button onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    )
}