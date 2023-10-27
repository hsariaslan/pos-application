import {Button} from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

const CartTotals = () => {
  return (
    <div className="cart h-full flex flex-col max-h-[calc(100vh_-_90px)]">
      <h2 className="bg-blue-600 text-white text-center py-4 font-bold tracking-wide">Sepetteki Ürünler</h2>
      <ul className="cart-items px-2 py-2 overflow-y-auto">
        <li className="cart-item flex justify-between">
          <div className="flex justify-between">
            <img
              src="https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg"
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col justify-center ml-2">
              <b>Elma</b>
              <span>12₺ x 2</span>
            </div>
          </div>
          <div className="flex gap-x-1 items-center">
            <Button
              type="primary"
              size="small"
              icon={<MinusCircleOutlined />}
              className="!rounded-full"
            />
            <span>1</span>
            <Button
              type="primary"
              size="small"
              icon={<PlusCircleOutlined />}
              className="!rounded-full"
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>99₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-700">+7.92₺</span>
          </div>
        </div>
        <div className="border-b my-2">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl font-bold">99₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            className="w-full mt-2"
            icon={<ClearOutlined />}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;