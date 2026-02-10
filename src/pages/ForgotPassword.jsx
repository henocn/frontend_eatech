import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Send, ChevronRight, ChevronLeft, CheckCircle, Hash } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/axiosInstance";
import "./RegisterLogin.css";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    new_password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmailStep = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "L'adresse email est requise";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Adresse email invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetStep = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Le code est requis";
    } else if (formData.code.trim().length !== 6 || !/^\d+$/.test(formData.code)) {
      newErrors.code = "Le code doit contenir exactement 6 chiffres";
    }

    if (!formData.new_password) {
      newErrors.new_password = "Le nouveau mot de passe est requis";
    } else if (formData.new_password.length < 4) {
      newErrors.new_password = "Le mot de passe doit contenir au moins 4 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!validateEmailStep()) return;

    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password/", {
        email: email.trim()
      });

      // Si succès, passer à l'étape 2
      setCurrentStep(2);
      setErrors({});
      setFormData({ code: "", new_password: "" });

    } catch (error) {
      console.error("Forgot password error:", error);
      setErrors({ 
        email: error.response?.data?.detail || "Cet email n'existe pas ou une erreur s'est produite"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateResetStep()) return;

    setIsLoading(true);

    try {
      await api.post("/auth/reset-password/", {
        email: email.trim(),
        code: formData.code.trim(),
        new_password: formData.new_password
      });

      setSuccessMessage("Votre mot de passe a été réinitialisé avec succès !");
      
      // Rediriger vers login après 3 secondes
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Mot de passe réinitialisé. Vous pouvez maintenant vous connecter." }
        });
      }, 3000);

    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({ 
        general: error.response?.data?.detail || "Erreur lors de la réinitialisation du mot de passe"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setErrors({});
    setFormData({ code: "", new_password: "" });
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <img src="/images/logo2.png" alt="Golden Studio" className="auth-logo" />
            <p className="step-indicator">Étape {currentStep} sur 2</p>
          </div>

          {successMessage ? (
            <div className="auth-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center' }}>
              <CheckCircle size={64} style={{ color: '#10b981', marginBottom: '1rem' }} />
              <h2 className="success-title">Succès !</h2>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                {successMessage}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                Redirection vers la connexion...
              </p>
            </div>
          ) : (
            <form onSubmit={currentStep === 1 ? handleSendCode : handleResetPassword} className="auth-form">
              {errors.general && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              {/* ÉTAPE 1: Email */}
              {currentStep === 1 && (
                <>
                  <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <div className="input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="votre.email@exemple.com"
                        className={errors.email ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#6b7280', textAlign: 'center', marginBottom: '1.5rem' }}>
                    Entrez l'adresse email associée à votre compte. Nous vous enverrons un code à 6 chiffres pour réinitialiser votre mot de passe.
                  </p>

                  <button
                    type="submit"
                    className="auth-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
                        <span>Envoi...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Envoyer le code</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {/* ÉTAPE 2: Code et nouveau mot de passe */}
              {currentStep === 2 && (
                <>
                  <div className="form-group">
                    <label htmlFor="code">Code de réinitialisation</label>
                    <div className="input-wrapper">
                      <Hash size={18} className="input-icon" />
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        placeholder="000000"
                        maxLength="6"
                        className={errors.code ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.code && <span className="field-error">{errors.code}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="new_password">Nouveau mot de passe</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="new_password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleInputChange}
                        placeholder="Au moins 4 caractères"
                        className={errors.new_password ? "error" : ""}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.new_password && <span className="field-error">{errors.new_password}</span>}
                  </div>

                  <div className="step-buttons">
                    <button
                      type="button"
                      className="auth-button secondary"
                      onClick={handlePreviousStep}
                    >
                      <ChevronLeft size={18} />
                      <span>Retour</span>
                    </button>
                    <button
                      type="submit"
                      className="auth-button primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="loading-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
                          <span>Réinitialisation...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={18} />
                          <span>Réinitialiser</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          <div className="auth-footer">
            <p>
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link to="/auth/login" className="auth-link">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
