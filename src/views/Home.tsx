import React from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";

export const Home = () => {
  return (
    <Space size="large" align="center" direction="horizontal">
      <Link to="/ticket">
        <Button
          type="primary"
          size="middle"
          shape="round"
          style={{ minWidth: "150px" }}
        >
          Generate E-Ticket
        </Button>
      </Link>
      <Link to="/raffle-generator">
        <Button
          type="primary"
          size="middle"
          shape="round"
          style={{
            background: "wheat",
            borderColor: "white",
            minWidth: "150px",
          }}
        >
          Raffle
        </Button>
      </Link>
    </Space>
  );
};
