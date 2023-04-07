import { updateUser } from '../../api/account'
import { useAuth } from '../providers/AuthProvider'
import { InputField } from '../Tools'
import ImageField from '../ImageField'

export default function PersonalForm() {
  const { user, login } = useAuth()

  const handleSubmit = function (e) {
    e.preventDefault()
    const user = new FormData(e.target)
    updateUser(user).then(login)
  }

  return (
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
  )
}
