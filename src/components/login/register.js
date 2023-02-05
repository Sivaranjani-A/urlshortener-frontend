import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import React from 'react'
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';


function Register() {
    const navigate = useNavigate();
    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },

        validationSchema: yup.object({
            firstname: yup.string().required().min(3),
            lastname: yup.string().required().min(1),
            email: yup.string().email().required(),
            password: yup.string().required().min(8),
        }),
        onSubmit: async (values) => {
            try {
                const register = await axios.post(`${config.api}/user/register`, values);
                toast.success(register.data.message);
                navigate('/')
            } catch (error) {
                toast.error(error.response.message);
                console.log(error);
            }
        },
    });
    return (
        <>
            <form onSubmit={handleSubmit} className="signup-form form">
                <h3>Registration</h3>

                <TextField
                    label="First Name"
                    type="firstname"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstname && errors.firstname ? true : false}
                    helperText={touched.firstname && errors.firstname ? errors.firstname : null}
                />
                <TextField
                    label="Last Name"
                    type="lastname"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastname && errors.lastname ? true : false}
                    helperText={touched.lastname && errors.lastname ? errors.lastname : null}
                />
                <TextField

                    label="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email && errors.email ? errors.email : null}
                />

                <TextField

                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password ? true : false}
                    helperText={
                        touched.password && errors.password ? errors.password : null
                    }
                />
                <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                    Register
                </Button>
                <p>Already have an account?</p>
                <Button
                    onClick={() => navigate("/")}
                    variant="outlined"
                    color="success"
                    startIcon={<LoginIcon />}
                >
                    Back to Login
                </Button>
            </form>
        </>
    );
}

export default Register