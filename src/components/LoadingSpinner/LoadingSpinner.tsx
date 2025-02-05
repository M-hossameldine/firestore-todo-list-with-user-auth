import { Spin } from "antd";
import { Flex } from "antd";

const LoadingSpinner = () => {
  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
      <Spin size="large" />
    </Flex>
  );
};

export default LoadingSpinner;
