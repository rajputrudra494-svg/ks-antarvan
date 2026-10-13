/* Menu content, transcribed from the two PDFs in assets/menus/.
   Neither PDF prints prices, so none are shown here.
   The printed menu marks dishes as spicy / new / Jain / no onion-garlic with
   symbols that do not survive text extraction, so individual dishes are not
   tagged here: the page says instead that Jain and no onion-garlic
   preparations are made on request. Only markers printed in words on the
   menu itself (e.g. "Hot Stone Bowls (new specials)") are carried over. */

export const food = [
  {
    id: 'soups', name: 'Soups',
    items: [
      { n: 'Tomato Soup', d: 'Sweet and savoury tomato broth, crisp sourdough croutons.' },
      { n: 'Burmese Soup', d: 'Creamy coconut turmeric curry soup, glass noodles and vegetables.' },
      { n: 'Thukpa', d: 'Hot, spicy noodle soup, fresh vegetables, aromatic broth.' },
      { n: 'Truffle Mushroom', d: 'Creamy mushroom broth with cheesy dumplings.' }
    ]
  },
  {
    id: 'salads', name: 'Salads',
    items: [
      { n: 'Tofu Avocado Carpaccio', d: 'Sliced tofu, seasonal fruit and avocado, Asian dressing.' },
      { n: 'Van Zest', d: 'Mixed lettuce, carrot carpaccio, red radish, edamame, cucumber and rice crisps with house carrot dressing.' },
      { n: 'Chard & Citrus Crunch', d: 'Charred corn and onion, avocado, cherry tomato, mixed lettuce, orange and mustard-maple dressing.' },
      { n: 'Som Tum', d: 'Cherry tomato, long beans, raw papaya, shredded carrot, Thai chilli, peanuts and palm sugar dressing.' },
      { n: 'Sauteed Salad', d: 'Paneer, mushroom, broccoli, pineapple, bell pepper, black olives and onion.' }
    ]
  },
  {
    id: 'house-special', name: 'Our House Special',
    items: [
      { n: 'Cheung Fun', d: 'Smooth, silky rice-flour sheets, steamed and stuffed with vegetables.' },
      { n: 'Crispy Crystal Veggie', d: 'Exotic vegetables with house sauce.' },
      { n: 'Crispy Truffle Mushroom', d: 'Mixed wild mushrooms with house sauce.' }
    ]
  },
  {
    id: 'hot-stone', name: 'Hot Stone Bowls', note: 'New specials',
    items: [
      { n: 'Singaporean Laksa', d: 'Rice noodles, bok choy, snow peas, broccoli, chilli bean and coconut milk.', tags: ['new'] },
      { n: 'Sizzling Black Pepper Vegetables', d: 'Peppers, water chestnut, tofu and Yang Chow fried rice.', tags: ['new'] },
      { n: 'Truffle Mushroom Pot', d: 'Tofu, straw, shimeji, shiitake and oyster mushrooms with jasmine rice.', tags: ['new'] }
    ]
  },
  {
    id: 'appetizers-world', name: 'Appetizers', note: 'Lebanese, Indian, Mexican',
    items: [
      { n: 'Hummus Platter', d: 'Smoky spicy hummus, beetroot hummus, classic tahini and tzatziki with lavash crisps, smoked olives, cherry tomatoes, salad and house-baked poee bread.' },
      { n: 'Zaatar Spiced Swirls', d: 'Crispy rolls stuffed with mozzarella and cheddar, dusted with zaatar herbs, hot honey dip and labneh.' },
      { n: 'Dahi Ke Kebab', d: 'Creamy curd kebab wrapped in kataifi.' },
      { n: 'Peri-Peri Paneer Tikka', d: 'Paneer marinated in peri-peri sauce.' },
      { n: 'Mutter Kaju Seekh Kebab', d: 'Mashed green peas and cashew seekh kebab with mixed seeds.' },
      { n: 'Tandoori Bharwa Mushroom', d: 'Button mushrooms stuffed with spices and cheese.' },
      { n: 'House Chaap', d: 'Spicy tandoori chaap served with thecha.' },
      { n: 'Arrabbiata Paneer Tikka', d: 'Paneer in arrabbiata sauce and Indian spices, finished with pesto.' },
      { n: 'Enchiladas', d: 'Mexican tortilla stuffed with beans and chilli tomato sauce, yellow cheddar and mozzarella.' },
      { n: 'House Nachos', d: 'Corn chips, warm beans, cheese, sour cream and salsa.' },
      { n: 'Black Bean & Corn Empanadas', d: 'Crisp empanadas with beans, corn, jalapeno, mozzarella and peri-peri, garlic cream dip.' }
    ]
  },
  {
    id: 'appetizers-asian', name: 'Appetizers', note: 'Asian',
    items: [
      { n: 'House Paneer', d: 'Cottage cheese tossed in Asian house sauce.' },
      { n: 'Forest Truffle Rolls', d: 'Crispy rolls stuffed with wild mushrooms and truffle.' },
      { n: 'Paneer Sambal', d: 'Cottage cheese in sweet and spicy Asian sauce.' },
      { n: 'Spicy Paneer Dumpling', d: 'Crispy cottage cheese balls with spicy sauce.' },
      { n: 'Crispy Wonton', d: 'Stuffed with mixed vegetables and cheese.' },
      { n: 'Edamame', d: 'Salted or spicy.' }
    ]
  },
  {
    id: 'noodles', name: 'Noodles',
    items: [
      { n: 'Peanut Lime Noodles', d: 'Our version of pad thai.' },
      { n: 'House Noodles', d: 'Wok-tossed noodles with assorted vegetables.' },
      { n: 'Teriyaki Temple Noodles', d: 'Spicy soba noodles, seasonal vegetables and tofu in teriyaki sauce.' },
      { n: 'Udon Noodles', d: 'Noodles with assorted vegetables in a smoky, spicy, tangy sauce.' },
      { n: 'Butter Chilli Garlic Noodles', d: 'Tossed in butter, chilli and garlic with crushed peanuts, carrot and red radish.' },
      { n: 'Hofan Noodles', d: 'Wok-tossed rice noodles and fresh cheung fun noodles in sweet and spicy soya sauce.' }
    ]
  },
  {
    id: 'sushi', name: 'Sushi',
    items: [
      { n: 'Ponzu Crunch Roll', d: 'Tempura chives and cream cheese roll with special ponzu soy.' },
      { n: 'Wild Shrooms Roll', d: 'Tempura mushrooms and truffle.' },
      { n: 'Creamy Avocado', d: 'Avocado and cream cheese roll.' },
      { n: 'Chilli Tempura', d: 'Creamy, spicy chilli tempura avocado roll.' }
    ]
  },
  {
    id: 'dimsum', name: 'Dim Sum & Bao',
    items: [
      { n: 'Crystal Dim Sum', d: 'Diced carrot, celery and water chestnut.' },
      { n: 'Cheese Scallion Dim Sum', d: 'Cream cheese and scallion.' },
      { n: 'House Surprise Dim Sum', d: 'Diced vegetables in pomodoro sauce and mozzarella, served with pesto.' },
      { n: 'Butter Garlic Truffle Edamame', d: 'Edamame puree and truffle in garlic butter sauce.' },
      { n: 'Thai Crispy Tofu Bao', d: 'Crispy tofu, shredded carrot, lettuce and cucumber with peanut sauce.' }
    ]
  },
  {
    id: 'mains-asian', name: 'Mains', note: 'Asian',
    items: [
      { n: 'Sambal Curry', d: 'Sweet and sour curry with cottage cheese and vegetables.' },
      { n: 'Chilli Basil Sauce', d: 'Paneer or tofu, stir-fried vegetables in red chilli basil sauce, garlic and soy.' },
      { n: 'Traditional Red Thai Curry', d: 'Vegetables and tofu in a Thai spice-infused coconut curry.' },
      { n: 'Malaysian Panang Curry', d: 'Seasonal vegetables with peanuts in coconut curry.' },
      { n: 'Mountain Chilli', d: 'Cottage cheese and vegetables in chilli sauce.' },
      { n: 'Katsu Curry', d: 'Curry with crispy tofu, snow peas, carrot, onion and asparagus.' }
    ]
  },
  {
    id: 'mains-indian', name: 'Mains', note: 'Indian',
    items: [
      { n: 'Dum Matka Paneer' },
      { n: 'Paneer or Veggie Kadai' },
      { n: 'Tofu or Paneer Tikka Masala' },
      { n: 'Lasooni Paneer' },
      { n: 'Soya Makhani' },
      { n: 'Malai Methi Mutter' },
      { n: 'Mixed Vegetables' },
      { n: 'Nadru Ke Kofte' },
      { n: 'Yellow Dal', d: 'Fry or tadka.' },
      { n: 'House Black Dal', d: 'Our version of dal bukhara.' },
      { n: 'Dal Makhani' }
    ]
  },
  {
    id: 'rice', name: 'Rice',
    items: [
      { n: 'House Biryani', d: 'Your favourite biryani, the Antarvan way.' },
      { n: 'Mexican Rice', d: 'Rice cooked in tomato sauce with Mexican beans, roasted vegetables, guacamole, sour cream and salsa.' },
      { n: 'Truffle Fried Rice', d: 'Fried rice with vegetables, mixed wild mushrooms and edamame.' },
      { n: 'Classic Burnt Garlic Fried Rice', d: 'Jasmine rice tossed in sesame oil and burnt garlic.' },
      { n: 'House Rice', d: 'Steamed or jeera.' },
      { n: 'Jasmine Rice' },
      { n: 'Sticky Rice' }
    ]
  },
  {
    id: 'breads', name: 'Breads',
    items: [
      { n: 'Tandoori Roti', d: 'Plain or ghee.' },
      { n: 'Naan', d: 'Plain, ghee or garlic.' },
      { n: 'Cheese Chilli Naan' },
      { n: 'Truffle Naan', d: 'Cheese naan infused with caramelised onion and truffle oil.' },
      { n: 'Kulcha', d: 'Onion, cheese or aloo.' },
      { n: 'Paratha', d: 'Mirchi, pudina, ajwain, reshmi, chur chur or lachha.' }
    ]
  },
  {
    id: 'kids', name: 'Kids Special',
    items: [
      { n: 'Margherita Pizza', d: 'Crispy thin-crust margherita.' },
      { n: 'Penne Alfredo Pasta', d: 'Creamy, cheesy white sauce pasta.' },
      { n: 'Spaghetti Aglio e Olio', d: 'Tossed in olive oil, garlic and parmesan.' },
      { n: 'Penne Cremato Sauce', d: 'Pasta in a mix of pomodoro and creamy sauce.' },
      { n: 'French Fries' }
    ]
  },
  {
    id: 'desserts', name: 'Desserts',
    items: [
      { n: 'Coco Berry Fusion', d: 'French biscuit, milk and dark chocolate mousse, raspberry, single-origin chocolate sauce.' },
      { n: 'Raspberry Coconut Payasam', d: 'Light coconut sponge and berry layers with house-made coconut payasam, crunchy crumble and pistachio.' },
      { n: 'Mille-Feuille', d: 'Filo pastry layered with vanilla cream, berry compote and pistachio.' },
      { n: 'House Brownie', d: '65% single-origin chocolate brownie with ice cream.' },
      { n: 'House Milk Cake', d: 'Sponge soaked in sweetened milk, seasonal fruit, pistachio butter and house cream.' },
      { n: 'Churros', d: 'Pistachio mascarpone, dark chocolate ganache and caramel sauce.' },
      { n: 'Hazelnut Chocolate Hummus', d: 'Seasonal berry, choco crunch and sesame waffle crisp.' }
    ]
  }
];

