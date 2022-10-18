import { Space, Card, Spin, Button } from "antd";
import React, { useState, useEffect } from "react";
import "../statics/_raffle.css";
import Deepawali from "../statics/deepawali.png";
import _ from "lodash";
export const Raffle = () => {
  const [firstDigit, setFirstDigit] = useState<number | null>(null);
  const [secondDigit, setSecondDigit] = useState<number | null>(null);
  const [thirdDigit, setThirdDigit] = useState<number | null>(null);
  const [fourthDigit, setFourthDigit] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const prizes = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
  const getWinningNumbers = () => {
    setLoading(true);
    setFirstDigit(Math.floor(Math.random() * 9));
    setSecondDigit(Math.floor(Math.random() * 9));
    setThirdDigit(Math.floor(Math.random() * 9));
    setFourthDigit(Math.floor(Math.random() * 9));

    setTimeout(() => setLoading(false), 5000);
  };

  return (
    <>
      <img src={Deepawali} />

      <div className="raffle-wrapper">
        <Space size="large" align="center" direction="horizontal">
          <Card className="card">
            {!loading ? firstDigit : <Spin size="small" />}
          </Card>
          <Card className="card">
            {!loading ? secondDigit : <Spin size="small" />}
          </Card>
          <Card className="card">
            {!loading ? thirdDigit : <Spin size="small" />}
          </Card>
          <Card className="card">
            {!loading ? fourthDigit : <Spin size="small" />}
          </Card>
        </Space>
      </div>
      <div className="raffle-button">
        <Button
          onClick={getWinningNumbers}
          type="primary"
          size="small"
          shape="round"
          disabled={loading}
        >
          Generate Prize
        </Button>
      </div>
    </>
  );
};
