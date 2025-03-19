import { useEffect, useState } from 'react'

import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import './assets/adminlte.css'
import './assets/adminlte.min.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { SignUp } from './components/common/SignUp'
import { BuyertalkSidebar } from './components/layouts/BuyertalkSidebar'
// import { Demo } from './components/buyer/Demo'
import axios from 'axios'
import { ServiceProviderSignUp } from './components/serviceprovider/ServiceProviderSignUp'
import { ServiceProviderLogin } from './components/serviceprovider/ServiceProviderLogin'

import { Products } from './components/product/Products'
import PrivateRoutes from './hooks/PrivateRoutes'
import { Products2 } from './components/product/Products2'
import { ViewMyProducts } from './components/product/ViewMyProducts'
import { UpdateMyProduct } from './components/product/UpdateMyProduct'




function App() {

  axios.defaults.baseURL = "http://localhost:3000"
  // 

 

  return (
   
   
    <div className={location.pathname === "/login" || location.pathname === "/SignUp" ? "" : "app-wrapper"}>
     <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      

       <Route path='' element={<PrivateRoutes></PrivateRoutes>}> 
      <Route path="/service" element={<BuyertalkSidebar/>}>
        
        <Route path="signup" element={<ServiceProviderSignUp></ServiceProviderSignUp>}></Route>
        <Route path="login" element={<ServiceProviderLogin></ServiceProviderLogin>}></Route>
      
      </Route>

      <Route path="/product" element={<BuyertalkSidebar/>}>
        <Route path="products" element={<Products></Products>}></Route>
        <Route path="products2" element={<Products2></Products2>}></Route>
        <Route path="viewmyproducts" element={<ViewMyProducts></ViewMyProducts>}></Route>
        <Route path="updateproduct/:id" element={<UpdateMyProduct></UpdateMyProduct>}></Route>
        
        
      
      </Route>
      
      
      <Route path="/user" element={<UserSidebar />}>
        <Route path="profile" element={<UserProfile></UserProfile>}></Route>
      </Route>

       </Route>
     </Routes>


    </div>
    
   
   
  )
}

export default App

