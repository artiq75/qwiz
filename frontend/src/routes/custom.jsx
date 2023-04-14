import { useState } from 'react'
import {
  ButtonLoader,
  InputField,
  SelectField
} from '../components/Tools/Tools'
import useAsyncEffect from '../hooks/useAsyncEffect'
import Http from '../classes/Http'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useGameContext } from '../components/providers/GameProvider'
import { useNavigate } from 'react-router-dom'
import { RoutesName } from './router'

const schema = Yup.object().shape({
  limit: Yup.string().required('Vous devez choisir une limite!')
})

export default function Custom() {
  const [state, setState] = useState({
    categories: [],
    loading: true
  })

  const { gameMachine } = useGameContext()

  const [gameState, gameCtx, gameSend, gameCan] = gameMachine

  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const categories = await Http.get('/api/categories').catch(console.error)
    setState({ loading: false, categories })
  }, [])

  const handleSubmit = ({ limit, category }) => {
    if (gameCan('run')) {
      gameSend('run', { limit, category })
      navigate(RoutesName.PLAY)
    }
  }

  return (
    <main className="container-sm custom">
      {state.loading && <time-indicator></time-indicator>}
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
