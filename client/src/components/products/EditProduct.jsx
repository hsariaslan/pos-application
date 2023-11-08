import {useEffect, useState} from "react";
import {Form, Table, Input, Button, message, Select, Modal} from 'antd';

const EditProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + "/categories/");
        const data = await res.json();
        data &&
        setCategories(
          data.map((item) => {
            return {...item, value: item.title}
          })
        );
      } catch (e) {
        console.log(e);
      }
    }

    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + "/products/");
        const data = await res.json();

        setProducts(data);
      } catch (e) {
        console.log(e);
      }
    }

    getCategories();
    getProducts();
  }, []);

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/products/update", {
        method: "PUT",
        body: JSON.stringify({...values, id: editingItem._id}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      setProducts(products.map((item) => {
        if (item._id === editingItem._id) {
          return values;
        }

        return item;
      }));

      setIsEditModalOpen(false);

      message.success("Ürün başarıyla güncellendi.");
    } catch (e) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(e);
    }
  }

  const deleteProduct = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_API_URL + "/products/delete", {
          method: "DELETE",
          body: JSON.stringify({id: id}),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        setProducts(products.filter((item) => item._id !== id));

        message.success("Ürün başarıyla silindi.");
      } catch (e) {
        console.log(e);
      }
    }
  }

  const columns = [
    {
      width: "8%",
      title: "Ürün Adı",
      dataIndex: "title",
    },
    {
      width: "3%",
      title: "Görsel",
      dataIndex: "image",
      render: (_, record) => {
        return (
          <img src={record.image} alt={record.title} className="w-full h-20 object-cover" />
        );
      }
    },
    {
      width: "8%",
      title: "Fiyat",
      dataIndex: "price",
      render: (text) => {
        return (<span>{text}₺</span>);
      }
    },
    {
      width: "8%",
      title: "Kategori",
      dataIndex: "category",
    },
    {
      width: "8%",
      title: "İşlemler",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteProduct(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        bordered
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Ürün Düzenle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
          <Form.Item
            name="title"
            rules={[{required: true, message: "Ürün Adı alanı boş bırakılamaz."}]}
            label="Ürün Adı"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[{required: true, message: "Ürün Resim URL'si alanı boş bırakılamaz."}]}
            label="Ürün Resim URL'si"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{required: true, message: "Ürün Fiyatı alanı boş bırakılamaz."}]}
            label="Ürün Fiyatı"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            rules={[{required: true, message: "Ürün Kategorisi alanı boş bırakılamaz."}]}
            label="Ürün Kategorisi"
          >
            <Select
              showSearch
              placeholder="Ürün kategorisi seçiniz"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.title ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">Kaydet</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;