import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Invoices from "./pages/Invoices";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;