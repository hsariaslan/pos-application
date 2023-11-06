import {Modal, Form, Input, Button, message, Select} from 'antd';

const CreateProduct = ({
   categories,
   products,
   setProducts,
   isAddModalOpen,
   setIsAddModalOpen
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      form.resetFields();
      setProducts([...products, {
        ...values,
        _id: Math.random(),
        price: Number(values.price),
      }]);

      message.success("Ürün başarıyla oluşturuldu.");
    } catch (e) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(e);
    }
  }

  return (
    <Modal
      title="Yeni Ürün Oluştur"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
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
  );
};

export default CreateProduct;