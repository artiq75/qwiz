import { updatePassword } from '../../api/account'
import { useAuthContext } from '../providers/AuthProvider'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

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

  const handleSubmit = async function ({ currentPassword, password }) {
    const credentials = { currentPassword, password }
    try {
      await updatePassword(credentials)
      logout() // On déconnecte l'utilisateur on cas de succès
    } catch (e) {
      console.error('Password Form: ', e)
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
      {({ errors, touched }) => (
        <Form>
          <p>
            <label htmlFor="currentPassword">Mot de passe actuelle</label>
            <Field
              type="password"
              name="currentPassword"
              label="Mot de passe actuelle"
            />
            {errors.currentPassword && touched.currentPassword ? (
              <span className="invalid">{errors.currentPassword}</span>
            ) : null}
          </p>

          <div className="g2 gap1">
            <p>
              <label htmlFor="password">Nouveau mot de passe</label>
              <Field
                type="password"
                name="password"
                label="Nouveau mot de passe"
              />
              {errors.password && touched.password ? (
                <span className="invalid">{errors.password}</span>
              ) : null}
            </p>

            <p>
              <label htmlFor="passwordConfirmation">
                Répétition du nouveau mot de passe
              </label>
              <Field
                type="password"
                name="passwordConfirmation"
                label="Répétition du nouveau mot de passe"
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <span className="invalid">{errors.passwordConfirmation}</span>
              ) : null}
            </p>
          </div>

          <button className="btn primary" type="submit">
            Mettre à jour
          </button>
        </Form>
      )}
    </Formik>
  )
}
