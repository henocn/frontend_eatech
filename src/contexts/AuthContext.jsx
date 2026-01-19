import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(0);

  // Vérifier l'authentification au démarrage
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');

      if (accessToken && user) {
        try {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
          setIsAuthenticated(true);
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

          // Récupérer le panier après vérification de l'authentification
          setTimeout(() => fetchCartItems(parsedUser), 100);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Intercepter les erreurs 401 pour déconnexion automatique
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/token/', {
        username: email,
        password: password
      });
      

      const { access, refresh, user } = response;

      // Stocker les tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      // Configurer axios avec le token
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // Mettre à jour l'état
      setUser(user);
      setIsAuthenticated(true);

      // Récupérer le panier
      setTimeout(() => fetchCartItems(user), 100);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Erreur de connexion'
      };
    }
  };

  const logout = () => {
    // Supprimer les données stockées
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    // Supprimer l'Authorization header
    delete api.defaults.headers.common['Authorization'];

    // Reset l'état
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        logout();
        return false;
      }

      const response = await api.post('/auth/token/refresh/', {
        refresh: refreshToken
      });

      const { access } = response.data;

      // Mettre à jour le token d'accès
      localStorage.setItem('access_token', access);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  };

  const fetchCartItems = async (userParam = null) => {
    const currentUser = userParam || user;

    if (!currentUser) {
      return;
    }

    try {
      const response = await api.get(`/carts/?user=${currentUser.id}`);

      if (response && response.length > 0) {
        const cartData = response[0];
        const itemCount = cartData.session_count ? cartData.session_count : 0;
        setCartItems(itemCount);
      } else {
        setCartItems(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems(0);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    cartItems,
    login,
    logout,
    refreshToken,
    fetchCartItems
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};