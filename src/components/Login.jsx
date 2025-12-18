import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Mail, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import './RegisterLogin.css'

const Login = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // basic validation
    if (!email) return alert(t('account.email') + ' is required')
    if (!password) return alert(t('account.password') + ' is required')
    // TODO: call login API
    console.log('login', { email, password })
  }

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <h2>{t('account.loginTitle')}</h2>

        <div className="input-box">
          <span className="icon"><Mail size={18} /></span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label={t('account.email')}
          />
          <label>{t('account.email')}</label>
        </div>

        <div className="input-box">
          <span className="icon"><Lock size={18} /></span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label={t('account.password')}
          />
          <label>{t('account.password')}</label>
        </div>

        <div className="remember-forget">
          <label>
            <input type="checkbox" /> {t('account.remember')}
          </label>
          <a href="#">{t('account.forget')}</a>
        </div>

        <button type="submit">{t('account.submitLogin')}</button>

        <div className="register-link">
          <p>
            {t('account.switchToRegister')}{' '}
            <Link to="/account">{t('account.registerLink')}</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login