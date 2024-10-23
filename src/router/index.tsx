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
              children={<HomePage></HomePage>}
            />
          }
        ></Route>
        <Route
          path="/products"
          element={
            <ProtectedRoute
              isAuthenticated={token ? true : false}
              redirectPath={"/login"}
              children={<ProductsPage></ProductsPage>}
            />
          }
        ></Route>
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute
              isAuthenticated={token ? true : false}
              redirectPath={"/login"}
              children={<ProductPage></ProductPage>}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAuthenticated={token ? false : true}
              redirectPath={"/"}
              children={<LoginPage></LoginPage>}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <ProtectedRoute
              isAuthenticated={token ? false : true}
              redirectPath={"/login"}
              children={<RegisterPage></RegisterPage>}
            />
          }
        ></Route>
      </Route>
    </>
  )
);

export default router;
