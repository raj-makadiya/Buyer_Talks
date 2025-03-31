// import { useEffect, useState } from 'react';
// import { UserSidebar } from './components/layouts/UserSidebar';
// import './assets/adminlte.css';
// import './assets/adminlte.min.css';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import { UserProfile } from './components/user/UserProfile';
// import { Login } from './components/common/Login';
// import { SignUp } from './components/common/SignUp';
// import { BuyertalkSidebar } from './components/layouts/BuyertalkSidebar';
// import axios from 'axios';
// import { Products } from './components/product/Products';
// import PrivateRoutes from './hooks/PrivateRoutes';
// import { Products2 } from './components/product/Products2';
// import { ViewMyProducts } from './components/product/ViewMyProducts';
// import { UpdateMyProduct } from './components/product/UpdateMyProduct';
// import { LandingPage } from './components/common/LandingPage';
// import { ServiceProviderLogin } from './components/common/ServiceProviderLogin';
// import { ServiceProviderSignUp } from './components/common/ServiceProviderSignUp';
// import { ResetPassword } from './components/common/ResetPassword';
// import { AddComplaints } from './components/user/Addcomplaints';
// import { ViewAllComplaints } from './components/user/ViewAllComplaints';
// import { ForgotPassword } from './components/common/ForgotPassword';
// import { ContactUs } from './components/common/Contactus';
// import { ServiceResetPassword } from './components/common/ServiceResetPassword';
// import { ServiceForgotPAssword } from './components/common/ServiceForgotPAssword';
// import { ViewMyComplaints } from './components/user/ViewMyComplaints';
// import { AddReviewAndRatings } from './components/user/AddReviewAndRatings';
// import { ViewAllReviewAndRatings } from './components/user/ViewAllReviewAndRatings';
// import { ViewMyReviewAndRating } from './components/user/ViewMyReviewAndRating';

// function App() {
//   axios.defaults.baseURL = "http://localhost:3000";
//   const location = useLocation();

//   useEffect(() => {
//     const reloadCSS = () => {
//       const links = document.querySelectorAll('link[rel="stylesheet"]');
//       links.forEach(link => {
//         const newLink = link.cloneNode(true);
//         const href = link.getAttribute('href');
//         newLink.href = `${href}?v=${new Date().getTime()}`; // Cache-busting using timestamp
//         link.parentNode.replaceChild(newLink, link);
//       });
//     };

//     reloadCSS();
//   }, [location.pathname]);

//   const noWrapperPaths = ['/login', '/signup', '/service/login', '/service/signup', '/resetPassword/:token', '/forgotpassword','/serviceForgotPassword', '/serviceResetPassword/:token','/addcomplaint','/viewmycomplaints','/addreviewandrating','/viewallreviewandratings','/viewallcomplaints','/viewmyreviewandrating',];
//   const isNoWrapper = noWrapperPaths.some(path => location.pathname.startsWith(path));

//   return (
//     <div className={isNoWrapper ? '' : 'app-wrapper'}>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/service/login" element={<ServiceProviderLogin />} />
//         <Route path="/service/signup" element={<ServiceProviderSignUp />} />
//         <Route path="/resetPassword/:token" element={<ResetPassword />} />
//         <Route path="/addcomplaint" element={<AddComplaints />} />
//         <Route path="/viewallcomplaints" element={<ViewAllComplaints />} />
//         <Route path="/viewmycomplaints" element={<ViewMyComplaints></ViewMyComplaints>} />
//         <Route path="/addreviewandrating" element={<AddReviewAndRatings></AddReviewAndRatings>} />
//         <Route path="/viewallreviewandratings" element={<ViewAllReviewAndRatings></ViewAllReviewAndRatings>} />
//         <Route path="/viewmyreviewandrating" element={<ViewMyReviewAndRating></ViewMyReviewAndRating>} />



//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/contactus" element={<ContactUs />} />
//         <Route path="/serviceResetPassword/:token" element={<ServiceResetPassword />} />
//         <Route path="/serviceForgotPassword" element={<ServiceForgotPAssword />} />

//         <Route path='' element={<PrivateRoutes />}>
//           <Route path="/service" element={<BuyertalkSidebar />} />
//           <Route path="/product" element={<BuyertalkSidebar />}>
//             <Route path="products" element={<Products />} />
//             <Route path="products2" element={<Products2 />} />
//             <Route path="viewmyproducts" element={<ViewMyProducts />} />
//             <Route path="updateproduct/:id" element={<UpdateMyProduct />} />
//           </Route>
//           <Route path="/user" element={<UserSidebar />}>
//             <Route path="profile" element={<UserProfile />} />
//           </Route>
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from 'react'

