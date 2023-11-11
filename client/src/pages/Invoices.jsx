import {useEffect, useRef, useState} from 'react';
import {Table, Button, Input, Space} from "antd";
import Header from "../components/header/Header";
import PrintInvoice from "../components/invoices/PrintInvoice";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import LoadingSpin from "../components/loading-spin/LoadingSpin";

const Invoices = () => {
  const [invoices, setInvoices] = useState();
  const [invoice, setInvoice] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps('customerName'),
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      ...getColumnSearchProps('customerPhoneNumber'),
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
      ...getColumnSearchProps('paymentMethod'),
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'total',
      key: 'total',
      render: (text) => (<span>{text}₺</span>),
      sorter: (a, b) => a.total - b.total
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
        {invoices ? (
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
        ) : (<LoadingSpin />)}
      </div>
      <PrintInvoice invoice={invoice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Invoices;