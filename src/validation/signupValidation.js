import * as yup from "yup";

const signupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).matches("^[a-zA-Z0-9!@#$&()-`.+,/\"]*$").required(),
    password2: yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([yup.ref('password')]) : field
    ),
    agree: yup.boolean().required()
})

export default signupSchema;