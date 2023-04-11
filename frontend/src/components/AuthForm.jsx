import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { RoutesName } from '../routes/router'

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

export default function AuthForm({ register, onSubmit }) {
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
      {({ errors, touched }) => (
        <Form>
          <h2 className="txt-center">
            {register ? 'Connexion' : 'Inscription'}
          </h2>

          {register && (
            <>
              <Field name="username" placeholder="Pseaudo" />
              {errors.username && touched.username ? (
                <span className="invalid">{errors.username}</span>
              ) : null}
            </>
          )}

          <Field name="email" placeholder="Email" />
          {errors.email && touched.email ? (
            <span className="invalid">{errors.email}</span>
          ) : null}

          <Field type="password" name="password" placeholder="Mot de passe" />
          {errors.password && touched.password ? (
            <span className="invalid">{errors.password}</span>
          ) : null}

          {register ? (
            <Link to={RoutesName.LOGIN}>Déjà inscrit ?</Link>
          ) : (
            <Link to={RoutesName.REGISTER}>Pas encore inscrit ?</Link>
          )}

          <button className="btn primary w-full" type="submit">
            {register ? 'Se connecter' : "S'inscrire"}
          </button>
        </Form>
      )}
    </Formik>
  )
}
