import Header from "../components/header/Header";
import EditProduct from "../components/products/EditProduct";

const Products = () => {
  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Ürünler</h1>
        <EditProduct />
      </div>
    </div>
  );
};

export default Products;