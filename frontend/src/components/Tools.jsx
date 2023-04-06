import { forwardRef, memo } from 'react'

export const InputField = memo((props) => {
  const { type = 'text', name, label, ...other } = props
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} {...other} />
    </>
  )
})

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
