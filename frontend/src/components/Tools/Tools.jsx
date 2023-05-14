import { Children, forwardRef, memo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import 'external-svg-loader'
import { CloseButton } from './Button/Tools'

export const Avatar = memo(
  forwardRef(({ src, alt = '', size = 100 }, ref) => {
    return (
      <img
        className="avatar"
        ref={ref}
        src={
          src ||
          'https://source.boringavatars.com/beam/40/Stefan?colors=264653,f4a261,e76f51'
        }
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

export function Modal({ children, onClose }) {
  const modalRef = useRef(null)

  return createPortal(
    <div className="modal card" ref={modalRef}>
      <CloseButton onClose={onClose} />
      {children}
    </div>,
    document.body
  )
}

export function Alert({ type = 'success', children, onClose }) {
  return (
    <div className={`alert ${type} mb1`}>
      <CloseButton onClose={onClose} />
      {children}
    </div>
  )
}
