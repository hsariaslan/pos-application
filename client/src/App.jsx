import {useEffect} from "react";
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Products from "./pages/Products";

const App = () => {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("posCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter basename="/pos">
      <Routes>
        <Route path="/" element={
          <RouteControl>
            <HomePage />
          </RouteControl>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={
          <RouteControl>
            <Cart />
          </RouteControl>
        } />
        <Route path="/invoices" element={
          <RouteControl>
            <Invoices />
          </RouteControl>
        } />
        <Route path="/customers" element={
          <RouteControl>
            <Customers />
          </RouteControl>
        } />
        <Route path="/products" element={
          <RouteControl>
            <Products />
          </RouteControl>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({children}) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}