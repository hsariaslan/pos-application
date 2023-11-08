import {useEffect, useState} from 'react';
import {Table, Button} from "antd";
import Header from "../components/header/Header";
import PrintInvoice from "../components/invoices/PrintInvoice";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getInvoices = async() => {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + "/invoices/");
        const data = await res.json();
        setInvoices(data);
      } catch (e) {
        console.log(e);
      }
    }

    getInvoices();
  }, []);

  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => text.substring(0, 10)
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'total',
      key: 'total',
      render: (text) => (<span>{text}₺</span>)
    },
    {
      title: 'İşlemler',
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setInvoice(record);
            }}
          >
            Yazdır
          </Button>
        );
      }
    },
  ];

  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <Table
          dataSource={invoices}
          columns={columns}
          bordered
          pagination={false}
          rowKey="_id"
          scroll={{
            x: 1000,
            y: 300
          }}
        />
      </div>
      <PrintInvoice invoice={invoice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Invoices;