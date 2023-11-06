import {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart-total/CartTotals";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/");
        const data = await res.json();
        data &&
        setCategories(
          data.map((item) => {
            return {...item, value: item.title}
          })
        );
      } catch (e) {
        console.log(e);
      }
    }

    getCategories();
  }, []);

  return (
    <div>
      <Header/>
      <div className="home flex md:flex-row flex-col justify-between px-6 gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh-134px)]">
          <Categories categories={categories} setCategories={setCategories} />
        </div>
        <div className="products flex-[8] md:overflow-y-auto md:max-h-[calc(100vh-134px)]">
          <Products categories={categories} />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-6 md:-mt-6 border md:min-h-screen md:pb-0 pb-14">
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default HomePage;