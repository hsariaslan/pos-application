import {useDispatch} from "react-redux";
import {message} from "antd";
import {removeProduct} from "../../redux/cartSlice";
import QuantityChanger from "./QuantityChanger";

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();

  return (
    <li className="cart-item flex justify-between">
      <div className="flex justify-between">
        <img
          src={cartItem.image}
          alt={cartItem.title}
          className="w-16 h-16 object-cover cursor-pointer"
          onClick={() => {
            dispatch(removeProduct(cartItem));
            message.success("Ürün sepetten çıkarıldı.");
          }}
        />
        <div className="flex flex-col justify-center ml-2">
          <b>{cartItem.title}</b>
          <span>{cartItem.price}₺ x {cartItem.quantity}</span>
        </div>
      </div>
      <div className="flex gap-x-1 items-center">
        <QuantityChanger cartItem={cartItem} />
      </div>
    </li>
  );
};

export default CartItem;