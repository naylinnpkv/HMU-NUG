import { useState, useEffect } from "react";
import {
  getAllSaleCount10$,
  getAllSaleCount25$,
} from "../services/ticketService";

import { getUserTicketSales } from "../services/userService";
import { Spin } from "antd";
import { IUserSalesData } from "../models";

const AllSale = () => {
  const [sale10$, setSale10$] = useState<number | undefined>(undefined);
  const [sale25$, setSale25$] = useState<number | undefined>(undefined);
  const [userSales, setUserSales] = useState<IUserSalesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSale = async () => {
    const ticketSale10$ = await getAllSaleCount10$();
    const ticketSale25$ = await getAllSaleCount25$();
    const userSalesData = await getUserTicketSales();
    setSale10$(ticketSale10$);
    setSale25$(ticketSale25$);
    setUserSales(userSalesData);
    setLoading(false);
  };

  useEffect(() => {
    getSale();
  }, []);

  if (loading) return <Spin />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ fontWeight: "800", fontSize: "20px" }}>All Ticket Sale</div>
      <div
        style={{
          fontStyle: "italic",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{ color: "green", marginRight: "5px" }}
        >{`10$ Tickets: ${sale10$} tickets sold`}</div>
        <div style={{ fontStyle: "normal", margin: "10px" }}>|</div>
        <div
          style={{ color: "blue" }}
        >{`25$ Tickets: ${sale25$} tickets sold`}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", margin: 10 }}>
        {userSales.map((user) => (
          <div style={{ margin: 10 }}>
            <div
              style={{ fontStyle: "italic", fontWeight: 600, color: "teal" }}
            >
              {user.name}
            </div>
            <div>
              <span style={{ color: "darkblue" }}>10$</span>:{" "}
              <span style={{ color: "red" }}>
                {user.numberOfTicketsSold10$}
              </span>{" "}
              tickets sold
            </div>
            <div>
              {" "}
              <span style={{ color: "darkblue" }}>25$</span>:{" "}
              <span style={{ color: "green" }}>
                {" "}
                {user.numberOfTicketsSold25$}
              </span>{" "}
              tickets sold
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSale;
