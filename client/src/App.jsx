import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";

const App = () => {
  return (
    <div>
      <Header/>
      <div className="home flex justify-between px-6 gap-10">
        <div className="categories flex-1 overflow-auto max-h-[calc(100vh-_+134px)]">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <Products />
        </div>
        <div className="cart-totals">
          <div>cart-totals</div>
        </div>
      </div>
    </div>
  );
};

export default App;