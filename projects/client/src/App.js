import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail from "./components/productdetail";
import { ProductDetailImage } from "./components/productdetail_image";
import { RegisterModal } from "./components/register";
import { Login } from "./components/login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/prodctdetail_image" element={<ProductDetailImage />} />
        <Route path="/register" element={<RegisterModal />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;
