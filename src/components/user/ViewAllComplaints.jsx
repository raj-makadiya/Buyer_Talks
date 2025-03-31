import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomLoader } from "../../CustomLoader";
import "../../assets/complaints.css" // Ensure you import CSS


export const ViewAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all complaints
  const getAllComplaints = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/complaint/complaints");
      setComplaints(res.data.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  return (
    <div className="table-container">
      {isLoading && <CustomLoader></CustomLoader>}
      <h2>All Complaints</h2>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Complaint Description</th>
            <th>Status</th>
            <th>Filed Date</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((ct) => (
              <tr key={ct._id}>
                {/* Wrap description properly */}
                <td className="description-cell">
                  <div className="description-content">{ct.description}</div>
                </td>
                <td>{ct.status}</td>
                <td>{new Date(ct.fileddate).toLocaleDateString()}</td>
                <td>{ct.productId?.name || "N/A"}</td>
                <td>{ct.productId?.brand || "N/A"}</td>
                <td>{ct.productId?.price ? `$${ct.productId.price}` : "N/A"}</td>
                <td>
                  {ct.productId?.productURL ? (
                    <img
                      className="product-img"
                      src={ct.productId.productURL}
                      alt={ct.productId.name}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};