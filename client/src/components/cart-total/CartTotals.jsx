import {useDispatch, useSelector} from "react-redux";
import {Button, message} from "antd";
import {ClearOutlined} from '@ant-design/icons';
import CartItem from "./CartItem";
import {clearCart} from "../../redux/cartSlice";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart h-full flex flex-col max-h-[calc(100vh-90px)]">
      <h2 className="bg-blue-600 text-white text-center py-4 font-bold tracking-wide">Sepetteki Ürünler</h2>
      <ul className="cart-items px-2 py-2 overflow-y-auto">
        {cart.cartItems.length > 0 ? cart.cartItems.map((cartItem) => (
          <CartItem key={cartItem._id} cartItem={cartItem} />
        )) : 'Sepette ürün yok.'}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.subTotal}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{process.env.REACT_APP_TAX}</b>
            <span className="text-red-700">{cart.tax > 0 ? '+' + cart.tax : 0}₺</span>
          </div>
        </div>
        <div className="border-b my-2">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl font-bold">{cart.total}₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            className="w-full mt-2"
            icon={<ClearOutlined />}
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              if (window.confirm("Sepet temizlensin mi?")) {
                dispatch(clearCart());
                message.success("Sepet temizlendi.");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;