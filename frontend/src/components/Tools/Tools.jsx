import { useField } from 'formik'
import { forwardRef, memo } from 'react'
import 'external-svg-loader'

export const InputField = memo(({ label = '', ...props }) => {
  const [field, meta, helpers] = useField(props)
  return (
    <p>
      <label htmlFor={props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="invalid">{meta.error}</span>
      ) : null}
    </p>
  )
})

export const SelectField = memo(({ label, children, ...props }) => {
  const [field, meta, helpers] = useField(props)
  return (
    <p>
      <label htmlFor={props.name}>{label}</label>
      <select {...field} {...props}>
        {children}
      </select>
      {meta.touched && meta.error ? (
        <span className="invalid">{meta.error}</span>
      ) : null}
    </p>
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

export const ButtonLoader = (props) => {
  const { children, isLoading, ...other } = props

  return (
    <button disabled={isLoading} {...other}>
      {isLoading && <time-indicator></time-indicator>}
      {!isLoading ? children : null}
    </button>
  )
}

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
