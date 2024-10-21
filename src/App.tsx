import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import Navbar from "./layout/Navbar";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />
      </Routes>
    </>
  );
};

export default App;
