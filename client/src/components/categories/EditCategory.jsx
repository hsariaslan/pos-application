import {useState} from "react";
import {Modal, Form, Table, Input, Button, message} from 'antd';

const EditCategory = ({categories, setCategories, isEditModalOpen, setIsEditModalOpen}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/update", {
        method: "PUT",
        body: JSON.stringify({...values, id: editingRow._id}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      setCategories(categories.map((item) => {
        if (item._id === editingRow._id) {
          return {...item, title: values.title}
        }

        return item;
      }));

      message.success("Kategori başarıyla güncellendi.");
    } catch (e) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(e);
    }
  }

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch("http://localhost:5000/api/categories/delete", {
          method: "DELETE",
          body: JSON.stringify({id: id}),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        setCategories(categories.filter((item) => item._id !== id));

        message.success("Kategori başarıyla silindi.");
      } catch (e) {
        console.log(e);
      }
    }
  }

  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return record.title;
        }
      }
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button
              type="link"
              htmlType="submit"
              className="text-gray-600"
            >
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <Modal
      title="Kategori İşlemleri"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form onFinish={onFinish}>
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="_id"
          bordered
        />
      </Form>
    </Modal>
  );
};

export default EditCategory;