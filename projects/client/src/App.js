import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail from "./components/productdetail";
import { ProductDetailImage } from "./components/productdetail_image";
import { RegisterModal } from "./components/register";
import { Login } from "./components/login";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import Axios from "axios";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartUser } from "./redux/cartSlice";import { login } from "./redux/userSlice";
import { UnAuthorizedRequest } from "./pages/UnAuthorized";
import { NotFoundPage } from "./pages/NotFound";

const url = `${process.env.REACT_APP_API_BASE_URL}`;
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id, role } = useSelector((state) => state.userSlice.value);

  const keepLogin = useCallback(async () => {
    try {
      const result = await Axios.get(`${url}/user/keeplogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        login({
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          isVerified: result.data.isVerified,
          role: result.data.role,
          picture: result.data.picture,
        })
      );

      const cart = await (await Axios.get(`${url}/cart/${id}`)).data;
      dispatch(cartUser(cart.result));
    } catch (err) {}
  }, [dispatch, id, token]);

  useEffect(() => {
    keepLogin();
  }, [keepLogin]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/prodctdetail_image" element={<ProductDetailImage />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/verification/:token" element={<VerificationPage />} /> */}

        <Route path="/verification-page" element={<VerificationPage />} />
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />

        {/* not found  */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/401" element={<UnAuthorizedRequest />} />
      </Routes>
    </>
  );
}

export default App;

// const url = process.env.REACT_APP_API_BASE_URL;

// function App() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const { id, role } = useSelector((state) => state.userSlice.value);

//   const keepLogin = useCallback(async () => {
//     try {
//       const result = await Axios.get(`${url}/user/keeplogin`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch(
//         login({
//           id: result.data.id,
//           email: result.data.email,
//           name: result.data.name,
//           is_verified: result.data.is_verified,
//           role: result.data.role,
//           picture: result.data.picture,
//         })
//       );

//       // const cart = await (await Axios.get(`${url}/cart/${id}`)).data;
//       // dispatch(cartUser(cart.result));
//     } catch (err) {
//     }
//   }, [dispatch, id, token]);

//   useEffect(() => {
//     keepLogin();
//   }, [keepLogin]);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />}>
//           <Route index element={<Home />} />
//         </Route>
//         {/* <Route
//           path="/order-list"
//           element={
//             <ProtectingRoute>
//               <OrderListPage />
//             </ProtectingRoute>
//           }
//         /> */}
//         {/* <Route
//           path="/profile/settings"
//           element={
//             <ProtectingRoute>
//               <ProfilePage />
//             </ProtectingRoute>
//           }
//         /> */}
//         {/* <Route
//           path="/profile/settings/address"
//           element={
//             <ProtectingRoute>
//               <ProfileAddressPage />
//             </ProtectingRoute>
//           }
//         /> */}
//         {/* <Route path="/product" element={<ProductPage />} />
//         <Route path="/product/:name" element={<DetailProductPage />} />
//         <Route
//           path="/cart"
//           element={
//             <ProtectingRoute>
//               <CartPage />
//             </ProtectingRoute>
//           }
//         /> */}
//         {/* <Route
//           path="/cart/checkout"
//           element={
//             <ProtectingRoute>
//               <CheckoutPage />
//             </ProtectingRoute>
//           }
//         /> */}

//         <Route path="/verification/:token" element={<VerificationPage />} />
//         {/* <Route path="/resetpassword/:token" element={<ResetPasswordPage />} /> */}

//         {/* not found  */}
//         <Route path="*" element={<NotFoundPage />} />
//         <Route path="/401" element={<UnAuthorizedRequest />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
