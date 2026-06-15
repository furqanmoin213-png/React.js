import { useState } from "react";
import Login from "./LoginComponents/Login";
import Register from "./RegisterComponents/Register"; // We will create this below

const Auth = () => {
  // view can be either 'login' or 'register'
  const [view, setView] = useState("login");

  return (
    <div className="min-h-screen min-w-full bg-Page-background flex flex-col ">
      {view === "login" ? (
        <Login onNavigate={() => setView("register")} />
      ) : (
        <Register onNavigate={() => setView("login")} />
      )}
    </div>
  );
};

export default Auth;