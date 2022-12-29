import * as yup from "yup";

const signupSchema = yup.object().shape({
    email: yup.string()
            .email()
            .required("Email is required"),
    password: yup.string()
            .min(8, "password must be 8 characters at least")
            .matches("^[a-zA-Z0-9!@#$&()-`.+,/\"]*$")
            .required("Password is required"),
    password2: yup.string()
            .when('password', (password, field) =>
                password ? field.required().oneOf([yup.ref('password')]) : field
            ),
    agree:
        yup.boolean(true)
            .required()
})

export default signupSchema;