import React from "react";
import { Mail, Lock } from "lucide-react";
import "./RegisterLogin.css";

const Login = () => {
  return (
    <div className="section">
      <div className="login-box">
        <form>
          <h2 className="lg-h2">Login</h2>

          <div className="input-box">
            <span className="icon">
              <Mail size={18} />
            </span>
            <input type="email" required />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <Lock size={18} />
            </span>
            <input type="password" required />
            <label>Password</label>
          </div>

          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>

          <button className="lg-button" type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
