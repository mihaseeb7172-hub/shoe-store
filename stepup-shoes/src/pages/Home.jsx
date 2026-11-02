import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { products } = useStore()
  return (
    <>
      <section className="rounded-3xl bg-ink px-8 py-14 text-white">
        <h1 className="max-w-xl text-5xl font-extrabold leading-tight">Find the pair that keeps up with you.</h1>
        <p className="mt-4 max-w-md text-slate-300">Sneakers, running shoes, formals, boots and sandals in sizes 38 to 46.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-signal px-6 py-3 font-semibold hover:bg-white hover:text-ink">Shop all shoes</Link>
      </section>
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link key={c} to={`/shop?cat=${c}`} className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold hover:border-signal hover:text-signal">{c}</Link>
        ))}
      </div>
      <h2 className="mb-4 mt-10 text-2xl font-extrabold">Featured</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  )
}
