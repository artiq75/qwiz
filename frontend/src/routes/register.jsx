import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../components/UserContextProvider'
import Http from '../Http'

export default function Register() {
  // const { user, onAuth } = useUserContext()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (user.isAuth) {
  //     navigate('/')
  //   }
  // }, [user])

  const handleSubmit = async function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data)
    // const response = await Http.post('/login', {
    //   method: 'POST',
    //   body: {
    //     username: data.get('username'),
    //     email: data.get('email'),
    //     password: data.get('password')
    //   }
    // })
    // onAuth(response.token)
    // navigate('/')
  }

  return (
    <main className="login">
      <form onSubmit={handleSubmit} className="card">
        <h1 className="txt-center">Inscription</h1>
        <input type="text" name="username" placeholder="Pseado" />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mot de passe" />
        <button className="btn primary w-full" type="submit">
          S'inscrire
        </button>
      </form>
    </main>
  )
}
