
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate();

  const doLogout = () => {
    if (window.confirm("Do you really want to Logout?")) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top ml-2 mr-2" style={{ backgroundColor: "#e3f2fd !important" }} >
      <div className='col-lg-8 ml-2'>
        <button to={"/portal/shortlink"} className="btn navbar-brand col px-md-4" ><b>URL Shortening APP</b></button>
        <Link to={"/portal/shortlink"} className="btn navbar-brand col px-md-4" >URL Shortening</Link>
        <Link to={"/portal/listurl"} className="btn navbar-brand col px-md-4" >URLs List</Link>
      </div>

      <div className='col-lg-4 '>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button className="btn btn-outline-danger m-2" onClick={() => { doLogout() }}>  Logout </button>
          </div>
        </div>
      </div>
    </nav>
  )
}



export default Navbar