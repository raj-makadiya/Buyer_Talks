import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/complaints.css" // ✅ Applying same CSS from ViewAllComplaints

import { Container, Card, Form, Button } from "react-bootstrap";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../../CustomLoader";


export const ViewMyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyComplaints = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("🚨 No user ID found in localStorage!");
        setIsLoading(false);
        return;
      }
      const res = await axios.get(`/complaint/complaintbyuserId/${userId}`);
      setComplaints(res.data.data);
      console.log("✅ Complaints:", res.data.data);
    } catch (error) {
      console.error("🔥 Error fetching complaints:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMyComplaints();
  }, []);

  const handleDelete = async (complaintId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      setIsLoading(true)
        await axios.delete(`/complaint/complaint/${complaintId}`)
        setIsLoading(false)
        toast.success("Complaint deleted successfully!", { theme: "dark" })
        
        // Remove the deleted appointment from UI
        setComplaints(complaints.filter(ct => ct._id !== complaintId))
    } catch (error) {
        console.error("Delete failed:", error)
        toast.error("Failed to delete appointment!", { theme: "dark" })
    }
}

  return (
    <div className="table-container"> {/* ✅ Uses the same styling */}
    <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} theme="dark" transition={Bounce} />
    
          {isLoading && <CustomLoader></CustomLoader>}
      
      <h2>My Complaints</h2>
      <table className="complaint-table"> {/* ✅ Uses the same table class */}
        <thead>
          <tr>
            <th>Complaint Description</th>
            <th>Status</th>
            <th>Filed Date</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Product Image</th>
            <th>Action</th> {/* ✅ Added Update Button Column */}
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((ct) => (
              <tr key={ct._id}>

                <td className="description">
                  <div className="description-content">{ct.description}</div>
                </td>
                <td>{ct.status}</td>
                <td>{new Date(ct.fileddate).toLocaleDateString()}</td>
                <td>{ct.productId?.name || "No product found"}</td>
                <td>{ct.productId?.brand || "No Brand"}</td>
                <td>{ct.productId?.price ? `₹${ct.productId.price}` : "N/A"}</td>
                <td>
                  {ct.productId?.productURL ? (
                    <img className="product-img" src={ct.productId.productURL} alt="Product"
                     />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <Button  className="btn btn-info" onClick={()=>{handleDelete(ct._id)}}>
                    DELETE
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};