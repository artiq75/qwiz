import { useAuth } from '../components/providers/AuthProvider'
import ImageField from '../components/ImageField'
import { updateImage } from '../api/account'
import { InputField } from '../components/Tools'

export default function Account() {
  const { user, login } = useAuth()

  const handleSubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const image = data.get('image')
    if (image.name) {
      updateImage(image).then(login(user))
    }
  }

  return (
    <main className="container-md account">
      <h2 className="txt-center">Personnel</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <ImageField name="image" src={user.image} />
        <div className="g2 gap1">
          <p>
            <InputField
              name="username"
              label="Pseaudo"
              defaultValue={user.username}
            />
          </p>
          <p>
            <InputField name="email" label="Email" defaultValue={user.email} />
          </p>
        </div>
        <button className="btn primary" type="submit">
          Mettre à jour
        </button>
      </form>
      <h2 className="txt-center">Mot de passe</h2>
      <form>
        <p>
          <InputField name="current_password" label="Mot de passe actuelle" />
        </p>
        <div className="g2 gap1">
          <p>
            <InputField name="new_password" label="Nouveau mot de passe" />
          </p>
          <p>
            <InputField
              name="repeat_password"
              label="Répéter nouveau mot de passe"
            />
          </p>
        </div>
        <button className="btn primary" type="submit">
          Mettre à jour
        </button>
      </form>
    </main>
  )
}
