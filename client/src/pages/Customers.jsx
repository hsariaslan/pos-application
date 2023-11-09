import {useEffect, useState} from "react";
import {Table} from "antd";
import Header from "../components/header/Header";

const Customers = () => {
  const [invoices, setInvoices] = useState([]);

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
      title: 'İşlem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => text.substring(0, 10)
    },
  ];

  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Müşteriler</h1>
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
    </div>
  );
};

export default Customers;