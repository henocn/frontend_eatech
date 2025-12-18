import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Mail, User, Phone, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import './RegisterLogin.css'

const Register = () => {
  const { t } = useLanguage()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!fullname) return alert(t('account.fullname') + ' is required')
    if (!email) return alert(t('account.email') + ' is required')
    if (!phone) return alert(t('account.phone') + ' is required')
    if (!password) return alert(t('account.password') + ' is required')
    // TODO: call register API
    console.log('register', { fullname, email, phone, password })
  }

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <h2>{t('account.registerTitle')}</h2>

        <div className="input-box">
          <span className="icon"><User size={18} /></span>
          <input
            type="text"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            aria-label={t('account.fullname')}
          />
          <label>{t('account.fullname')}</label>
        </div>

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
          <span className="icon"><Phone size={18} /></span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label={t('account.phone')}
          />
          <label>{t('account.phone')}</label>
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

        <button type="submit">{t('account.submitRegister')}</button>

        <div className="register-link">
          <p>
            {t('account.switchToLogin')}{' '}
            <Link to="/account">{t('account.loginTitle')}</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register