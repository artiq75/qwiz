import { updateUser } from '../../api/account'
import { useAuthContext } from '../providers/AuthProvider'
import { ButtonLoader } from '../Tools/Button/Tools'
import ImageField from '../Tools/Form/ImageField'
import { InputField } from '../Tools/Form/Tools'
import { Form, Formik } from 'formik'
import { useState } from 'react'

export default function PersonalForm() {
  const { user, persist } = useAuthContext()
  const [error, setError] = useState(null)

  const handleSubmit = async (credentials) => {
    try {
      setError(null)
      const user = await updateUser(credentials)
      persist(user)
    } catch (e) {
      setError('Les informations sont invalide!')
    }
  }

  return (
    <Formik
      className="account-form"
      initialValues={{
        username: user.username,
        email: user.email,
        image: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          {error && <div className="alert danger mb1">{error}</div>}

          <ImageField
            name="image"
            src={user.image}
            setFieldValue={setFieldValue}
          />

          <div className="g2 gap1">
            <InputField name="username" label="Pseaudo" />

            <InputField type="email" name="email" label="Email" />
          </div>

          <ButtonLoader
            isLoading={isSubmitting}
            className="btn primary"
            type="submit"
          >
            Mettre à jour
          </ButtonLoader>
        </Form>
      )}
    </Formik>
  )
}
