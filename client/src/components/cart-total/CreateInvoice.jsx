import {Modal, Form, Input, Select, Button, Card} from "antd";

const CreateInvoice = ({isModalOpen, setIsModalOpen}) => {
  return (
    <div>
      <Modal title="Fatura Oluştur" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical">
          <Form.Item
            name="customer_name"
            rules={[{required: true}]}
            label="Müşteri Adı"
          >
            <Input placeholder="Müşteri adı soyadı yazınız" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[{required: true}]}
            label="Telefon Numarası"
          >
            <Input placeholder="Müşterinin telefon numarasını yazınız" />
          </Form.Item>
          <Form.Item
            name="payment_method"
            rules={[{required: true}]}
            label="Ödeme Yöntemi"
          >
            <Select placeholder="Ödeme yöntemi seçiniz">
              <Select.Option value={0}>Nakit</Select.Option>
              <Select.Option value={1}>Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <Card>
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>549.00₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">+43.92₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>592.92₺</b>
            </div>
            <div className="flex jus tify-end">
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