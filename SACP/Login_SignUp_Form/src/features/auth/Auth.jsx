import { useState } from "react";
import Login from "./components/loginComponents/Login";
import Register from "./components/registerComponents/Register"; 
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