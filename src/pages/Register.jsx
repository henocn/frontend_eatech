import React, { useState } from "react";
import { Mail, User, Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import "./RegisterLogin.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname) return alert("Nom complet is required");
    if (!email) return alert("Email is required");
    if (!phone) return alert("Téléphone is required");
    if (!password) return alert("Mot de passe is required");
    // TODO: call register API
    console.log("register", { fullname, email, phone, password });
  };

  return (
    <div className="section">
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <h2  className="lg-h2">Inscription</h2>

          <div className="input-box">
            <span className="icon">
              <User size={18} />
            </span>
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              aria-label={"Nom complet"}
            />
            <label>Nom complet</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <Mail size={18} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label={"Email"}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <Phone size={18} />
            </span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label={"Téléphone"}
            />
            <label>Téléphone</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <Lock size={18} />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label={"Mot de passe"}
            />
            <label>Mot de passe</label>
          </div>

          <button className="lg-button" type="submit">S'inscrire</button>

          <div className="register-link">
            <p>
              Déjà un compte ? <Link to="/auth/login">Connexion</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