import './assets/adminlte.css'
import './assets/adminlte.min.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { SignUp } from './components/common/SignUp'
import { BuyertalkSidebar } from './components/layouts/BuyertalkSidebar'
import axios from 'axios'
import { Products } from './components/product/Products'
import PrivateRoutes from './hooks/PrivateRoutes'
import { Products2 } from './components/product/Products2'
import { ViewMyProducts } from './components/product/ViewMyProducts'
import { UpdateMyProduct } from './components/product/UpdateMyProduct'
import { LandingPage } from './components/common/LandingPage'
import { ServiceProviderLogin } from './components/common/ServiceProviderLogin'
import { ServiceProviderSignUp } from './components/common/ServiceProviderSignUp'
import { ResetPassword } from './components/common/ResetPassword'
import { AddComplaints } from './components/user/Addcomplaints'
import { ViewAllComplaints } from './components/user/ViewAllComplaints'
import { ForgotPassword } from './components/common/ForgotPassword'
import { ContactUs } from './components/common/Contactus'
import { ServiceResetPassword } from './components/common/ServiceResetPassword'
import { ServiceForgotPAssword } from './components/common/ServiceForgotPAssword'
import { ViewMyComplaints } from './components/user/ViewMyComplaints'
import { ViewAllReviewAndRatings } from './components/user/ViewAllReviewAndRatings'
import { ViewMyReviewAndRating } from './components/user/ViewMyReviewAndRating'
import { AddReviewAndRatings } from './components/user/AddReviewAndRatings'
import { UserSidebar } from './components/product/UserSidebar'

axios.defaults.baseURL = "http://localhost:3000"

const shouldApplyAppWrapper = (pathname) => {
  const noWrapperPaths = [
    '/login', 
    '/signup', 
    '/service/login', 
    '/service/signup', 
    '/resetPassword/', 
    '/forgotpassword',
    '/serviceForgotPassword', 
    '/serviceResetPassword/', 
    '/addcomplaint',
    '/viewmycomplaints',
    '/addreviewandrating',
    '/viewallreviewandratings',
    '/viewallcomplaints',
    '/viewmyreviewandrating',
    '/contactus'
    
  ];

  if (pathname === '/') return false;

  return !noWrapperPaths.some(path => pathname.startsWith(path));
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const reloadCSS = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const newLink = link.cloneNode(true);
        const href = link.getAttribute('href');
        newLink.href = `${href}?v=${new Date().getTime()}`;
        link.parentNode.replaceChild(newLink, link);
      });
    };
    reloadCSS();
  }, [location.pathname]);

  return (
    <div className={shouldApplyAppWrapper(location.pathname) ? "app-wrapper" : ""}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/service/login" element={<ServiceProviderLogin />} />
        <Route path="/service/signup" element={<ServiceProviderSignUp />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/addcomplaint" element={<AddComplaints />} />
        <Route path="/viewallcomplaints" element={<ViewAllComplaints />} />
        <Route path="/viewmycomplaints" element={<ViewMyComplaints></ViewMyComplaints>} />
        <Route path="/addreviewandrating" element={<AddReviewAndRatings></AddReviewAndRatings>} />
        <Route path="/viewallreviewandratings" element={<ViewAllReviewAndRatings></ViewAllReviewAndRatings>} />
        <Route path="/viewmyreviewandrating" element={<ViewMyReviewAndRating></ViewMyReviewAndRating>} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/serviceResetPassword/:token" element={<ServiceResetPassword />} />
        <Route path="/serviceForgotPassword" element={<ServiceForgotPAssword />} />

        <Route path='' element={<PrivateRoutes />}>
          <Route path="/service" element={<BuyertalkSidebar />} />
          <Route path="/product" element={<BuyertalkSidebar />}>
            <Route path="products" element={<Products />} />
            <Route path="products2" element={<Products2 />} />
            <Route path="viewmyproducts" element={<ViewMyProducts />} />
            <Route path="updateproduct/:id" element={<UpdateMyProduct />} />
          </Route>x
          <Route path="/user" element={<UserSidebar></UserSidebar>}>
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App

