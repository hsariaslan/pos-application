import {useState, useEffect} from 'react';
import {Area, Pie} from '@ant-design/plots';
import Header from "../components/header/Header";
import StatisticsCard from "../components/statistics/StatisticsCard";

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const data2 = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];

  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data2,
    angleField: 'value',
    colorField: 'type',
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
        content: 'AntV\nG2Plot',
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
        <div className="statistics-section">
          <h2 className="text-xl">
            Hoş geldin <span className="text-green-700 font-bold text-xl">admin</span>.
          </h2>
          <div className="statistics-card my-10 grid xl:grid-cols-4 md:grid-cols-2 md:gap-10 gap-4">
            <StatisticsCard
              image="images/user.png"
              title="Toplam Müşteri"
              amount={7}
            />
            <StatisticsCard
              image="images/money.png"
              title="Toplam Kazanç"
              amount="1266.84 ₺"
            />
            <StatisticsCard
              image="images/sale.png"
              title="Toplam Satış"
              amount={8}
            />
            <StatisticsCard
              image="images/product.png"
              title="Toplam Ürün"
              amount={34}
            />
          </div>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
            <div className="lg:w-1/2 lg:h-full w-5/6 h-72">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 lg:h-full w-5/6 h-72">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;