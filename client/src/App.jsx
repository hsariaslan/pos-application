import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Statistics from "./pages/Statistics";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;