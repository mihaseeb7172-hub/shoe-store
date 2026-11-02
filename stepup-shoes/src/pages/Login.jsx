import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Login() {
  const { login } = useStore()
  const nav = useNavigate()
  const from = useLocation().state?.from || '/shop'
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    const err = await login(form)
    err ? setError(err) : nav(from, { replace: true })
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      <h1 className="text-2xl font-extrabold">Welcome back</h1>
      <p className="text-sm text-slate-500">Log in to place orders and track them.</p>
      <input required type="email" className="input" placeholder="Email" autoComplete="email" value={form.email} onChange={set('email')} />
      <input required type="password" className="input" placeholder="Password" autoComplete="current-password" value={form.password} onChange={set('password')} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button className="btn w-full">Log in</button>
      <p className="text-center text-sm text-slate-500">No account? <Link className="text-signal" to="/signup" state={{ from }}>Sign up</Link></p>
    </form>
  )
}
