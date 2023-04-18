import { useField } from 'formik'
import { memo } from 'react'

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
