import {useDispatch} from "react-redux";
import {Button, message} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {decreaseQuantity, increaseQuantity} from "../../redux/cartSlice";

const QuantityChanger = ({cartItem}) => {
  const dispatch = useDispatch();

  return (
    <>
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
    </>
  );
};

export default QuantityChanger;