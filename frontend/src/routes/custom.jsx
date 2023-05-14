import { useState } from 'react'
import { InputField, SelectField } from '../components/Tools/Form/Tools'
import { ButtonBack, ButtonLoader } from '../components/Tools/Button/Tools'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useGameContext } from '../components/providers/GameProvider'
import { useNavigate } from 'react-router-dom'
import { RoutesName } from './router'
import { useAuthContext } from '../components/providers/AuthProvider'
import { findAllCategories } from '../api/category'
import { Alert } from '../components/Tools/Tools'

const schema = Yup.object().shape({
  limit: Yup.string().required('Vous devez choisir une limite!')
})

export default function Custom() {
  const [state, setState] = useState({
    categories: [],
    loading: true,
    error: ''
  })

  const navigate = useNavigate()
  const { gameMachine } = useGameContext()
  const { user, isAuth } = useAuthContext()

  const [gameState, gameCtx, gameSend, gameCan] = gameMachine

  useAsyncEffect(async () => {
    if (isAuth && user.isPremium) {
      setState((s) => ({ ...s, isLoading: true }))
      try {
        const categories = await findAllCategories()
        setState({ loading: false, categories })
      } catch (e) {
        setState({
          loading: false,
          categories: [],
          error: "Les catégories n'ont pû être récupérer"
        })
      }
    }
  }, [isAuth, user.isPremium])

  const handleSubmit = ({ limit, category }) => {
    if (gameCan('run')) {
      gameSend('run', { limit, category })
      navigate(RoutesName.PLAY)
    }
  }

  return (
    <main className="container-sm custom">
      <ButtonBack />
      {state.loading && <time-indicator></time-indicator>}
      {state.error && <Alert type="error">{error}</Alert>}
      <h2 className="txt-center">Partie Personnaliser</h2>
      {!state.loading && (
        <Formik
          initialValues={{
            category: '',
            limit: 10
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="card">
              <SelectField name="category" label="Catégories">
                <option value="">Toute les catégories</option>
                {state.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </SelectField>

              <InputField name="limit" label="Nombre de questions" />

              <ButtonLoader
                className="btn primary"
                type="submit"
                isLoading={isSubmitting}
              >
                Créer la partie
              </ButtonLoader>
            </Form>
          )}
        </Formik>
      )}
    </main>
  )
}
