import { useState } from "react";
import Login from "./LoginPages/Login";
import Register from "./RegisterPages/Register"; // We will create this below

const Auth = () => {
  // view can be either 'login' or 'register'
  const [view, setView] = useState("login");

  return (
    <div className="min-h-screen w-full bg-Page-background">
      {view === "login" ? (
        <Login onNavigate={() => setView("register")} />
      ) : (
        <Register onNavigate={() => setView("login")} />
      )}
    </div>
  );
};

export default Auth;