import { Link } from 'react-router-dom'
import { money, useStore, statusStyle } from '../context/StoreContext'

export default function MyOrders() {
  const { user, orders } = useStore()
  if (!user) return <p>Please <Link className="text-signal" to="/login" state={{ from: '/orders' }}>log in</Link> to see your orders.</p>
  const mine = orders.filter((o) => o.userId === user.id)
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-extrabold">My orders</h1>
      {mine.length === 0 ? <p className="text-slate-500">No orders yet. <Link className="text-signal" to="/shop">Browse shoes</Link></p> : mine.map((o) => (
        <div key={o.id} className="rounded-2xl bg-white p-4 text-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <p className="font-bold">{money(o.total)} <span className="font-normal text-slate-500">({o.date})</span></p>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[o.status || 'Pending']}`}>{o.status || 'Pending'}</span>
          </div>
          <p>{o.items.map((i) => `${i.name} (${i.size}, ${i.color}) x${i.qty}`).join(', ')}</p>
        </div>
      ))}
    </div>
  )
}
