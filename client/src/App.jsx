import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";

const App = () => {
  return (
    <div>
      <Header/>
      <div className="home flex justify-between px-6 gap-10">
        <div className="categories flex-1 overflow-auto max-h-[calc(100vh-_+134px)]">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <div>products</div>
        </div>
        <div className="cart-totals">
          <div>cart-totals</div>
        </div>
      </div>
    </div>
  );
};

export default App;