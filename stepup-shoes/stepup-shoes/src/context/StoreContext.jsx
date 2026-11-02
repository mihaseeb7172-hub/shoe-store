import { createContext, useContext, useEffect, useState } from 'react'
import { initialProducts, SIZES } from '../data/products'

const Ctx = createContext()
export const useStore = () => useContext(Ctx)
export const money = (n) => 'Rs. ' + Number(n).toLocaleString()

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
    setOrders((o) => [{ id: Date.now(), ...info, items: cart, total, date: new Date().toLocaleString() }, ...o])
    setCart([])
  }
  const saveProduct = (p) => setProducts((ps) => p.id
    ? ps.map((x) => (x.id === p.id ? p : x))
    : [...ps, { ...p, id: Date.now(), sizes: SIZES, colors: ['Black', 'White'] }])
  const deleteProduct = (id) => setProducts((ps) => ps.filter((p) => p.id !== id))

  return (
    <Ctx.Provider value={{ products, cart, orders, addToCart, changeQty, removeItem, total, count, placeOrder, saveProduct, deleteProduct }}>
      {children}
    </Ctx.Provider>
  )
}
