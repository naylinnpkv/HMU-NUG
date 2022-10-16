import { Space, Card, Spin } from "antd";
import React, { useState, useEffect } from "react";
import "../statics/_raffle.css";

export const Raffle = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [firstDigit, setFirstDigit] = useState<number | null>(null);
  const [secondDigit, setSecondDigit] = useState<number | null>(null);
  const [thirdDigit, setThirdDigit] = useState<number | null>(null);
  const [fourthDigit, setFourthDigit] = useState<number | null>(null);
  useEffect(() => {
    let digit4 = setTimeout(() => {
      setFourthDigit(Math.floor(Math.random() * 9));
    }, 3000);
    let digit3 = setTimeout(() => {
      setThirdDigit(Math.floor(Math.random() * 9));
    }, 4500);
    let digit2 = setTimeout(() => {
      setSecondDigit(Math.floor(Math.random() * 9));
    }, 6000);
    let digit1 = setTimeout(() => {
      setFirstDigit(Math.floor(Math.random() * 9));
    }, 7500);

    return () => {
      clearTimeout(digit4);
      clearTimeout(digit3);
      clearTimeout(digit2);
      clearTimeout(digit1);
    };
  }, []);

  return (
    <div className="raffle-wrapper">
      <Space size="large" align="center" direction="horizontal">
        <Card className="card">
          {firstDigit ? firstDigit : <Spin size="small" />}
        </Card>
        <Card className="card">
          {secondDigit ? secondDigit : <Spin size="small" />}
        </Card>
        <Card className="card">
          {thirdDigit ? thirdDigit : <Spin size="small" />}
        </Card>
        <Card className="card">
          {fourthDigit ? fourthDigit : <Spin size="small" />}
        </Card>
      </Space>
    </div>
  );
};
