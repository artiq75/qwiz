import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
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
  }

  return (
    <main className="login">
      <form onSubmit={handleSubmit} className="card">
        <h1 className="txt-center">Inscription</h1>
        <input type="text" name="username" placeholder="Pseaudo" />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mot de passe" />
        <Link to={'/login'}>Déjà inscrit ?</Link>
        <button className="btn primary w-full" type="submit">
          S'inscrire
        </button>
      </form>
    </main>
  )
}
