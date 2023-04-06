import { useRef } from 'react'

export default function ImageField({ name, src, alt = '' }) {
  const imageRef = useRef(null)

  const handleChange = function (e) {
    const file = e.target.files[0]
    if (file?.name) {
      imageRef.current.src = URL.createObjectURL(file)
    }
  }

  return (
    <label htmlFor={name} className="image-field">
      <img
        ref={imageRef}
        src={src ?? 'https://picsum.photos/200/300'}
        alt={alt}
      />
      <input type="file" name={name} id={name} onChange={handleChange} />
    </label>
  )
}