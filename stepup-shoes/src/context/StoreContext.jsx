import { createContext, useContext, useEffect, useState } from 'react'
import { initialProducts, SIZES } from '../data/products'

const Ctx = createContext()
export const useStore = () => useContext(Ctx)
export const money = (n) => 'Rs. ' + Number(n).toLocaleString()
export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
export const statusStyle = {
  Pending: 'bg-amber-100 text-amber-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-violet-100 text-violet-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-700',
}

// demo-only password hashing (no backend). Falls back to plain text if SubtleCrypto is unavailable.
async function hash(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
  } catch { return text }
}

// state saved in localStorage so it survives a page refresh
function useLocal(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init } catch { return init }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(v)) }, [key, v])
  return [v, setV]
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useLocal('stepup_products', initialProducts)
  const [cart, setCart] = useLocal('stepup_cart', [])
  const [orders, setOrders] = useLocal('stepup_orders', [])
  const [users, setUsers] = useLocal('stepup_users', [])
  const [userId, setUserId] = useLocal('stepup_session', null)
  const user = users.find((u) => u.id === userId) || null

  const signup = async ({ name, email, password }) => {
    const e = email.trim().toLowerCase()
    if (users.some((u) => u.email === e)) return 'An account with this email already exists.'
    const u = { id: Date.now(), name: name.trim(), email: e, password: await hash(password) }
    setUsers((x) => [...x, u]); setUserId(u.id)
    return null
  }
  const login = async ({ email, password }) => {
    const u = users.find((x) => x.email === email.trim().toLowerCase())
    if (!u || u.password !== (await hash(password))) return 'Incorrect email or password.'
    setUserId(u.id)
    return null
  }
  const logout = () => setUserId(null)

  const addToCart = (p, size, color) => setCart((c) => {
    const key = `${p.id}-${size}-${color}`
    return c.find((i) => i.key === key)
      ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      : [...c, { key, id: p.id, name: p.name, price: p.price, emoji: p.emoji, bg: p.bg, image: p.image, size, color, qty: 1 }]
  })
  const changeQty = (key, d) => setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))
  const removeItem = (key) => setCart((c) => c.filter((i) => i.key !== key))
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const placeOrder = (info) => {
    setOrders((o) => [{ id: Date.now(), ...info, userId, email: user?.email, status: 'Pending', items: cart, total, date: new Date().toLocaleString() }, ...o])
    setCart([])
  }
  const setOrderStatus = (id, status) => setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)))
  const saveProduct = (p) => setProducts((ps) => p.id
    ? ps.map((x) => (x.id === p.id ? p : x))
    : [...ps, { ...p, id: Date.now(), sizes: SIZES, colors: ['Black', 'White'] }])
  const deleteProduct = (id) => setProducts((ps) => ps.filter((p) => p.id !== id))

  return (
    <Ctx.Provider value={{ products, cart, orders, addToCart, changeQty, removeItem, total, count, placeOrder, setOrderStatus, user, users, signup, login, logout, saveProduct, deleteProduct }}>
      {children}
    </Ctx.Provider>
  )
}
