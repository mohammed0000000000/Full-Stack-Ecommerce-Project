import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import cookieservices from "../services/cookieservices";
import HomePage from "../pages";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/Product";
import ProductsPage from "../pages/Products";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardProducts from "../pages/dashboard/DashboardProducts";

const token = cookieservices.get("jwt");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAuthenticated={token ? true : false}
              redirectPath={"/login"}
              children={<HomePage />}
            />
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute
              isAuthenticated={token ? true : false}
              redirectPath={"/login"}
              children={<ProductsPage />}
            />
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute
              isAuthenticated={token ? true : false}
              redirectPath={"/login"}
              children={<ProductPage />}
            />
          }
        />
        {/* Auth */}
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAuthenticated={token ? false : true}
              redirectPath={"/"}
              children={<LoginPage />}
            />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute
              isAuthenticated={token ? false : true}
              redirectPath={"/login"}
              children={<RegisterPage />}
            />
          }
        />
      </Route>
      {/* Admin */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<h1> Dashboard Page</h1>} />
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Route>
    </>
  )
);
export default router;
