import { useState } from 'react'
import { updatePassword } from '../../api/account'
import { useAuthContext } from '../providers/AuthProvider'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ButtonLoader, InputField } from '../Tools/Tools'

const schema = Yup.object().shape({
  currentPassword: Yup.string().required(
    'Le mot de passe actuelle est obligatoire'
  ),
  password: Yup.string().required('Le nouveau mot de passe est obligatoire'),
  passwordConfirmation: Yup.string()
    .required('Ce champs est obligatoire')
    .oneOf(
      [Yup.ref('password'), null],
      'Doit correspondre avec le nouveau mot de passe!'
    )
})

export default function PasswordForm() {
  const { logout } = useAuthContext()
  const [error, setError] = useState(null)

  const handleSubmit = async ({ currentPassword, password }) => {
    const credentials = { currentPassword, password }
    try {
      setError(null)
      await updatePassword(credentials)
      logout() // On déconnecte l'utilisateur on cas de succès
    } catch (e) {
      setError('Les données sont invalide!')
    }
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={{
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {error && <div className="alert danger mb1">{error}</div>}

          <InputField
            type="password"
            name="currentPassword"
            label="Mot de passe actuelle"
            placeholder="Mot de passe actuelle"
          />

          <div className="g2 gap1">
            <InputField
              type="password"
              name="password"
              label="Nouveau mot de passe"
              placeholder="Nouveau mot de passe"
            />

            <InputField
              type="password"
              name="passwordConfirmation"
              label="Répétition du nouveau mot de passe"
              placeholder="Répétition du nouveau mot de passe"
            />
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
