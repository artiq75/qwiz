import { useRef } from 'react'

export default function ImageField({ id, src }) {
  const imageRef = useRef(null)

  const handleChange = function (e) {
    const file = e.target.files[0]
    imageRef.current.src = URL.createObjectURL(file)
  }

  return (
    <label htmlFor={id} className='image-field'>
      <img ref={imageRef} src={src} alt="" />
      <input type="file" name={id} id={id} onChange={handleChange} />
    </label>
  )
}
