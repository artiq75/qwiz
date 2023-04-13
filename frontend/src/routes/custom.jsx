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

const schema = Yup.object().shape({
  limit: Yup.string().required('Vous devez choisir une limite!')
})

export default function Custom() {
  const [state, setState] = useState({
    categories: [],
    loading: true
  })

  useAsyncEffect(async () => {
    const categories = await Http.get('/api/categories').catch(console.error)
    setState({ loading: false, categories })
  }, [])

  const handleSubmit = async (filter) => {
    console.log(filter)
  }

  return (
    <main className="container-sm custom">
      <h2 className="txt-center">Partie Personnaliser</h2>
      {state.loading && <time-indicator></time-indicator>}
      {!state.loading && (
        <Formik
          className="card"
          initialValues={{
            category: '',
            limit: 10
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
