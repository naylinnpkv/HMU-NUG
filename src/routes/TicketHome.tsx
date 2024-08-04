import { useAuth } from "../context/AuthContext";
import { Ticket } from "../views/TicketForm";
import { useLocation } from "react-router-dom";
import App from "../App";

export const TicketHome: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const ticketType: any = location.state ? location.state : "";
  if (!currentUser) {
    return <App />;
  }
  return <Ticket ticketType={ticketType} />;
};
