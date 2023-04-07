import { InputField } from '../Tools'

export default function PasswordForm() {
  const handleSubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
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
  )
}
