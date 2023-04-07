import { updatePassword } from '../../api/account'
import { InputField } from '../Tools'
import { useAuth } from '../providers/AuthProvider'

export default function PasswordForm() {
  const { logout } = useAuth()

  const handleSubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    if (data.get('repeatPassword') !== data.get('password')) {
      return
    }
    updatePassword({
      password: data.get('password'),
      oldPassword: data.get('oldPassword')
    }).then(() => logout()) // On déconnecte l'utilisateur on cas de succès
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <InputField
          type="password"
          name="oldPassword"
          label="Mot de passe actuelle"
        />
      </p>
      <div className="g2 gap1">
        <p>
          <InputField
            type="password"
            name="password"
            label="Nouveau mot de passe"
          />
        </p>
        <p>
          <InputField
            type="password"
            name="repeatPassword"
            label="Répéter nouveau mot de passe"
          />
        </p>
      </div>
      <button className="btn primary" type="submit">
        Mettre à jour
      </button>
    </form>
  )
}
