import {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Table, Card, Button, message, Popconfirm, Space, Input} from "antd";
import Highlighter from 'react-highlight-words';
import Header from "../components/header/Header";
import CreateInvoice from "../components/cart-total/CreateInvoice";
import QuantityChanger from "../components/cart-total/QuantityChanger";
import {removeProduct} from "../redux/cartSlice";
import {SearchOutlined} from "@ant-design/icons";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return (<span>{text}₺</span>);
      },
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Adet',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => {
        return (<QuantityChanger cartItem={record} />);
      },
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Toplam Fiyat',
      render: (_, record) => {
        return (<span>{record.quantity * record.price}₺</span>);
      },
      sorter: (a, b) => (a.quantity * a.price) - (b.quantity * b.price)
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