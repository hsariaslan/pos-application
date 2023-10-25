import {Button, DatePicker} from 'antd';

const App = () => {
  return <div>
    <DatePicker />
    <Button type="primary">Primary Button</Button>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  </div>;
};

export default App;