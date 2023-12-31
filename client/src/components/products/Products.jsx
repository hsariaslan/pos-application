import {useState} from "react";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import ProductItem from "./ProductItem";
import CreateProduct from "../products/CreateProduct";
import "./products.css";
import {useNavigate} from "react-router-dom";

const Products = ({categories, products, setProducts, filteredProducts, search}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filteredProducts
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((product) => (
          <ProductItem product={product} key={product._id} />
      ))}
      <div className="product-item product-item-action bg-purple-800" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-3xl text-white" />
      </div>
      <div className="product-item product-item-action bg-orange-800" onClick={() => navigate("/products")}>
        <EditOutlined className="md:text-3xl text-white" />
      </div>

      <CreateProduct
        categories={categories}
        products={products}
        setProducts={setProducts}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  );
};

export default Products;