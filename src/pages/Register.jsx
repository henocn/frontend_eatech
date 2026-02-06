import React, { useState, useEffect } from "react";
import { Mail, User, Phone, Lock, Eye, EyeOff, UserPlus, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/axiosInstance";
import "./RegisterLogin.css";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    acceptPolicy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      // Si l'email est modifié, mettre username à la même valeur
      if (name === 'email') {
        updated.username = value;
      }
      return updated;
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "L'adresse email est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 4) {
      newErrors.password = "Le mot de passe doit contenir au moins 4 caractères";
    }

    if (!formData.password2) {
      newErrors.password2 = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Le prénom est requis";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "Le prénom doit contenir au moins 2 caractères";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Le nom est requis";
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "L'adresse doit contenir au moins 5 caractères";
    }

    if (!formData.acceptPolicy) {
      newErrors.acceptPolicy = "Vous devez accepter la politique de confidentialité";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({});
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      const submitData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password2: formData.password2,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone: formData.phone.replace(/\s/g, ''),
        address: formData.address.trim()
      };

      const response = await api.post("/auth/register/client/", submitData);

      // Rediriger vers la page de connexion
      navigate("/login", {
        state: {
          message: "Inscription réussie ! Vous pouvez maintenant vous connecter."
        }
      });

    } catch (error) {
      console.error("Register error:", error);
      setErrors({ 
        general: error.data?.detail || error.message || "Erreur lors de l'inscription. Veuillez réessayer." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <img src="/images/logo2.png" alt="Golden Studio" className="auth-logo" />
              <p className="step-indicator">Étape {currentStep} sur 2</p>
            </div>

            <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit} className="auth-form">
              {errors.general && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              {/* ÉTAPE 1 */}
              {currentStep === 1 && (
                <>
                  <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <div className="input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre.email@exemple.com"
                        className={errors.email ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Au moins 8 caractères"
                        className={errors.password ? "error" : ""}
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
                    {errors.password && <span className="field-error">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password2">Confirmer le mot de passe</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleInputChange}
                        placeholder="Répétez votre mot de passe"
                        className={errors.password2 ? "error" : ""}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password2 && <span className="field-error">{errors.password2}</span>}
                  </div>

                  <button
                    type="submit"
                    className="auth-button"
                  >
                    <span>Suivant</span>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* ÉTAPE 2 */}
              {currentStep === 2 && (
                <>
                  <div className="form-group">
                    <label htmlFor="first_name">Prénom</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="Votre prénom"
                        className={errors.first_name ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.first_name && <span className="field-error">{errors.first_name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Nom</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Votre nom"
                        className={errors.last_name ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.last_name && <span className="field-error">{errors.last_name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Numéro de téléphone</label>
                    <div className="input-wrapper">
                      <Phone size={18} className="input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+228 XX XX XX XX"
                        className={errors.phone ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <div className="input-wrapper">
                      <MapPin size={18} className="input-icon" />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Votre adresse complète"
                        className={errors.address ? "error" : ""}
                        required
                      />
                    </div>
                    {errors.address && <span className="field-error">{errors.address}</span>}
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="acceptPolicy"
                        checked={formData.acceptPolicy}
                        onChange={handleInputChange}
                      />
                      <span className="custom-checkbox"></span>
                      <span className="checkbox-text">J'accepte la <Link to="/privacy" target="_blank">politique de confidentialité</Link></span>
                    </label>
                    {errors.acceptPolicy && <span className="field-error">{errors.acceptPolicy}</span>}
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
                          <div className="loading-spinner"></div>
                          <span>Inscription...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={18} />
                          <span>S'inscrire</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="auth-footer">
              <p>
                Déjà un compte ?{" "}
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

export default Register;
