import "./App.css";

// react
import Axios from "axios";
import { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

// components
//import { ProtectingRoute } from "./components/ProtectingRoute";

// pages
import { AdminPage } from "./pages/AdminPage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/userSlice";

import Home from "./pages/home";
import ProductDetail from "./components/productdetail";
import { ProductDetailImage } from "./components/productdetail_image";
import { RegisterModal } from "./components/Authentications/RegisterModal";
import { Login } from "./components/Authentications/LoginModal";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import { cartUser } from "./redux/cartSlice";
import { UnAuthorizedRequest } from "./pages/UnAuthorized";
import { NotFoundPage } from "./pages/NotFound";

const url = process.env.REACT_APP_API_BASE_URL;

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

        {/* admin */}
        {role === 1 ? null : (
          <Route
            path="/admin"
            element={
              // <ProtectingRoute>
              <AdminPage />
              // </ProtectingRoute>
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;
