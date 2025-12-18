import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Account.css'

const Account = () => {
  const { t } = useLanguage()
  const [mode, setMode] = useState('login') // 'login' | 'register'

  const [form, setForm] = useState({ email: '', password: '', fullname: '', phone: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.email) return setError('Email required')
    if (mode === 'login') {
      if (!form.password) return setError('Password required')
      // placeholder: call login API
      console.log('Login:', { email: form.email, password: form.password })
      return
    }

    // register mode validation
    if (!form.fullname) return setError('Full name required')
    if (!form.phone) return setError('Phone required')
    // placeholder: call register API
    console.log('Register:', { email: form.email, fullname: form.fullname, phone: form.phone })
  }

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>{mode === 'login' ? t('account.loginTitle') : t('account.registerTitle')}</h2>

        <form onSubmit={handleSubmit} className="account-form">
          <label>
            <span>{t('account.email')}</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>

          {mode === 'login' ? (
            <label>
              <span>{t('account.password')}</span>
              <input name="password" type="password" value={form.password} onChange={handleChange} />
            </label>
          ) : (
            <>
              <label>
                <span>{t('account.fullname')}</span>
                <input name="fullname" type="text" value={form.fullname} onChange={handleChange} />
              </label>
              <label>
                <span>{t('account.phone')}</span>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
              </label>
            </>
          )}

          {error && <div className="account-error">{error}</div>}

          <button type="submit" className="account-submit">
            {mode === 'login' ? t('account.submitLogin') : t('account.submitRegister')}
          </button>
        </form>

        <button className="account-switch" onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}>
          {mode === 'login' ? t('account.switchToRegister') : t('account.switchToLogin')}
        </button>
      </div>
    </div>
  )
}

export default Account