export function RoundIcon({ icon, size = 40, color = '#2d3748', className = '' }) {
    return (
        <div className={`rounded-circle d-flex align-items-center justify-content-center ${className}`}
             style={{ width: size, height: size, background: color, flexShrink: 0 }}>
            <i className={`bi ${icon} text-white fs-4`}></i>
        </div>
    )
}

export function FormLabel({ icon, children }) {
    return (
        <label className="form-label fw-semibold">
            <i className={`bi ${icon} me-2 text-muted`}></i>
            {children}
        </label>
    )
}