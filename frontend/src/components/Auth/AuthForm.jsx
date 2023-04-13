import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { RoutesName } from '../../routes/router'
import { ButtonLoader, InputField } from '../Tools/Tools'

const schema = {
  email: Yup.string()
    .email('Email invalide!')
    .required("L'email est obligatoire"),
  password: Yup.string().required('Le mot de passe est obligatoire')
}

const initialValues = {
  email: '',
  password: ''
}

export default function AuthForm({ register, onSubmit, error }) {
  if (register) {
    schema['username'] = Yup.string().required('Le pseaudo est obligatoire')
    initialValues['username'] = ''
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(schema)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {error && <div className="alert danger mb1">{error}</div>}

          <h2 className="txt-center">
            {register ? "M'inscrire" : 'Me connecter'}
          </h2>

          {register && <InputField name="username" placeholder="Pseaudo" />}

          <InputField type="email" name="email" placeholder="Adresse email" />

          <InputField
            type="password"
            name="password"
            placeholder="Mot de passe"
          />

          {register ? (
            <Link to={RoutesName.LOGIN}>Déjà inscrit ?</Link>
          ) : (
            <Link to={RoutesName.REGISTER}>Pas encore inscrit ?</Link>
          )}

          <ButtonLoader
            isLoading={isSubmitting}
            className="btn primary w-full"
            type="submit"
          >
            {register ? "M'inscrire" : 'Me connecter'}
          </ButtonLoader>
        </Form>
      )}
    </Formik>
  )
}
