import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from "react-bootstrap";
import { CustomLoader } from '../../CustomLoader';
import { Bounce, toast, ToastContainer } from "react-toastify";





export const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setisLoading] =useState(false)

  const navigate = useNavigate();

 
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res.data);

      if (res.status === 200) {
        
        // alert("login successfully")
        toast.success('Login Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        if (res.data.data.roleId.name === "user") {
          setTimeout(() => {
            navigate("/user");
          }, 2500);
        }
      }
    } catch (error) {
      // alert("Login failed");
      toast.error('  Invalid Credentials !!', {
        position: "top-center",
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
  };


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
   <ToastContainer
                    position="top-left"
                    autoClose={100}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                  />
  {isLoading==true && <CustomLoader/>}
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
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <Button variant="primary" className="w-100" type="submit">
            Log In
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>

       
      </Card.Body>
    </Card>
  </Container>
);
};
  
