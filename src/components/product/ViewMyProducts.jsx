import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomLoader } from '../../CustomLoader'

export const ViewMyProducts = () => {

    const [products, setproducts] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const getAllMyProducts = async() => {

        setisLoading(true) 

        const res = await axios.get("/product/productbybusinessid/"+localStorage.getItem("id"))
        console.log(res.data) //api response...
        setproducts(res.data.data)
        setisLoading(false) 

    }

    useEffect(() => {
        
        getAllMyProducts()
        
    }, [])
    

  return (
    <div style={{textAlign:"center"}}>
    {isLoading==true && <CustomLoader></CustomLoader>}
        MY Products
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                   products?.map((pr)=>{
                    return<tr>
                        <td>{pr.name}</td>
                        <td>
                            <img  style ={{height:100,width:100}}src={pr?.productURL}></img>
                        </td>
                        <td>
                            <Link to ={`/product/updateproduct/${pr._id}`} className ="btn btn-info">UPDATE</Link>
                            </td>
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}