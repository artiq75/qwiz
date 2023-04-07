import PersonalForm from '../components/Account/PersonalForm'
import PasswordForm from '../components/Account/PasswordForm'

export default function Account() {
  return (
    <main className="container-md account">
      <h2 className="txt-center">Personnel</h2>
      <PersonalForm />
      <h2 className="txt-center">Mot de passe</h2>
      <PasswordForm />
    </main>
  )
}
