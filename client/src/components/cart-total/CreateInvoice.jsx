import {useDispatch, useSelector} from "react-redux";
import {Modal, Form, Input, Select, Button, Card, message} from "antd";
import {clearCart} from "../../redux/cartSlice";
import {useNavigate} from "react-router-dom";

const CreateInvoice = ({isModalOpen, setIsModalOpen}) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/invoices/create", {
        method: "POST",
        body: JSON.stringify({...values, ...cart}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      if (res.status === 200) {
        dispatch(clearCart());
        form.resetFields();
        navigate("/invoices");
        message.success("Fatura başarıyla oluşturuldu.");
      }
    } catch (e) {
      message.error("Fatura oluştururken hata.");
      console.log(e);
    }
  }

  return (
    <div>
      <Modal title="Fatura Oluştur" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="customerName"
            rules={[{required: true}]}
            label="Müşteri Adı"
          >
            <Input placeholder="Müşteri adı soyadı yazınız" />
          </Form.Item>
          <Form.Item
            name="customerPhoneNumber"
            rules={[{required: true}]}
            label="Telefon Numarası"
          >
            <Input placeholder="Müşterinin telefon numarasını yazınız" />
          </Form.Item>
          <Form.Item
            name="paymentMethod"
            rules={[{required: true}]}
            label="Ödeme Yöntemi"
          >
            <Select placeholder="Ödeme yöntemi seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <Card>
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
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                onClick={() => setIsModalOpen(true)}
                htmlType="submit"
              >
                Sipariş Oluştur
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateInvoice;