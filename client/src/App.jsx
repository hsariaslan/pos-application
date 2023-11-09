import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Statistics from "./pages/Statistics";
import Products from "./pages/Products";

const App = () => {
  return (
    <BrowserRouter>
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
        <Route path="/statistics" element={
          <RouteControl>
            <Statistics />
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