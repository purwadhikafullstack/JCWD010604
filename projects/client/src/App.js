// import logo from "./logo.svg";
import "./App.css";

// react
import Axios from "axios";
import { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

// components
import { ProtectingRoute } from "./components/ProtectingRoute";

// pages
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/Loginpage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/userSlice";

const url = process.env.REACT_APP_API_BASE_URL;

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id, role } = useSelector((state) => state.userSlice.value);
  // console.log(role)

  const keepLogin = useCallback(async () => {
    try {
      const result = await Axios.get(`${url}/user/keeplogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(result)
      dispatch(
        login({
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          is_verified: result.data.is_verified,
          role: result.data.role
        }),
      );

      // const cart = await (await Axios.get(`${url}/cart/${id}`)).data;
      // dispatch(cartUser(cart.result));
    } catch (err) {}
  }, [dispatch, id, token]);

  useEffect(() => {
    keepLogin();
  }, [keepLogin]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
