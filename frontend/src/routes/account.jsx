import { useAuth } from '../components/providers/AuthProvider'
import { BASE_URL } from '../constants/app'
import ImageField from '../components/ImageField'

export default function Account() {
  const { user } = useAuth()

  const handleSubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)

    console.log(data)
  }

  return (
    <main className="container-md account">
      <form className="account-form" onSubmit={handleSubmit}>
        <ImageField
        id={"image"}
          src={
            user.image
              ? `${BASE_URL + user.image}`
              : 'https://picsum.photos/200/300'
          }
        />
        <div className="g2 gap1">
          <p>
            <label htmlFor="username">Pseudo</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={user.username}
            />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
            />
          </p>
        </div>
        <p>
          <label htmlFor="current_password">Mot de passe actuelle</label>
          <input type="text" name="current_password" id="current_password" />
        </p>
        <div className="g2 gap1">
          <p>
            <label htmlFor="new_password">Nouveau mot de passe</label>
            <input type="new_password" name="new_password" id="new_password" />
          </p>
          <p>
            <label htmlFor="repeat_password">
              Répéter nouveau mot de passe
            </label>
            <input
              type="repeat_password"
              name="repeat_password"
              id="repeat_password"
            />
          </p>
        </div>
        <button className="btn primary">Mettre à jour</button>
      </form>
    </main>
  )
}
