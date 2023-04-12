import { useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, onClose }) {
  const modalRef = useRef(null)

  return createPortal(
    <div className="modal card" ref={modalRef}>
      <button className="modal-close" onClick={onClose}>
        x
      </button>
      {children}
    </div>,
    document.body
  )
}
