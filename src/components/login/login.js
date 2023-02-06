import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";
import { useContext } from "react";
import UserContext from "../../context/UserContext";


export function Login() {

    const navigate = useNavigate();


    const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: yup.object({
                email: yup.string().required().email(),
                password: yup.string().required().min(8),
            }),
            onSubmit: async (values) => {
                try {
                    const users = await axios.post(`${config.api}/user/login`, values);

                    if (users.data.token) {
                        localStorage.setItem('token', users.data.token);
                        localStorage.setItem('email', users.data.email);
                        toast.success(users.data.message)

                        navigate('/Portal/shortlink');
                    } else {
                        toast.error("Invalid credentials");
                    }


                } catch (error) {
                    toast.error(error.response.data.message)
                    console.log(error)
                }
            },
        });

    return (
        <>

            <form onSubmit={handleSubmit} className="login-form form">
                <h3>Welcome to Short Url App</h3>
                <TextField
                    id="email"
                    type="text"
                    label="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email && errors.email ? errors.email : null}
                />
                <TextField
                    id="password"
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
                <Button type="submit" variant="contained">
                    Submit
                </Button>
                <div className="signup-forgot d-flex justify-content-between">
                    <p><Link to="/register" className="link-primary">
                        Don't have an account? Sign Up
                    </Link></p>
                    <Link to="/ForgotPassword" className="link-danger text-danger">
                        Forgot password?
                    </Link>
                </div>
            </form>
        </>
    );
}
