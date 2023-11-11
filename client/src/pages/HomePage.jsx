import {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart-total/CartTotals";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getCategories = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/categories/");
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

  const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/products/");
      const data = await res.json();

      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Header setSearch={setSearch} />
      <div className="home flex md:flex-row flex-col justify-between px-6 gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh-134px)]">
          <Categories
            categories={categories}
            setCategories={setCategories}
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        <div className="products flex-[8] md:overflow-y-auto md:max-h-[calc(100vh-134px)]">
          <Products
            categories={categories}
            products={products}
            setProducts={setProducts}
            filteredProducts={filteredProducts}
            search={search}
          />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-6 md:-mt-6 border md:min-h-screen md:pb-0 pb-14">
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default HomePage;