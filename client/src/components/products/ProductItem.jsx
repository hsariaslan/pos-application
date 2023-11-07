import {useDispatch} from "react-redux";
import {addProduct} from "../../redux/cartSlice";
import "./products.css";

const ProductItem = ({product}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...product, quantity: 1}));
  }

  return (
    <div className="product-item" onClick={handleClick}>
      <div className="product-img">
        <img
          src={product.image}
          alt={product.title}
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{product.title}</span>
        <span>{product.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;