import {Form, Input, Checkbox, Button, Carousel, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import {useState} from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem("posUser", JSON.stringify({
          username: user.username,
          email: user.email
        }));
        navigate("/");
      } else {
        setLoading(false);
        message.error("Email veya şifre yanlış.");
      }
    } catch (e) {
      setLoading(false);
      message.error("Giriş yaparken hata.");
      console.log(e);
    }
  }
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 flex flex-col w-full h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-6">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
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
              name="remember"
              valuePropName="checked"
            >
              <div className="flex justify-between items-center">
                <Checkbox>Beni hatırla</Checkbox>
                <Link to="/login">Şifrenizi unuttunuz mu?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full mt-2"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            <span>Henüz bir hesabınız yok mu?&nbsp;</span>
            <Link to="/register" className="text-blue-600">Şimdi kaydol</Link>
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

export default Login;