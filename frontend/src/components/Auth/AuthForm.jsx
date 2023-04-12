import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { RoutesName } from '../../routes/router'

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
      {({ errors, touched, isSubmitting }) => (
        <Form>
          {error && <div className="alert danger mb1">{error}</div>}

          <h2 className="txt-center">
            {register ? "M'inscrire" : 'Me connecter'}
          </h2>

          {register && (
            <p>
              <label htmlFor="username"></label>
              <Field name="username" placeholder="Pseaudo" />
              {errors.username && touched.username ? (
                <span className="invalid">{errors.username}</span>
              ) : null}
            </p>
          )}

          <p>
            <label htmlFor="email"></label>
            <Field name="email" placeholder="Adresse email" />
            {errors.email && touched.email ? (
              <span className="invalid">{errors.email}</span>
            ) : null}
          </p>

          <p>
            <label htmlFor="password"></label>
            <Field type="password" name="password" placeholder="Mot de passe" />
            {errors.password && touched.password ? (
              <span className="invalid">{errors.password}</span>
            ) : null}
          </p>

          {register ? (
            <Link to={RoutesName.LOGIN}>Déjà inscrit ?</Link>
          ) : (
            <Link to={RoutesName.REGISTER}>Pas encore inscrit ?</Link>
          )}

          <button
            disabled={isSubmitting}
            className="btn primary w-full"
            type="submit"
          >
            {register ? "M'inscrire" : 'Me connecter'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
