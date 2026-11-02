import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { products } = useStore()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'All'
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('none')

  let list = products.filter((p) => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setParams(c === 'All' ? {} : { cat: c })}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${cat === c ? 'bg-ink text-white' : 'border border-slate-300 bg-white'}`}>{c}</button>
        ))}
        <input className="input !w-48" placeholder="Search shoes" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input !w-44" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sort by</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      {list.length === 0 ? <p className="text-slate-500">No shoes match. Try another category or search.</p> : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </>
  )
}
