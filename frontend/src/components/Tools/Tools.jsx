import { forwardRef, memo, useRef } from 'react'
import { createPortal } from 'react-dom'
import 'external-svg-loader'

export const Avatar = memo(
  forwardRef(({ src, alt = '', size = 100 }, ref) => {
    return (
      <img
        className="avatar"
        ref={ref}
        src={src ?? 'https://picsum.photos/200/300'}
        alt={alt}
        width={size}
        height={size}
      />
    )
  })
)

export const Icon = ({ name, size = 25, className, ...props }) => {
  return (
    <svg
      data-src={`/${name}.svg`}
      data-cache="disabled"
      width={size}
      height={size}
      className={`icon ${className}`}
      {...props}
    />
  )
}

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
