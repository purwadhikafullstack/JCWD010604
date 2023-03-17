import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail from "./components/productdetail";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path= '/productdetail' element={<ProductDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
