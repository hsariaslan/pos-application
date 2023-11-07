import {useDispatch} from "react-redux";
import {Button, message} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {decreaseQuantity, increaseQuantity, removeProduct,} from "../../redux/cartSlice";

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
        <Button
          type="primary"
          size="small"
          icon={<MinusCircleOutlined />}
          className="!rounded-full !bg-gray-500 hover:opacity-80"
          onClick={() => {
            if (cartItem.quantity === 1) {
              if (window.confirm("Ürün sepetten çıkarılsın mı?")) {
                dispatch(decreaseQuantity(cartItem))
                message.success("Ürün sepetten çıkarıldı.");
              }
            } else {
              dispatch(decreaseQuantity(cartItem))
            }
          }}
        />
        <span className="font-bold text-xl w-3 inline-block text-center">{cartItem.quantity}</span>
        <Button
          type="primary"
          size="small"
          icon={<PlusCircleOutlined />}
          className="!rounded-full"
          onClick={() => dispatch(increaseQuantity(cartItem))}
        />
      </div>
    </li>
  );
};

export default CartItem;