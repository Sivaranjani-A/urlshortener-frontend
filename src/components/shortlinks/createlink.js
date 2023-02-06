import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { config } from '../../config';
import UserContext from '../../context/UserContext';
import * as yup from "yup";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { CopyToClipboard } from 'react-copy-to-clipboard';

function CreateLink() {
  const userContextData = useContext(UserContext);

  let mail = localStorage.getItem('email');

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      "email": `${mail}`,
      "longurl": ""

    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      longurl: yup.string().required().min(4)
    }),
    onSubmit: async (values) => {
      try {
        const shortLink = await axios.post(`${config.api}/link/createlink`, values, {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
        toast.success(shortLink.data.message);
        userContextData.setshorturl(shortLink.data.shorturl);
        resetForm();


      } catch (error) {
        toast.error(error.response.data.message);
        userContextData.setshorturl(error.response.data.shorturl);
        resetForm();


      }

    },

  });


  return (
    <>

      <form onSubmit={handleSubmit} className="forgot-form form">
        <h3>URL SHORTENING</h3>

        <TextField
          type={"text"}
          label="longurl"
          className="form-control form-control-user mb-2"
          name={'longurl'}
          value={values.longurl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.longurl && errors.longurl ? true : false}
          helperText={touched.longurl && errors.longurl ? errors.longurl : null}

        />

        <Button type="submit" variant="contained">
          Shorten
        </Button>
      </form>
      <div className="forgot-form form">
        {userContextData.shorturl.length > 0 ? <> <h3>SHORTEN URL</h3>

          <TextField
            type={"text"}
            label="shorturl"
            className="form-control form-control-user mb-2"
            name={'shorturl'}
            value={`${config.client}/${userContextData.shorturl}`}

          /><CopyToClipboard text={`${config.client}/${userContextData.shorturl}`}><Button type="submit" variant="contained">
            copy
          </Button></CopyToClipboard></> : null}
      </div>
    </>

  );
}

export default CreateLink;
