import { Space, Card, Spin, Button } from "antd";
import React, { useState, useEffect } from "react";
import "../statics/_raffle.css";
import Deepawali from "../statics/deepawali.png";
import _ from "lodash";
import axios from "axios";

export const Raffle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [winningNums, setWinningNums] = useState<Array<{ prizes: number }>>([]);
  const [currentWinningNum, setCurrentWinningNum] = useState<string | null>(
    null
  );
  const prizes = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

  const { VITE_PUBLIC_RAFFLE_WINNERS_URL } = import.meta.env;

  const generateWinningNumbers = async () => {
    setLoading(true);
    const first = _.toString(Math.floor(Math.random() * 9));
    const second = _.toString(Math.floor(Math.random() * 9));
    const third = _.toString(Math.floor(Math.random() * 9));
    const fourth = _.toString(Math.floor(Math.random() * 9));

    setCurrentWinningNum((first + second + third + fourth).padStart(4, "0"));

    setTimeout(() => setLoading(false), 4000);
  };
  // testing
  const postWinningNum = async () => {
    const { data } = await axios.post<{ prizes: number }[]>(
      VITE_PUBLIC_RAFFLE_WINNERS_URL,
      {
        prizes: currentWinningNum,
      }
    );
    setWinningNums((prev) => [...prev, ...data]);
  };
  const getWinningNums = async () => {
    const { data } = await axios.get<Array<{ prizes: number }>>(
      VITE_PUBLIC_RAFFLE_WINNERS_URL
    );

    setWinningNums(data);
  };

  useEffect(() => {
    getWinningNums();
    if (currentWinningNum !== null && currentWinningNum.length > 0 && loading) {
      postWinningNum();
    }
  }, [currentWinningNum]);

  return (
    <>
      <img className="raffle-bg" src={Deepawali} />

      <div className="raffle-wrapper">
        <div className="raffle-number">
          <Space size="large" align="center" direction="horizontal">
            <Card className="card">
              {!loading ? (
                _.toString(currentWinningNum)[0]
              ) : (
                <Spin size="small" />
              )}
            </Card>
            <Card className="card">
              {!loading ? (
                _.toString(currentWinningNum)[1]
              ) : (
                <Spin size="small" />
              )}
            </Card>
            <Card className="card">
              {!loading ? (
                _.toString(currentWinningNum)[2]
              ) : (
                <Spin size="small" />
              )}
            </Card>
            <Card className="card">
              {!loading ? (
                _.toString(currentWinningNum)[3]
              ) : (
                <Spin size="small" />
              )}
            </Card>
          </Space>
        </div>
      </div>
      <div className="prize-list-wrapper">
        {!loading &&
          _.map(winningNums, (num, index) => (
            <p key={_.toString(num.prizes)}>
              <b>{`${prizes[index]} prize- ${_.toString(num.prizes).padStart(
                4,
                "0"
              )}`}</b>
            </p>
          ))}
      </div>
      <div className="raffle-button">
        <Button
          onClick={generateWinningNumbers}
          type="primary"
          shape="round"
          disabled={loading || winningNums.length === 6}
        >
          Generate Prize
        </Button>
      </div>
    </>
  );
};
