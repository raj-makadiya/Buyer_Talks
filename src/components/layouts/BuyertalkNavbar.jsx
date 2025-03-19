import React from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const BuyertalkNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate()

  

  const handleLogout = () => {
    localStorage.removeItem("id");  // Remove stored user ID
    localStorage.removeItem("role");  // Remove authentication token if stored
    toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        theme: "dark",
        transition:Bounce,
    });
    setTimeout(()=>{navigate("/service/login")},2500); // Redirect to login page
};

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      {/*begin::Container*/}
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} style={{height:"25px",width:"25px"}}></img>
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="bi bi-search" />
            </a>
          </li>

         

        

          <li className="nav-item">
            <button  onClick={()=>{handleLogout()}} className="btn btn-danger">LOG OUT </button>
            {/* <a className="nav-link" href="#" data-lte-toggle="fullscreen">
              <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen" />
              <i
                data-lte-icon="minimize"
                className="bi bi-fullscreen-exit"
                style={{ display: "none" }}
              />
            </a> */}
            
            

          </li>

          
        </ul>
      </div>
    </nav>
  );
};