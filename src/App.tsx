import "antd/dist/antd.css";
import "./App.css";
import { Home } from "./views/Home";
import { useAuth } from "./context/AuthContext";
import mhu_logo from "./statics/mhu_logo.png";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function App() {
  const { currentUser, signInWithGoogle } = useAuth();

  if (!currentUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "15%",
        }}
      >
        <img src={mhu_logo} width={250} />
        <h1
          style={{ fontSize: "25px", fontStyle: "Ubuntu", color: "darkBlue" }}
        >
          Welcome to MHU Raffle Generator! Please sign in to create tickets!
        </h1>
        <div>
          <Button
            icon={<GoogleOutlined />}
            type="primary"
            size="large"
            shape="round"
            onClick={() => signInWithGoogle()}
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="App ticket-button">
      <Home />
    </div>
  );
}

export default App;
