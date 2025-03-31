import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button ,Alert } from "react-bootstrap";
import { CustomLoader } from '../../CustomLoader';
import { Bounce, toast, ToastContainer } from "react-toastify";





export const ServiceProviderLogin = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setisLoading] = useState(false)

  

  const navigate = useNavigate();

 
  const submitHandler = async(data) => {

    setisLoading(true)
   
    const res = await axios.post("/service/login", data)
    setisLoading(false)
    console.log(res.data)
    if(res.status === 200){
      toast.success('login successfully',{
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        }); 
      localStorage.setItem("id",res.data.data._id)
      localStorage.setItem("role",res.data.data.roleId.name)

      if(res.data.data.roleId.name === "service"){
        setTimeout(()=>{navigate("/service")},2500)
        
      }
    }
    else{
      
      toast.error('login failed',{
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
    }
  }

  const ValidationSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "Email is required *",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "Password is required *",
      },
      minLength: {
        value: 8,
        message: "Minimum length is 8",
      },
    },
  };

  return (
    <>
    <ToastContainer
                      position="top-center" autoClose={5000} theme="dark" transition={Bounce}
                    />
   {isLoading==true && <CustomLoader/>}
    <Container
    fluid
    className="d-flex align-items-center justify-content-center min-vh-100"
    style={{
      backgroundImage:
        "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
   
    <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
      <Card.Body>
        <h2 className="text-uppercase text-center mb-4">Sign In</h2>
        <Form onSubmit={handleSubmit(submitHandler)}>
          {/* Email Input */}
          <Form.Group className="mb-3">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email", ValidationSchema.emailValidator)}
            />
            {errors.email && <Alert variant="danger" className="mt-1">{errors.email.message}</Alert>}
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", ValidationSchema.passwordValidator)}
            />
            {errors.password && <Alert variant="danger" className="mt-1">{errors.password.message}</Alert>}
          </Form.Group>

          <div className="text-center my-2">
            <Link to="/serviceForgotPassword">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <Button variant="primary" className="w-100" type="submit">
            Log In
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/service/signup">Register here</Link>
        </p>

        
      </Card.Body>
    </Card>
  </Container>
  </>
);
};
  



