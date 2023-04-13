import { updateUser } from '../../api/account'
import { useAuthContext } from '../providers/AuthProvider'
import { ButtonLoader, InputField } from '../Tools/Tools'
import ImageField from '../Tools/ImageField'
import { Form, Formik } from 'formik'
import { useMemo } from 'react'

export default function PersonalForm() {
  const { user, persist } = useAuthContext()

  const handleSubmit = async (credentials) => {
    console.log(credentials)
    return
    const user = await updateUser(credentials).catch(console.error)
    persist(user)
  }

  const initialValues = useMemo(() => {
    if (user) {
      return {
        username: user.username,
        email: user.email,
        image: ''
      }
    }
  }, [user])

  return (
    <Formik
      className="account-form"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <ImageField name="image" src={user.image} />

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
