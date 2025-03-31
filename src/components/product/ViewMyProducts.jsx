import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "../../assets/serviceprovider.css" 
 
import { Container, Card, Form, Button } from "react-bootstrap";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from '../../CustomLoader';

export const ViewMyProducts = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const getAllMyProducts = async() => {

        setisLoading(true) 

        const res = await axios.get("/product/productbybusinessId/"+localStorage.getItem("id"))
        console.log(res.data) //api response...
        setProducts(res.data.data)
        setisLoading(false) 

    }

    useEffect(() => {
        
        getAllMyProducts()
        
    }, [])

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this Product?")) return;
    
        try {
          setisLoading(true)
            await axios.delete(`/product/product/${productId}`)
            setisLoading(false)
            toast.success("Product deleted successfully!", { theme: "dark" })
            
            // Remove the deleted appointment from UI
            setProducts(products.filter(pr => pr._id !== productId))
        } catch (error) {
            console.error("Delete failed:", error)
            toast.error("Failed to delete Product!", { theme: "dark" })
        }
    }

    
    

  return (
    <div className="table-container" style={{textAlign:"center"}}>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} theme="dark" transition={Bounce} />
      {isLoading == true && <CustomLoader></CustomLoader>}
      <br />
        <h2>My Products</h2>
        
        <table className='complaint-table'>
            <thead>
                <tr>
                    
                    <th>Product Description</th>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    
                    <th>Product Brand</th>
                    <th>Product Price</th>


                    <th>Product Image</th>

                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                   products?.map((pr)=>{
                    return<tr>
                        <td className='description-cell'><div className='description-content'>{pr.description}</div></td>
                        <td>{pr.name}</td>
                        
                        <td>{pr.category}</td>
                        
                        <td>{pr.brand}</td>
                        <td>₹{pr.price}</td>
                        <td>
                            <img className="product-img" style ={{height:100,width:100}}src={pr?.productURL}></img>
                        </td>
                       
                        <td>
                            <Link to ={`/product/updateproduct/${pr._id}`} className ="btn btn-info " style={{padding:"12px 20px"}}>UPDATE</Link>
                            <span><Button  className="btn btn-danger " onClick={()=>{handleDelete(pr._id)}}>DELETE</Button></span>
                            
                        </td>
                        
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}