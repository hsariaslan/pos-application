import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";
import CartTotals from "./components/cart-total/CartTotals";

const App = () => {
  return (
    <div>
      <Header/>
      <div className="home flex justify-between px-6 gap-10">
        <div className="categories min-w-[145px] overflow-auto max-h-[calc(100vh-_+134px)]">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-6 md:-mt-6 border min-h-screen">
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default App;