import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Signup() {
  const { signup } = useStore()
  const nav = useNavigate()
  const from = useLocation().state?.from || '/shop'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    const err = await signup(form)
    err ? setError(err) : nav(from, { replace: true })
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      <h1 className="text-2xl font-extrabold">Create your account</h1>
      <input required className="input" placeholder="Full name" autoComplete="name" value={form.name} onChange={set('name')} />
      <input required type="email" className="input" placeholder="Email" autoComplete="email" value={form.email} onChange={set('email')} />
      <input required type="password" className="input" placeholder="Password (min 6 characters)" autoComplete="new-password" value={form.password} onChange={set('password')} />
      <input required type="password" className="input" placeholder="Confirm password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button className="btn w-full">Sign up</button>
      <p className="text-center text-sm text-slate-500">Already registered? <Link className="text-signal" to="/login" state={{ from }}>Log in</Link></p>
    </form>
  )
}
