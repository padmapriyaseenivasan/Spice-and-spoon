// All dishes served by the restaurant.
// "image" points to a food photo. If a photo ever fails to load,
// FoodCard.jsx automatically shows the emoji fallback instead.

export const categories = [
  'All',
  'Starters',
  'Main Course',
  'Biriyani',
  'Desserts',
  'Beverages'
]

export const menuItems = [
  {
    id: 1,
    name: 'Chicken Biriyani',
    category: 'Biriyani',
    price: 180,
    description: 'Long grain basmati rice dum-cooked with spiced chicken.',
    available: true,
    emoji: '🍛',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: 160,
    description: 'Soft paneer cubes in a creamy tomato and butter gravy.',
    available: true,
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 3,
    name: 'Chicken 65',
    category: 'Starters',
    price: 140,
    description: 'Crispy fried chicken tossed with curry leaves and chilli.',
    available: true,
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 4,
    name: 'Masala Dosa',
    category: 'Main Course',
    price: 80,
    description: 'Crisp rice crepe filled with spiced potato masala.',
    available: true,
    emoji: '🥞',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 5,
    name: 'Veg Fried Rice',
    category: 'Main Course',
    price: 120,
    description: 'Wok tossed rice with garden vegetables and soy.',
    available: true,
    emoji: '🍚',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 6,
    name: 'Chicken Fried Rice',
    category: 'Main Course',
    price: 150,
    description: 'Fried rice with shredded chicken, egg and spring onion.',
    available: true,
    emoji: '🍜',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 7,
    name: 'French Fries',
    category: 'Starters',
    price: 90,
    description: 'Golden potato fries with peri peri seasoning.',
    available: true,
    emoji: '🍟',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 8,
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 60,
    description: 'Warm milk dumplings soaked in cardamom sugar syrup.',
    available: true,
    emoji: '🍡',
    image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 9,
    name: 'Ice Cream',
    category: 'Desserts',
    price: 80,
    description: 'Two scoops of vanilla, chocolate or butterscotch.',
    available: true,
    emoji: '🍨',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 10,
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 50,
    description: 'Chilled soda with lime, served sweet or salted.',
    available: true,
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 11,
    name: 'Fresh Juice',
    category: 'Beverages',
    price: 70,
    description: 'Seasonal fruit juice pressed to order, no sugar added.',
    available: true,
    emoji: '🧃',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 12,
    name: 'Coffee',
    category: 'Beverages',
    price: 40,
    description: 'South Indian filter coffee served in a steel tumbler.',
    available: true,
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=70'
  }
]
