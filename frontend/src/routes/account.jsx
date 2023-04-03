import { useAuth } from '../components/providers/AuthProvider'

export default function Account() {
  const { user } = useAuth()

  return (
    <main className="container-md account">
      <div className="account-personal">
        <img
          className="account-logo"
          src="https://picsum.photos/200/300"
          alt=""
        />
        <form className="account-form-personal">
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
              <input
                type="new_password"
                name="new_password"
                id="new_password"
              />
            </p>
            <p>
              <label htmlFor="repeat_password">Répéter mot de passe</label>
              <input
                type="repeat_password"
                name="repeat_password"
                id="repeat_password"
              />
            </p>
          </div>
          <button className="btn primary">Mettre à jour</button>
        </form>
      </div>
    </main>
  )
}
