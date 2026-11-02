// Shows the product photo. Falls back to the emoji when no image is set.
// "image" can be a path inside /public (e.g. images/shoe-1.svg), a full URL, or a data URL.
export default function ProductImage({ p, className = '', emojiClass = 'text-7xl' }) {
  const src = p.image ? (/^(https?:|data:)/.test(p.image) ? p.image : import.meta.env.BASE_URL + p.image) : null
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`} style={{ background: p.bg }}>
      {src ? <img src={src} alt={p.name} className="h-full w-full object-contain" /> : <span className={emojiClass}>{p.emoji}</span>}
    </div>
  )
}
