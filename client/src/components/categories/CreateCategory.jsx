import {Modal, Form, Input, Button, message} from 'antd';

const CreateCategory = ({categories, setCategories, isAddModalOpen, setIsAddModalOpen}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/create", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      form.resetFields();
      setCategories([...categories, {
        _id: Math.random(),
        title: values.title,
      }]);

      message.success("Kategori başarıyla oluşturuldu.");
    } catch (e) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(e);
    }
  }

  return (
    <Modal
      title="Yeni Kategori Oluştur"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          rules={[{required: true, message: "Kategori Adı alanı boş bırakılamaz."}]}
          label="Kategori Adı"
        >
          <Input
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">Kaydet</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;