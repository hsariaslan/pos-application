import {useState, useEffect} from 'react';
import {Area, Pie} from '@ant-design/plots';
import Header from "../components/header/Header";
import StatisticsCard from "../components/statistics/StatisticsCard";

const Statistics = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
    asyncFetch();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/products/");
      const data = await res.json();

      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  }

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_API_URL + "/invoices/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const configArea = {
    data,
    xField: 'customerName',
    yField: 'subTotal',
    xAxis: {
      range: [0, 1],
    },
  };

  const configPie = {
    appendPadding: 10,
    data,
    angleField: 'subTotal',
    colorField: 'customerName',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Toplam\nDeğer',
      },
    },
  };

  const totalProfit = () => {
    return data.reduce(((total, item) => item.total + total), 0).toFixed(2);
  }

  return (
    <div className="sm:pb-14">
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
        <div className="statistics-section">
          <h2 className="text-xl">
            Hoş geldin&nbsp;
            <span className="text-green-700 font-bold text-xl">
              {JSON.parse(localStorage.getItem("posUser")).username}
            </span>.
          </h2>
          <div className="statistics-card my-10 grid xl:grid-cols-4 md:grid-cols-2 md:gap-10 gap-4">
            <StatisticsCard
              image="images/user.png"
              title="Toplam Müşteri"
              amount={data.length}
            />
            <StatisticsCard
              image="images/money.png"
              title="Toplam Kazanç"
              amount={totalProfit() + '₺'}
            />
            <StatisticsCard
              image="images/sale.png"
              title="Toplam Satış"
              amount={data.length}
            />
            <StatisticsCard
              image="images/product.png"
              title="Toplam Ürün"
              amount={products?.length}
            />
          </div>
          <div className="flex justify-between gap-10 md:flex-row flex-col items-center">
            <div className="md:w-1/2 md:h-full w-full h-72">
              <Area {...configArea} />
            </div>
            <div className="md:w-1/2 md:h-full w-full h-72">
              <Pie {...configPie} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;