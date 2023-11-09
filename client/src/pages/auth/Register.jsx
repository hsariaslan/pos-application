import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Input, Button, Carousel, message} from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      if (res.status === 200) {
        navigate("/login");
        message.success("Kayıt olma işlemi başarılı. Giriş yapınız.");
      }
    } catch (e) {
      setLoading(false);
      message.error("Kayıt olurken hata.");
      console.log(e);
    }
  }

  return (
  <div className="h-screen">
    <div className="flex justify-between h-full">
      <div className="xl:px-20 px-10 flex flex-col w-full h-full justify-center relative">
        <h1 className="text-center text-5xl font-bold mb-6">LOGO</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: "Kullanıcı Adı alanı boş bırakılamaz."
            }]}
            label="Kullanıcı Adı"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{
              required: true,
              message: "Email alanı boş bırakılamaz."
            }]}
            label="Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: "Şifre alanı boş bırakılamaz."
            }]}
            label="Şifre"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="passwordAgain"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Şifre Tekrar alanı boş bırakılamaz."
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Şifreler aynı değil.'));
                },
              }),
            ]}
            label="Şifre Tekrar"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full mt-2"
              loading={loading}
            >
              Kaydol
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center absolute left-0 bottom-10 w-full">
          <span>Bir hesabınız var mı?&nbsp;</span>
          <Link to="/login" className="text-blue-600">Şimdi giriş yap</Link>
        </div>
      </div>
      <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
        <div className="w-full h-full flex items-center">
          <div className="w-full">
            <Carousel className="h-full px-6" autoplay>
              <AuthCarousel
                image="images/responsive.svg"
                title="Responsive"
                description="Tüm Cihaz Boyutlarıyla Uyumluluk"
              />
              <AuthCarousel
                image="images/statistics.svg"
                title="İstatistikler"
                description="Geniş Tutulan İstatistikler"
              />
              <AuthCarousel
                image="images/customer.svg"
                title="Müşteri Memnuniyeti"
                description="Deneyim Sonunda Üründen Memnun Müşteriler"
              />
              <AuthCarousel
                image="images/admin.svg"
                title="Yönetici Paneli"
                description="Tek Yerden Yönetim"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;