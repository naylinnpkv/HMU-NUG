import React from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import "./Home.css";

export const Home = () => {
  return (
    <div className="space-align-block">
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
        <Button
          type="primary"
          size="middle"
          disabled
          shape="round"
          style={{
            background: "wheat",
            borderColor: "white",
            minWidth: "150px",
          }}
        >
          Raffle
        </Button>
      </Space>
    </div>
  );
};
