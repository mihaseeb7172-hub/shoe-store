export const CATEGORIES = ['Sneakers', 'Running', 'Formal', 'Boots', 'Sandals']
export const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46]
const mk = (id, name, brand, category, price, emoji, bg, colors) => ({ id, name, brand, category, price, emoji, bg, colors, sizes: SIZES, image: `images/shoe-${id}.svg` })
export const initialProducts = [
  mk(1, 'Street Low', 'Nova', 'Sneakers', 8500, '👟', '#dbe4ff', ['White', 'Black', 'Grey']),
  mk(2, 'Court Classic', 'Urban', 'Sneakers', 9900, '👟', '#ffe3e0', ['White', 'Red']),
  mk(3, 'Cloud Runner', 'Stride', 'Running', 12500, '🏃', '#d8f5e6', ['Blue', 'Black', 'Lime']),
  mk(4, 'Sprint Pro', 'Stride', 'Running', 14900, '🏃', '#fff2c9', ['Orange', 'Black']),
  mk(5, 'Trail Lite', 'Nova', 'Running', 11200, '🥾', '#e9e1d6', ['Olive', 'Grey']),
  mk(6, 'Oxford Prime', 'Heritage', 'Formal', 15500, '👞', '#e8e3f7', ['Black', 'Brown']),
  mk(7, 'Derby Classic', 'Heritage', 'Formal', 13800, '👞', '#f0e4d7', ['Brown', 'Tan']),
  mk(8, 'Loafer Slip', 'Heritage', 'Formal', 10900, '👞', '#dde9f3', ['Black', 'Navy']),
  mk(9, 'Ranger Boot', 'Urban', 'Boots', 17900, '🥾', '#e5dccd', ['Brown', 'Black']),
  mk(10, 'Chelsea Boot', 'Urban', 'Boots', 16400, '🥾', '#ddd8e6', ['Black', 'Tan']),
  mk(11, 'Peshawari Chappal', 'Nova', 'Sandals', 4500, '🩴', '#f6e0d2', ['Brown', 'Black']),
  mk(12, 'Summer Slide', 'Stride', 'Sandals', 3200, '🩴', '#d6f0f5', ['Navy', 'White']),
]
