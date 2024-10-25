// import { Toaster } from "@/components/ui/toaster";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import CartDrawer from "./components/CartDrawer";

const App = () => {
  return (
    <>
      <main>
        <RouterProvider router={router}></RouterProvider>
        <CartDrawer></CartDrawer>
      </main>
    </>
  );
};

export default App;
