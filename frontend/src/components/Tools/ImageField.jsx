import { useRef } from 'react'
import { Avatar } from './Tools'

/**
 * Réprésente un champ de formulaire pour l'upload d'image
 * @param {object}
 * @returns
 */
export default function ImageField({ name, src, alt = '', setFieldValue }) {
  const imageRef = useRef(null)

  const handleChange = function (e) {
    const file = e.target.files[0]
    // Si on est dans un formulaire formik
    if (setFieldValue) {
      setFieldValue(name, file)
    }
    if (file?.name) {
      imageRef.current.src = URL.createObjectURL(file)
    }
  }

  return (
    <label htmlFor={name} className="image-field">
      <Avatar ref={imageRef} src={src} alt={alt} />
      <input type="file" name={name} id={name} onChange={handleChange} />
    </label>
  )
}
