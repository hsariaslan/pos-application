import { Input, Badge } from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className="px-6 py-4 border-b mb-6 flex justify-between items-center gap-10">
      <div className="logo">
        <a href="/" className="text-2xl font-bold md:text-4xl">LOGO</a>
      </div>
      <div className="search-bar flex-1 flex justify-center">
        <Input
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="rounded-full max-w-[800px]"
        />
      </div>
      <div className="menu-links flex justify-around items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen
      md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-2">
        <Link to="/" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
          <HomeOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Anasayfa</span>
        </Link>
        <Badge count={5} offset={[0, 6]} className="md:flex hidden">
          <Link to="/cart" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
            <ShoppingCartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
        <Link to="/invoices" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
          <CopyOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Faturalar</span>
        </Link>
        <a href="/" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
          <UserOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Müşteriler</span>
        </a>
        <a href="/" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
          <BarChartOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">İstatistikler</span>
        </a>
        <a href="/" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
          <LogoutOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Çıkış</span>
        </a>
      </div>
      <Badge count={5} offset={[0, 6]} className="md:hidden flex">
        <a href="/" className="flex flex-col items-center hover:text-[#40a9ff] transition-all">
          <ShoppingCartOutlined className="text-2xl" />
          <span className="md:text-xs text-[10px]">Sepet</span>
        </a>
      </Badge>
    </header>
  );
};

export default Header;