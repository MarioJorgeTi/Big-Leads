import { useFormik } from 'formik'

const Filters = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        onSubmit: async (values, { setSubmitting }) => {

        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            
        </form>
    )
}

export default Filters