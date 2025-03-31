import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../../CustomLoader";


export const AddComplaints = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch Products by Category (Using Category Name)
  const fetchProductsByCategory = async (category) => {
    if (!category) {
      setProducts([]); // Reset if no category selected
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.get(`/product/getProductByCategory/${category}`); // API expects category name
      setProducts(response.data.data);
      
      setIsLoading(false)
      
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // Handle Form Submission
  const submitHandler = async (data) => {
    setIsLoading(true);
    data.userId = localStorage.getItem("id");

    try {
      const res = await axios.post("/complaint/complaint", data);

      if (res.status === 201) {
        toast.success("Complaint created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setTimeout(() => navigate("/user"), 2000);
        
      } else {
        toast.error("Complaint not added!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while submitting the complaint!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Validation Rules
  const ValidationSchema = {
    descriptionValidator: { required: { value: true, message: "Complaint description is required *" } },
    filedDateValidator: { required: { value: true, message: "Complaint date is required *" } },
    statusValidator: { required: { value: true, message: "Complaint status is required *" } },
    categoryValidator: { required: { value: true, message: "Product category is required *" } },
    productValidator: { required: { value: true, message: "Product selection is required *" } },
  };

  return (
    <div>
      <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} theme="dark" transition={Bounce} />

      {isLoading && <CustomLoader></CustomLoader>}
      
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Container
          fluid
          className="d-flex align-items-center justify-content-center min-vh-100"
          style={{
            backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Card className="m-3 p-3 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
            <Card.Body className="px-4">
              <h2 className="text-uppercase text-center mb-4">Complaints</h2>

              {/* Category Selection */}
              <Form.Group className="mb-2">
                <Form.Label>Product Category</Form.Label>
                <Form.Select
                  {...register("category", ValidationSchema.categoryValidator)}
                  onChange={(e) => {
                    const category = e.target.value;
                    setSelectedCategory(category);
                    fetchProductsByCategory(category);
                  }}
                >
                  <option value="">Select Product Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing & Apparel">Clothing & Apparel</option>
                  <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Grocery & Food">Grocery & Food</option>
                  <option value="Automobiles & Accessories">Automobiles & Accessories</option>
                  <option value="Books & Stationery">Books & Stationery</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Toys & Baby Products">Toys & Baby Products</option>
                  <option value="Healthcare & Medicine">Healthcare & Medicine</option>
                  <option value="Services">Services</option>
                </Form.Select>
                <span className="text-danger">{errors.category?.message}</span>
              </Form.Group>

              {/* Product Selection (Filtered by Category Name) */}
              <Form.Group className="mb-2">
                <Form.Label>Product</Form.Label>
                <Form.Select {...register("productId", ValidationSchema.productValidator)}>
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
                <span className="text-danger">{errors.productId?.message}</span>
              </Form.Group>

              {/* Complaint Description */}
              <Form.Group className="mb-1">
                <Form.Label>Complaint Description</Form.Label>
                <Form.Control type="textArea" {...register("description", ValidationSchema.descriptionValidator)} />
                <Form.Text className="text-danger">{errors.description?.message}</Form.Text>
              </Form.Group>

              {/* Filed Date */}
              <Form.Group className="mb-2">
                <Form.Label>Complaint Filed Date</Form.Label>
                <Form.Control type="date" {...register("fileddate", ValidationSchema.filedDateValidator)} />
                <Form.Text className="text-danger">{errors.fileddate?.message}</Form.Text>
              </Form.Group>

              {/* Complaint Status */}
              <Form.Group className="mb-2">
                <Form.Label>Complaint Status</Form.Label>
                <Form.Select {...register("status", ValidationSchema.statusValidator)}>
                  <option value="">Select Complaint Status</option>
                  <option value="Open">Open</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Escalated">Escalated</option>
                </Form.Select>
                <span className="text-danger">{errors.status?.message}</span>
              </Form.Group>

              {/* Submit Button */}
              <Button type="submit" className="mt-4 w-100" variant="primary" size="lg">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Form>
    </div>
  );
};



