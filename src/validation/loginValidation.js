import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).matches("^[a-zA-Z0-9!@#$&()-`.+,/\"]*$").required(),
})

export default loginSchema;