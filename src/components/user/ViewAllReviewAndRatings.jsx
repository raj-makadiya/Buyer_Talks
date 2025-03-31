import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomLoader } from "../../CustomLoader";


export const ViewAllReviewAndRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch all complaints
  const getAllReviewAndRatings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/rating/ratings");
      console.log(res.data); // Log API response
      setRatings(res.data.data);
    } catch (error) {
      console.error("Error fetching Review and Ratings:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllReviewAndRatings();
  }, []);

  return (
    <div style={{ textAlign: "center" }} className="table-container">
      {isLoading && <CustomLoader></CustomLoader>}
      <br />
      <h2> Review and Ratings</h2>
      <table className="table-complaint">
        <thead>
          <tr>
            <th>Review and Comments </th>
            <th>Rating</th>
            <th>Review  Date</th>
            <th>Product Name</th>
            <th>Product Brand</th>
            <th>Product Price</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {ratings?.map((rt) => (
            <tr key={rt._id}>
              <td>{rt.comment}</td>
              <td>{rt.rating}</td>
              <td>{new Date(rt.review_date).toLocaleDateString()}</td>

              {/* Check if product details exist */}
              <td>{rt.productId?.name || "N/A"}</td>
              <td>{rt.productId?.brand || "N/A"}</td>
              <td>{rt.productId?.price ? `$${rt.productId.price}` : "N/A"}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};