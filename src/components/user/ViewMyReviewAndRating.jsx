import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/complaints.css" // ✅ Applying same CSS from ViewAllComplaints
import { get } from "react-hook-form";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../../CustomLoader";

export const ViewMyReviewAndRating = () => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyRatings = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("🚨 No user ID found in localStorage!");
        setIsLoading(false);
        return;
      }
      const res = await axios.get(`/rating/reviewandratingbyuserId/${userId}`);
      setRatings(res.data.data);
      console.log("✅ Review and Ratings:", res.data.data);
    } catch (error) {
      console.error("🔥 Error fetching Review and Ratings:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMyRatings();
  }, []);

    const handleDelete = async (ratingId) => {
      if (!window.confirm("Are you sure you want to delete this appointment?")) return;
  
      try {
        setIsLoading(true)
          await axios.delete(`/rating/rating/${ratingId}`)
          setIsLoading(false)
          toast.success("Review and Rating deleted successfully!", { theme: "dark" })
          
          // Remove the deleted appointment from UI
          setRatings(ratings.filter(rt => rt._id !== ratingId))
      } catch (error) {
          console.error("Delete failed:", error)
          toast.error("Failed to delete Review and Rating!", { theme: "dark" })
      }
  }

  return (
    <div className="table-container"> {/* ✅ Uses the same styling */}
    <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} theme="dark" transition={Bounce} />
      {isLoading && <CustomLoader></CustomLoader>}
      <h2>My Review and Ratings</h2>
      <table className="table"> {/* ✅ Uses the same table class */}
        <thead>
          <tr>
          <th>Review and Comments </th>
            <th>Rating</th>
            <th>Review  Date</th>
            <th>Product Name</th>
            <th>Product Brand</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Action</th> {/* ✅ Added Update Button Column */}
          </tr>
        </thead>
        <tbody>
          {ratings.length > 0 ? (
            ratings.map((rt) => (
              <tr key={rt._id}>
                <td>{rt.comment}</td>
              <td>{rt.rating}</td>
              <td>{new Date(rt.review_date).toLocaleDateString()}</td>

              {/* Check if product details exist */}
              <td>{rt.productId?.name || "N/A"}</td>
              <td>{rt.productId?.brand || "N/A"}</td>
              <td>{rt.productId?.price ? `₹${rt.productId.price}` : "N/A"}</td>
              <td>
                {rt.productId?.productURL ? (
                  <img
                    src={rt.productId.productURL}
                    alt={rt.productId.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
                <td>
                  <Button  className="btn btn-info" onClick={()=>{handleDelete(rt._id)}}>
                    DELETE
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No Review and Rattings found found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};