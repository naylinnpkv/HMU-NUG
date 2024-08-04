import { Link } from "react-router-dom";
import { Button, Space } from "antd";

export const Home = () => {
  return (
    <Space size="large" align="center" direction="horizontal">
      <Link to="/create-ticket" state={"is25$ticket"}>
        <Button
          type="primary"
          size="middle"
          shape="round"
          style={{ minWidth: "150px" }}
        >
          Generate 25$ Tickets
        </Button>
      </Link>
      <Link to="/create-ticket" state={"is10$ticket"}>
        <Button
          size="middle"
          shape="round"
          style={{
            backgroundColor: "aqua",
            minWidth: "150px",
          }}
        >
          Generate 10$ Tickets
        </Button>
      </Link>
    </Space>
  );
};
