import {useSelector} from "react-redux";
import {Input, Badge} from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './header.css';

const Header = ({setSearch}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("posUser");
    navigate("/login");
  }

  return (
    <header className="px-6 py-4 border-b mb-6 flex justify-between items-center gap-10">
      <div className="logo">
        <Link to="/" className="text-2xl font-bold md:text-4xl">LOGO</Link>
      </div>
      <div
        className="search-bar flex-1 flex justify-center"
      >
        <Input
          id="search"
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="rounded-full max-w-[800px]"
          onFocus={() => {
            pathname !== "/" && navigate("/");
          }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="menu-links">
        <Link to="/" className={`menu-link ${pathname === "/" && "active"}`}>
          <HomeOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Anasayfa</span>
        </Link>
        <Badge count={cartItems.length} offset={[0, 6]} className="md:flex hidden">
          <Link to="/cart" className={`menu-link ${pathname === "/cart" && "active"}`}>
            <ShoppingCartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
        <Link to="/invoices" className={`menu-link ${pathname === "/invoices" && "active"}`}>
          <CopyOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Faturalar</span>
        </Link>
        <Link to="/customers" className={`menu-link ${pathname === "/customers" && "active"}`}>
          <UserOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Müşteriler</span>
        </Link>
        <Link to="/statistics" className={`menu-link ${pathname === "/statistics" && "active"}`}>
          <BarChartOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">İstatistikler</span>
        </Link>
        <Link to="/login" onClick={logOut} className="menu-link">
          <LogoutOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Çıkış</span>
        </Link>
      </div>
      <Badge count={cartItems.length} offset={[0, 6]} className="md:hidden flex">
        <Link to="/cart" className={`menu-link ${pathname === "/cart" && "active"}`}>
          <ShoppingCartOutlined className="text-2xl" />
          <span className="md:text-xs text-[10px]">Sepet</span>
        </Link>
      </Badge>
    </header>
  );
};

export default Header;