export const drinks = [
  {
    id: 'coffee-hot', name: 'Coffee', note: 'Hot',
    items: [
      { n: 'Espresso' }, { n: 'Americano' }, { n: 'Macchiato' }, { n: 'Cortado' },
      { n: 'Cappuccino' }, { n: 'Latte' }, { n: 'Flat White' }, { n: 'Mocha' }
    ]
  },
  {
    id: 'coffee-iced', name: 'Coffee', note: 'Iced',
    items: [
      { n: 'Iced Espresso' },
      { n: 'Iced Americano' },
      { n: 'Espresso Tonic' },
      { n: 'Cold Brew', d: 'With tonic or orange juice.' },
      { n: 'Barrel-Aged Cold Brew' },
      { n: 'Barrel-Aged Cold Brew Tonic' },
      { n: 'Iced Latte', d: 'Regular, oat or almond milk.' },
      { n: 'Iced Mocha Latte' }
    ]
  },
  {
    id: 'matcha', name: 'Matcha',
    items: [
      { n: 'Hot Matcha Latte', d: 'Ceremonial-grade matcha with frothy milk.' },
      { n: 'Iced Matcha Latte', d: 'Ceremonial-grade matcha with almond milk.' }
    ]
  },
  {
    id: 'classics', name: 'Our Classics',
    items: [
      { n: 'Hot Chocolate' },
      { n: 'Iced Chocolate' },
      { n: 'Vietnamese Iced Coffee' },
      { n: 'Vietnamese Coconut Iced Coffee' },
      { n: 'Classic Cold Coffee' }
    ]
  },
  {
    id: 'teas', name: 'Teas',
    items: [
      { n: 'Masala Chai' },
      { n: 'Lemon Iced Tea', d: 'Home-brewed classic.' },
      { n: 'Peach Iced Tea', d: 'Home-brewed classic.' },
      { n: 'Thai Iced Tea', d: 'Home-brewed tea with condensed milk.' },
      { n: 'Jasmine Soda Iced Tea', d: 'Home-brewed jasmine tea and lime with a twist of soda.' }
    ]
  },
  {
    id: 'shakes', name: 'Shakes',
    items: [{ n: 'Brownie Shake' }, { n: 'Caramel Shake' }]
  },
  {
    id: 'mocktails', name: 'Mocktails',
    items: [
      { n: 'Sour Harmony', d: 'Fresh green apple juice, ginger, lime juice and coconut milk.' },
      { n: 'Summer Melon', d: 'Fresh watermelon juice and basil, topped with soda.' },
      { n: 'Citrus Honeydew', d: 'Muskmelon juice, passion fruit, lime juice and kaffir lime leaf, topped with soda.' },
      { n: 'Ruby Spice', d: 'Beetroot cordial, lime, star anise and cinnamon, topped with tonic water.' },
      { n: 'Orange Colada', d: 'Orange juice and coconut cream.' },
      { n: 'Thai Angel', d: 'Thai ginger, kaffir lime leaf and lime juice, topped with soda.' },
      { n: 'Aerated Drinks' }
    ]
  }
];
