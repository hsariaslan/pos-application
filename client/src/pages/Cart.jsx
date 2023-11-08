import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Table, Card, Button, message, Popconfirm} from "antd";
import Header from "../components/header/Header";
import CreateInvoice from "../components/cart-total/CreateInvoice";
import QuantityChanger from "../components/cart-total/QuantityChanger";
import {removeProduct} from "../redux/cartSlice";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      width: "126px",
      title: 'Ürün Resmi',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return (
          <img src={record.image} alt={record.title} className="w-full h-20 object-cover" />
        );
      }
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return (<span>{text}₺</span>);
      }
    },
    {
      title: 'Adet',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => {
        return (<QuantityChanger cartItem={record} />);
      }
    },
    {
      title: 'Toplam Fiyat',
      render: (_, record) => {
        return (<span>{record.quantity * record.price}₺</span>);
      }
    },
    {
      title: 'İşlemler',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Emin misiniz?"
            okText="Evet"
            cancelText="İptal"
            onConfirm={() => {
              dispatch(removeProduct(record));
              message.success("Ürün sepetten çıkarıldı.");
            }}
          >
            <Button type="link" danger className="pl-0">Sil</Button>
          </Popconfirm>
        );
      }
    },
  ];

  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Sepet</h1>
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          rowKey="_id"
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.subTotal}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %8</span>
              <span className="text-red-600">{cart.tax > 0 ? '+' + cart.tax : 0}₺</span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>{cart.total}₺</b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Cart;