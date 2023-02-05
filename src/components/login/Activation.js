import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { config } from '../../config';
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";

function Activation() {
  const navigate = useNavigate();
  const param = useParams();

  const { handleSubmit } = useFormik({
    initialValues: {
      activation: ""
    },
    onSubmit: async (values) => {
      try {

        const mail = await axios.put(`${config.api}/user/activation/${param.userId}`, values);
        toast.success(mail.data.message);
        navigate("/");
      }
      catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    },
  });

  return (
    <div className="container-lg mt-5">
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          className="verify-user-button"
          variant="contained"
          endIcon={<LockResetIcon />}>
          Activate
        </Button>
      </form>
    </div>
  )
}

export default Activation