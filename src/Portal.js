import React from 'react'

import {
  Outlet,
} from "react-router-dom";
import Navbar from './components/shortlinks/Navbar';

function Portal() {

  return (

    <div className="col-lg-12">
      <Navbar />
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>

  )

}

export default Portal