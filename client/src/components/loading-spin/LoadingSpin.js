import {Spin} from "antd";

const LoadingSpin = () => {
  return (
    <Spin size="large" className="absolute flex items-center justify-center w-screen h-screen -mt-24" />
  );
}

export default LoadingSpin;