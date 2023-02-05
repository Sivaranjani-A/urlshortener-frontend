import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../config";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export function Forgotpassword() {

    const navigate = useNavigate();
    const userContextData = useContext(UserContext);
    const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
            },
            validationSchema: yup.object({
                email: yup.string().required().email(),
            }),
            onSubmit: async (values) => {
                userContextData.setmailid(values.email);
                try {
                    let mail = await axios.post(`${config.api}/user/sendmail`, values);
                    toast.success(mail.data.message);
                    navigate('/Verification');
                } catch (error) {
                    toast.error(error.response.data.message);
                }
            }
        });




    return (
        <>

            <form onSubmit={handleSubmit} className="forgot-form form">
                <h3>Forgot Password?</h3>
                <TextField

                    type="email"
                    label="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email && errors.email ? errors.email : null}

                />

                <Button
                    type="submit"
                    className="verify-user-button"
                    variant="contained"
                >
                    verify
                </Button>
            </form>

        </>
    );
}
