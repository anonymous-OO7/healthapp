export const recipes = [
  {
    id: 'recipe_01',
    slug: 'breakfast-platter',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.2,
      reviews: 85,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 25,
      totalTimeString: '35 min',
      calories: 550,
      servings: 1,
      isVeg: false,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['morning', 'protein', 'meat'],
      thumbnail:
        'https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Full-English-Breakfast.jpg',
      images: [
        'https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Full-English-Breakfast.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: ['VzEvPVL16uc', 'td4lg9O9JZM', '8wfZdhP-AEI'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Breakfast Platter',
        description: 'Providing nourishment and energy to start the day.',
        cuisine: 'Continental',
        ingredients: [
          { item: 'Eggs', amount: '2', unit: 'pcs', note: '' },
          { item: 'Bacon', amount: '2', unit: 'strips', note: '' },
          { item: 'Toast', amount: '2', unit: 'slices', note: '' },
          { item: 'Baked beans', amount: '100', unit: 'g', note: '' },
        ],
        steps: [
          { step: 1, text: 'Fry eggs and bacon.' },
          { step: 2, text: 'Toast bread with butter.' },
          { step: 3, text: 'Heat baked beans and serve.' },
        ],
      },
      hi: {
        title: 'नाश्ता प्लैटर',
        description: 'दिन की शुरुआत करने के लिए पोषण और ऊर्जा प्रदान करता है।',
        cuisine: 'कॉन्टिनेंटल',
        ingredients: [
          { item: 'अंडे', amount: '2', unit: 'नग', note: '' },
          { item: 'बेकन', amount: '2', unit: 'स्ट्रिप्स', note: '' },
          { item: 'टोस्ट', amount: '2', unit: 'स्लाइस', note: '' },
        ],
        steps: [
          { step: 1, text: 'अंडे और बेकन तलें।' },
          { step: 2, text: 'ब्रेड को मक्खन के साथ टोस्ट करें।' },
          { step: 3, text: 'बीन्स गर्म करें और परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_02',
    slug: 'indian-lunch-thali',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.0,
      reviews: 120,
      difficulty: 'medium',
      prepTimeMinutes: 15,
      cookTimeMinutes: 30,
      totalTimeString: '45 min',
      calories: 600,
      servings: 1,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false,
      categoryIds: ['lunch', 'indian', 'vegetarian', 'healthy'],
      tags: ['thali', 'traditional', 'balanced'],
      thumbnail:
        'https://rakskitchen.net/wp-content/uploads/2017/04/indian-lunch-recipes-360x480.jpg',
      images: [
        'https://rakskitchen.net/wp-content/uploads/2017/04/indian-lunch-recipes-360x480.jpg',
      ],
      video: {
        id: 'YwqHCDEW_uQ',
        platform: 'youtube',
        playlist: ['BiO1SXyRAs4', 'nfzgVy9AjDs'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Lunch Thali',
        description: 'Lunch is a midday meal featuring a balanced diet.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Rice', amount: '1', unit: 'cup', note: 'Boiled' },
          { item: 'Lentils', amount: '1', unit: 'cup', note: 'Dal' },
          {
            item: 'Vegetables',
            amount: '1',
            unit: 'bowl',
            note: 'Carrot, beans',
          },
          { item: 'Wheat Flour', amount: '100', unit: 'g', note: 'For Roti' },
        ],
        steps: [
          { step: 1, text: 'Cook rice and prepare lentils.' },
          { step: 2, text: 'Stir-fry vegetables with spices.' },
          { step: 3, text: 'Make rotis on tawa.' },
        ],
      },
      hi: {
        title: 'लंच थाली',
        description: 'दोपहर का भोजन जिसमें संतुलित आहार शामिल है।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'चावल', amount: '1', unit: 'कप', note: 'उबला हुआ' },
          { item: 'दाल', amount: '1', unit: 'कप', note: '' },
          { item: 'सब्जियां', amount: '1', unit: 'कटोरी', note: 'गाजर, बीन्स' },
        ],
        steps: [
          { step: 1, text: 'चावल पकाएं और दाल तैयार करें।' },
          { step: 2, text: 'सब्जियों को मसालों के साथ पकाएं।' },
          { step: 3, text: 'तवे पर रोटियां बनाएं।' },
        ],
      },
    },
  },

  {
    id: 'recipe_03',
    slug: 'pakora',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.2,
      reviews: 200,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      totalTimeString: '25 min',
      calories: 300,
      servings: 4,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true, // Besan is GF
      categoryIds: ['snacks', 'street_food', 'indian', 'gluten_free'],
      tags: ['fried', 'monsoon', 'crispy'],
      thumbnail: 'https://boxedhalal.com/cdn/shop/articles/Pakora.jpg',
      images: ['https://boxedhalal.com/cdn/shop/articles/Pakora.jpg'],
      video: {
        id: 'Pr5i9K6I5bs',
        platform: 'youtube',
        playlist: ['P_W5Tj6gEZQ', 'MYN093CqEHQ'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Pakora',
        description:
          'Vegetables dipped in spiced gram flour batter and deep-fried until golden.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Gram flour (Besan)', amount: '2', unit: 'cups', note: '' },
          { item: 'Potatoes', amount: '2', unit: 'pcs', note: 'Sliced' },
          { item: 'Onions', amount: '2', unit: 'pcs', note: 'Sliced' },
          { item: 'Spices', amount: '1', unit: 'tbsp', note: 'Mix' },
        ],
        steps: [
          { step: 1, text: 'Slice vegetables thinly.' },
          {
            step: 2,
            text: 'Mix gram flour with water and spices to make batter.',
          },
          { step: 3, text: 'Dip veggies in batter and deep fry.' },
        ],
      },
      hi: {
        title: 'पकोरा',
        description:
          'विभिन्न चीजों (जैसे सब्जियां) को बेसन के घोल में लपेटकर कुरकुरा होने तक तला जाता है।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'बेसन', amount: '2', unit: 'कप', note: '' },
          { item: 'आलू', amount: '2', unit: 'नग', note: 'कटा हुआ' },
          { item: 'प्याज', amount: '2', unit: 'नग', note: 'कटा हुआ' },
        ],
        steps: [
          { step: 1, text: 'सब्जियों को पतला काट लें।' },
          { step: 2, text: 'बेसन, पानी और मसालों को मिलाकर घोल तैयार करें।' },
          { step: 3, text: 'सब्जियों को घोल में डुबोएं और तलें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_04',
    slug: 'chaat',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 350,
      difficulty: 'medium',
      prepTimeMinutes: 20,
      cookTimeMinutes: 0,
      totalTimeString: '20 min',
      calories: 250,
      servings: 2,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false, // Puri usually wheat
      categoryIds: ['snacks', 'street_food', 'indian'],
      tags: ['spicy', 'tangy', 'roadside'],
      thumbnail:
        'https://img.freepik.com/premium-photo/bhelpuri-chaat-chat-is-road-side-tasty-food-from-india-served-bowl-plate-selective-focus_466689-37503.jpg',
      images: [
        'https://img.freepik.com/premium-photo/bhelpuri-chaat-chat-is-road-side-tasty-food-from-india-served-bowl-plate-selective-focus_466689-37503.jpg',
      ],
      video: {
        id: 'mMdhuvi0',
        platform: 'youtube',
        playlist: ['eFDwHxsfvWM'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Chaat',
        description:
          "A savory snack typically served as hors d'oeuvre at road-side tracks in India.",
        cuisine: 'Indian',
        ingredients: [
          { item: 'Papdi/Puri', amount: '10', unit: 'pcs', note: 'Crispy' },
          { item: 'Potatoes', amount: '1', unit: 'cup', note: 'Boiled' },
          { item: 'Tamarind Chutney', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Mint Chutney', amount: '2', unit: 'tbsp', note: '' },
        ],
        steps: [
          { step: 1, text: 'Arrange Papdi/Puri on a plate.' },
          { step: 2, text: 'Top with potatoes, onions, and chickpeas.' },
          { step: 3, text: 'Drizzle chutneys and sprinkle sev.' },
        ],
      },
      hi: {
        title: 'चाट',
        description:
          'चाट में विभिन्न चटपटे और मसालेदार तत्वों का मिश्रण होता है, जैसे कि आलू, चना, और चटनियां।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'पापड़ी/पूरी', amount: '10', unit: 'नग', note: '' },
          { item: 'आलू', amount: '1', unit: 'कप', note: 'उबला हुआ' },
          { item: 'इमली की चटनी', amount: '2', unit: 'बड़े चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'प्लेट में पापड़ी/पूरी सजाएं।' },
          { step: 2, text: 'ऊपर आलू, प्याज और छोले डालें।' },
          { step: 3, text: 'चटनी डालें और सेव छिड़कें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_05',
    slug: 'vada-pav',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.8,
      reviews: 500,
      difficulty: 'medium',
      prepTimeMinutes: 15,
      cookTimeMinutes: 10,
      totalTimeString: '25 min',
      calories: 300,
      servings: 1,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false,
      categoryIds: ['snacks', 'street_food', 'burger', 'indian'],
      tags: ['mumbai', 'spicy', 'potato'],
      thumbnail:
        'https://e1.pxfuel.com/desktop-wallpaper/52/451/desktop-wallpaper-vada-pav-thumbnail.jpg',
      images: [
        'https://e1.pxfuel.com/desktop-wallpaper/52/451/desktop-wallpaper-vada-pav-thumbnail.jpg',
      ],
      video: {
        id: '58cHgDaw',
        platform: 'youtube',
        playlist: ['C4pzmjHgqLw'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Vada Pav',
        description:
          'The Indian burger - a deep fried potato dumpling placed inside a bread bun.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Potatoes', amount: '3', unit: 'pcs', note: 'Boiled' },
          { item: 'Pav (Bread rolls)', amount: '4', unit: 'pcs', note: '' },
          { item: 'Gram Flour', amount: '1', unit: 'cup', note: '' },
          { item: 'Garlic Chutney', amount: '2', unit: 'tsp', note: 'Dry' },
        ],
        steps: [
          { step: 1, text: 'Mash potatoes and mix with spices.' },
          { step: 2, text: 'Dip potato balls in gram flour batter and fry.' },
          { step: 3, text: 'Place inside Pav with chutney.' },
        ],
      },
      hi: {
        title: 'वड़ा पाव',
        description:
          'वड़ा पाव में वड़ा (तला हुआ आलू) को पाव (बन) के बीच रखकर खाया जाता है।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'आलू', amount: '3', unit: 'नग', note: 'उबला हुआ' },
          { item: 'पाव', amount: '4', unit: 'नग', note: '' },
          { item: 'बेसन', amount: '1', unit: 'कप', note: '' },
        ],
        steps: [
          { step: 1, text: 'आलू मैश करें और मसाले मिलाएं।' },
          { step: 2, text: 'आलू के गोले बनाकर बेसन में डुबोएं और तलें।' },
          { step: 3, text: 'चटनी के साथ पाव के अंदर रखें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_06',
    slug: 'idli',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 150,
      difficulty: 'hard', // Fermentation takes time
      prepTimeMinutes: 15,
      cookTimeMinutes: 15,
      totalTimeString: '25 min', // Cook time, excluding soak
      calories: 100,
      servings: 4,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true,
      categoryIds: [
        'breakfast',
        'south_indian',
        'healthy',
        'gluten_free',
        'vegan',
      ],
      tags: ['steamed', 'fermented', 'light'],
      thumbnail:
        'https://simmertoslimmer.com/wp-content/uploads/2017/03/Soft-idli-2.jpg',
      images: [
        'https://simmertoslimmer.com/wp-content/uploads/2017/03/Soft-idli-2.jpg',
      ],
      video: {
        id: 'dcMlG1UA-jU',
        platform: 'youtube',
        playlist: ['JuTpG3CRVkI'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Idli',
        description:
          'A type of savoury rice cake, originating from the Indian subcontinent, popular as breakfast foods.',
        cuisine: 'South Indian',
        ingredients: [
          { item: 'Rice', amount: '2', unit: 'cups', note: 'Idli Rice' },
          { item: 'Urad Dal', amount: '1', unit: 'cup', note: 'Black lentil' },
          { item: 'Salt', amount: '1', unit: 'tsp', note: '' },
        ],
        steps: [
          { step: 1, text: 'Soak rice and dal separately for 4-6 hours.' },
          { step: 2, text: 'Grind to a smooth paste and ferment overnight.' },
          { step: 3, text: 'Pour batter into molds and steam for 10-15 mins.' },
        ],
      },
      hi: {
        title: 'इडली',
        description:
          'इडली एक लोकप्रिय दक्षिण भारतीय डिश है, जो चावल और उड़द की दाल के खमीर वाले घोल से बनती है।',
        cuisine: 'दक्षिण भारतीय',
        ingredients: [
          { item: 'चावल', amount: '2', unit: 'कप', note: '' },
          { item: 'उड़द दाल', amount: '1', unit: 'कप', note: '' },
          { item: 'नमक', amount: '1', unit: 'छोटा चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'चावल और दाल को अलग-अलग भिगो दें।' },
          { step: 2, text: 'पीसकर पेस्ट बनाएं और रात भर खमीर उठने दें।' },
          { step: 3, text: 'सांचों में भरकर 10-15 मिनट तक स्टीम करें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_08',
    slug: 'aloo-paratha',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.7,
      reviews: 400,
      difficulty: 'medium',
      prepTimeMinutes: 15,
      cookTimeMinutes: 15,
      totalTimeString: '30 min',
      calories: 350,
      servings: 2,
      isVeg: true,
      isVegan: false, // Usually uses Ghee
      isGlutenFree: false,
      categoryIds: ['breakfast', 'north_indian', 'kids_special'],
      tags: ['stuffed', 'punjabi', 'hearty'],
      thumbnail:
        'https://thumbs.dreamstime.com/b/indian-breakfast-aloo-paratha-potato-pancakes-served-yogurt-dip-87658775.jpg',
      images: [
        'https://thumbs.dreamstime.com/b/indian-breakfast-aloo-paratha-potato-pancakes-served-yogurt-dip-87658775.jpg',
      ],
      video: {
        id: 'xVl8StjYMuc',
        platform: 'youtube',
        playlist: ['O9Bmjbq_g_c'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Aloo Paratha',
        description:
          'Whole wheat flatbread stuffed with a spicy potato filling.',
        cuisine: 'North Indian',
        ingredients: [
          { item: 'Wheat Flour', amount: '2', unit: 'cups', note: '' },
          {
            item: 'Potatoes',
            amount: '3',
            unit: 'pcs',
            note: 'Boiled & Mashed',
          },
          { item: 'Ghee/Oil', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Spices', amount: '1', unit: 'tsp', note: 'Chili, Cumin' },
        ],
        steps: [
          { step: 1, text: 'Knead wheat flour into a soft dough.' },
          { step: 2, text: 'Mash potatoes with spices.' },
          {
            step: 3,
            text: 'Stuff dough with filling, roll out, and cook on griddle with ghee.',
          },
        ],
      },
      hi: {
        title: 'आलू परांठा',
        description: 'आलू और मसालों के मिश्रण से भरा हुआ गेहूं का परांठा।',
        cuisine: 'उत्तर भारतीय',
        ingredients: [
          { item: 'गेहूं का आटा', amount: '2', unit: 'कप', note: '' },
          { item: 'आलू', amount: '3', unit: 'नग', note: 'उबले हुए' },
          { item: 'घी', amount: '2', unit: 'बड़े चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'आटे को नरम गूंथ लें।' },
          { step: 2, text: 'आलू को मसालों के साथ मैश करें।' },
          { step: 3, text: 'आटे में भरकर बेलें और तवे पर घी लगाकर सेकें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_09',
    slug: 'aloo-gobhi',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.2,
      reviews: 90,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      totalTimeString: '30 min',
      calories: 220,
      servings: 3,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true,
      categoryIds: ['lunch', 'dinner', 'north_indian', 'vegan'],
      tags: ['dry-curry', 'winter', 'staple'],
      thumbnail:
        'https://en.petitchef.com/imgupl/recipe/aloo-gobi-potato-cauliflower-fried-version--md-4246',
      images: [
        'https://en.petitchef.com/imgupl/recipe/aloo-gobi-potato-cauliflower-fried-version--md-4246',
      ],
      video: {
        id: 'KMVI7NHcbNE',
        platform: 'youtube',
        playlist: ['PhgyyJE90w8'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Aloo Gobhi',
        description:
          'A popular Indian vegetarian dish made with potatoes, cauliflower, and Indian spices.',
        cuisine: 'North Indian',
        ingredients: [
          {
            item: 'Cauliflower',
            amount: '1',
            unit: 'head',
            note: 'Cut into florets',
          },
          { item: 'Potatoes', amount: '2', unit: 'pcs', note: 'Cubed' },
          { item: 'Ginger', amount: '1', unit: 'inch', note: 'Julienned' },
        ],
        steps: [
          { step: 1, text: 'Fry potatoes and cauliflower until golden.' },
          { step: 2, text: 'Sauté onions, ginger, and tomatoes.' },
          { step: 3, text: 'Add fried veggies to masala and steam cook.' },
        ],
      },
      hi: {
        title: 'आलू गोभी',
        description: 'आलू और फूलगोभी से बनी एक लोकप्रिय सूखी सब्जी।',
        cuisine: 'उत्तर भारतीय',
        ingredients: [
          { item: 'फूलगोभी', amount: '1', unit: 'फूल', note: '' },
          { item: 'आलू', amount: '2', unit: 'नग', note: '' },
          { item: 'अदरक', amount: '1', unit: 'इंच', note: '' },
        ],
        steps: [
          { step: 1, text: 'आलू और गोभी को हल्का तल लें।' },
          { step: 2, text: 'प्याज, अदरक और टमाटर का मसाला भूनें।' },
          { step: 3, text: 'तली हुई सब्जियां मसाले में मिलाकर पकाएं।' },
        ],
      },
    },
  },

  {
    id: 'recipe_10',
    slug: 'butter-chicken',
    isActive: true,
    isPremium: true,
    meta: {
      rating: 4.9,
      reviews: 1000,
      difficulty: 'hard',
      prepTimeMinutes: 30,
      cookTimeMinutes: 30,
      totalTimeString: '60 min',
      calories: 600,
      servings: 4,
      isVeg: false,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['lunch', 'dinner', 'north_indian', 'chicken'],
      tags: ['creamy', 'rich', 'classic'],
      thumbnail:
        'https://healthyfitnessmeals.com/wp-content/uploads/2020/01/Butter-chicken.jpg',
      images: [
        'https://healthyfitnessmeals.com/wp-content/uploads/2020/01/Butter-chicken.jpg',
      ],
      video: {
        id: 'JxSwBpEiYeQ',
        platform: 'youtube',
        playlist: ['VHfhCXkJh34'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Butter Chicken',
        description:
          'Chunks of grilled chicken (tandoori chicken) cooked in a smooth buttery & creamy tomato based gravy.',
        cuisine: 'North Indian',
        ingredients: [
          { item: 'Chicken', amount: '500', unit: 'g', note: 'Boneless' },
          { item: 'Butter', amount: '50', unit: 'g', note: '' },
          { item: 'Fresh Cream', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Tomatoes', amount: '4', unit: 'pcs', note: 'Pureed' },
        ],
        steps: [
          { step: 1, text: 'Marinate chicken and grill/fry it.' },
          {
            step: 2,
            text: 'Prepare gravy with butter, spices, and tomato puree.',
          },
          { step: 3, text: 'Add chicken, finish with cream and kasuri methi.' },
        ],
      },
      hi: {
        title: 'बटर चिकन',
        description: 'मक्खन और क्रीम वाली टमाटर की ग्रेवी में पका हुआ चिकन।',
        cuisine: 'उत्तर भारतीय',
        ingredients: [
          { item: 'चिकन', amount: '500', unit: 'ग्राम', note: '' },
          { item: 'मक्खन', amount: '50', unit: 'ग्राम', note: '' },
          { item: 'क्रीम', amount: '1/2', unit: 'कप', note: '' },
        ],
        steps: [
          { step: 1, text: 'चिकन को मैरीनेट करके ग्रिल करें।' },
          { step: 2, text: 'मक्खन, मसाले और टमाटर प्यूरी से ग्रेवी बनाएं।' },
          { step: 3, text: 'चिकन डालें और क्रीम डालकर परोसें।' },
        ],
      },
    },
  },
  {
    id: 'recipe_12',
    slug: 'masala-dosa',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.8,
      reviews: 600,
      difficulty: 'hard',
      prepTimeMinutes: 20,
      cookTimeMinutes: 10,
      totalTimeString: '30 min',
      calories: 300,
      servings: 1,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'south_indian', 'street_food', 'vegan'],
      tags: ['crispy', 'potato-filling', 'chutney'],
      thumbnail:
        'https://st3.depositphotos.com/5653638/18152/i/450/depositphotos_181528754-stock-photo-masala-dosa-chutney-sambar-potato.jpg',
      images: [
        'https://st3.depositphotos.com/5653638/18152/i/450/depositphotos_181528754-stock-photo-masala-dosa-chutney-sambar-potato.jpg',
      ],
      video: {
        id: 'gY1LXg8AnU4',
        platform: 'youtube',
        playlist: ['J75VQSxOtdo'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Masala Dosa',
        description:
          'A thin crispy crepe made from fermented rice and lentil batter, filled with spiced potatoes.',
        cuisine: 'South Indian',
        ingredients: [
          { item: 'Dosa Batter', amount: '1', unit: 'cup', note: '' },
          { item: 'Potatoes', amount: '2', unit: 'pcs', note: 'Boiled' },
          { item: 'Mustard Seeds', amount: '1', unit: 'tsp', note: '' },
          { item: 'Turmeric', amount: '1/2', unit: 'tsp', note: '' },
        ],
        steps: [
          {
            step: 1,
            text: 'Prepare the potato masala filling with tempering.',
          },
          { step: 2, text: 'Spread batter thinly on a hot griddle.' },
          {
            step: 3,
            text: 'Add oil, cook until crispy, stuff with potato and fold.',
          },
        ],
      },
      hi: {
        title: 'मसाला डोसा',
        description: 'मसालेदार आलू से भरा हुआ चावल और दाल का कुरकुरा डोसा।',
        cuisine: 'दक्षिण भारतीय',
        ingredients: [
          { item: 'डोसा बैटर', amount: '1', unit: 'कप', note: '' },
          { item: 'आलू', amount: '2', unit: 'नग', note: '' },
          { item: 'राई', amount: '1', unit: 'छोटा चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'आलू का मसाला तैयार करें।' },
          { step: 2, text: 'तवे पर बैटर को पतला फैलाएं।' },
          { step: 3, text: 'तेल डालें, कुरकुरा होने पर आलू भरकर रोल करें।' },
        ],
      },
    },
  },
  {
    id: 'recipe_18',
    slug: 'tandoori-chicken',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.6,
      reviews: 220,
      difficulty: 'medium',
      prepTimeMinutes: 20,
      cookTimeMinutes: 30,
      totalTimeString: '50 min',
      calories: 400,
      servings: 2,
      isVeg: false,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['lunch', 'dinner', 'starters', 'north_indian', 'keto'],
      tags: ['roasted', 'spicy', 'smoky'],
      thumbnail: 'https://i.ytimg.com/vi/EayeRDoCOdg/hqdefault.jpg',
      images: ['https://i.ytimg.com/vi/EayeRDoCOdg/hqdefault.jpg'],
      video: {
        id: 'A3lcRok1zf8',
        platform: 'youtube',
        playlist: ['ieWpaZXi_Vo'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Tandoori Chicken',
        description:
          'Chicken marinated in yogurt and spices and roasted in a tandoor, a cylindrical clay oven.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Chicken Legs', amount: '4', unit: 'pcs', note: '' },
          { item: 'Yogurt', amount: '1', unit: 'cup', note: 'Thick' },
          { item: 'Tandoori Masala', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Lemon Juice', amount: '1', unit: 'tbsp', note: '' },
        ],
        steps: [
          {
            step: 1,
            text: 'Make cuts on chicken and marinate with spices and yogurt.',
          },
          { step: 2, text: 'Refrigerate for at least 4 hours.' },
          { step: 3, text: 'Roast in oven/tandoor until charred and cooked.' },
        ],
      },
      hi: {
        title: 'तंदूरी चिकन',
        description:
          'दही और मसालों में मैरीनेट किया हुआ और तंदूर में भुनने वाला चिकन।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'चिकन', amount: '4', unit: 'पीस', note: '' },
          { item: 'दही', amount: '1', unit: 'कप', note: '' },
          { item: 'तंदूरी मसाला', amount: '2', unit: 'बड़े चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'चिकन पर कट लगाएं और मैरीनेट करें।' },
          { step: 2, text: 'कम से कम 4 घंटे फ्रिज में रखें।' },
          { step: 3, text: 'ओवन या तंदूर में पकाएं।' },
        ],
      },
    },
  },

  {
    id: 'recipe_19',
    slug: 'vindaloo',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.2,
      reviews: 180,
      difficulty: 'medium',
      prepTimeMinutes: 20,
      cookTimeMinutes: 40,
      totalTimeString: '60 min',
      calories: 450,
      servings: 2,
      isVeg: false,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['lunch', 'dinner', 'indian', 'street_food'],
      tags: ['spicy', 'sour', 'pork', 'lamb'],
      thumbnail:
        'https://thebigmansworld.com/wp-content/uploads/2022/12/lamb-vindaloo-recipe.jpg',
      images: [
        'https://thebigmansworld.com/wp-content/uploads/2022/12/lamb-vindaloo-recipe.jpg',
      ],
      video: {
        id: 'gJQTjIxZSms',
        platform: 'youtube',
        playlist: ['7KDt6ZDYJpQ', '6nqsPZ1sjc4'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Vindaloo',
        description:
          'A hot and tangy Indian curry, traditionally made with pork or lamb, marinated in vinegar and spices.',
        cuisine: 'Goan (Indian)',
        ingredients: [
          { item: 'Lamb/Pork', amount: '500', unit: 'g', note: 'Cubed' },
          { item: 'Vinegar', amount: '2', unit: 'tbsp', note: '' },
          {
            item: 'Kashmiri Red Chili',
            amount: '5',
            unit: 'pcs',
            note: 'Dried',
          },
          { item: 'Garlic', amount: '6', unit: 'cloves', note: '' },
        ],
        steps: [
          { step: 1, text: 'Grind spices with vinegar to make a paste.' },
          { step: 2, text: 'Marinate meat in the paste for 2 hours.' },
          { step: 3, text: 'Fry onions, add meat, and simmer until tender.' },
        ],
      },
      hi: {
        title: 'विंडालू',
        description:
          'विंडालू एक तीखी और खट्टी भारतीय करी है, जिसमें सिरका और मसालों का मिश्रण होता है।',
        cuisine: 'गोअन',
        ingredients: [
          { item: 'मीट (पॉर्क/मटन)', amount: '500', unit: 'ग्राम', note: '' },
          { item: 'सिरका', amount: '2', unit: 'बड़े चम्मच', note: '' },
          { item: 'लाल मिर्च', amount: '5', unit: 'नग', note: 'सूखी' },
        ],
        steps: [
          { step: 1, text: 'मसालों और सिरके को पीसकर पेस्ट बना लें।' },
          { step: 2, text: 'मीट को इस पेस्ट में 2 घंटे तक मैरीनेट करें।' },
          {
            step: 3,
            text: 'प्याज भूनें, मीट डालें और पकने तक धीमी आंच पर रखें।',
          },
        ],
      },
    },
  },

  {
    id: 'recipe_20',
    slug: 'malabar-fish-curry',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.4,
      reviews: 210,
      difficulty: 'medium',
      prepTimeMinutes: 15,
      cookTimeMinutes: 20,
      totalTimeString: '35 min',
      calories: 320,
      servings: 2,
      isVeg: false,
      isVegan: false, // Contains Fish
      isGlutenFree: true,
      categoryIds: ['lunch', 'dinner', 'seafood', 'south_indian', 'healthy'],
      tags: ['coconut', 'fish', 'kerala'],
      thumbnail:
        'https://c.ndtvimg.com/2021-02/qbkp4mcg_fish-curry_625x300_10_February_21.jpg',
      images: [
        'https://c.ndtvimg.com/2021-02/qbkp4mcg_fish-curry_625x300_10_February_21.jpg',
      ],
      video: {
        id: '7_PcF2WwM',
        platform: 'youtube',
        playlist: ['Z4vJBZkOO14', 'RxXS2QVmMVg'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Malabar Fish Curry',
        description:
          'A delicious fish curry from the Malabar region, cooked with coconut milk and tamarind.',
        cuisine: 'South Indian (Kerala)',
        ingredients: [
          { item: 'Fish', amount: '500', unit: 'g', note: 'Kingfish/Mackerel' },
          { item: 'Coconut Milk', amount: '1', unit: 'cup', note: '' },
          { item: 'Tamarind Paste', amount: '1', unit: 'tbsp', note: '' },
          { item: 'Curry Leaves', amount: '1', unit: 'sprig', note: '' },
        ],
        steps: [
          { step: 1, text: 'Marinate fish with turmeric and salt.' },
          { step: 2, text: 'Heat oil, add mustard seeds and curry leaves.' },
          {
            step: 3,
            text: 'Add coconut milk, tamarind, and fish. Simmer gently.',
          },
        ],
      },
      hi: {
        title: 'मालाबार मछली करी',
        description:
          'मालाबार क्षेत्र की एक स्वादिष्ट मछली करी जिसे नारियल के दूध और इमली के साथ बनाया जाता है।',
        cuisine: 'दक्षिण भारतीय',
        ingredients: [
          { item: 'मछली', amount: '500', unit: 'ग्राम', note: '' },
          { item: 'नारियल का दूध', amount: '1', unit: 'कप', note: '' },
          { item: 'इमली का पेस्ट', amount: '1', unit: 'बड़ा चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'मछली को हल्दी और नमक लगाकर रखें।' },
          { step: 2, text: 'तेल गर्म करें, राई और करी पत्ता डालें।' },
          { step: 3, text: 'नारियल का दूध, इमली और मछली डालें और पकने दें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_21',
    slug: 'biryani',
    isActive: true,
    isPremium: true,
    meta: {
      rating: 4.8,
      reviews: 1200,
      difficulty: 'hard',
      prepTimeMinutes: 40,
      cookTimeMinutes: 45,
      totalTimeString: '85 min',
      calories: 650,
      servings: 4,
      isVeg: false, // Usually meat, though veg option exists. Standardizing as non-veg based on ingredients.
      isVegan: false,
      isGlutenFree: true,
      categoryIds: [
        'lunch',
        'dinner',
        'rice_biriyani',
        'indian',
        'festival_special',
      ],
      tags: ['aromatic', 'royal', 'rice'],
      thumbnail:
        'https://i.pinimg.com/736x/24/ac/bb/24acbb7530fb22151d3f3f1581fb947d.jpg',
      images: [
        'https://i.pinimg.com/736x/24/ac/bb/24acbb7530fb22151d3f3f1581fb947d.jpg',
      ],
      video: {
        id: 'jjmR9C_X7LY',
        platform: 'youtube',
        playlist: ['95BCU1n268w', 'YTYtKuLwl9U'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Biryani',
        description:
          'A world-renowned Indian dish where rice and meat are cooked together with aromatic spices.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Basmati Rice', amount: '2', unit: 'cups', note: 'Soaked' },
          { item: 'Chicken/Mutton', amount: '500', unit: 'g', note: '' },
          { item: 'Yogurt', amount: '1/2', unit: 'cup', note: '' },
          {
            item: 'Saffron',
            amount: '1',
            unit: 'pinch',
            note: 'Soaked in milk',
          },
        ],
        steps: [
          { step: 1, text: 'Marinate meat with yogurt and spices.' },
          { step: 2, text: 'Par-boil rice with whole spices.' },
          {
            step: 3,
            text: 'Layer meat and rice, add saffron, and cook on "Dum" (steam).',
          },
        ],
      },
      hi: {
        title: 'बिरयानी',
        description:
          'चावल और मांस को खुशबूदार मसालों के साथ पकाकर बनाई गई एक शाही डिश।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'बासमती चावल', amount: '2', unit: 'कप', note: '' },
          { item: 'चिकन/मटन', amount: '500', unit: 'ग्राम', note: '' },
          { item: 'दही', amount: '1/2', unit: 'कप', note: '' },
          { item: 'केसर', amount: '1', unit: 'चुटकी', note: '' },
        ],
        steps: [
          { step: 1, text: 'मीट को दही और मसालों में मैरीनेट करें।' },
          { step: 2, text: 'चावल को आधा पका लें।' },
          { step: 3, text: 'मीट और चावल की परत लगाएं और दम पर पकाएं।' },
        ],
      },
    },
  },

  {
    id: 'recipe_22',
    slug: 'samosa',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.6,
      reviews: 500,
      difficulty: 'medium',
      prepTimeMinutes: 30,
      cookTimeMinutes: 20,
      totalTimeString: '50 min',
      calories: 200,
      servings: 4,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false, // Maida crust
      categoryIds: ['snacks', 'street_food', 'indian', 'festival_special'],
      tags: ['fried', 'potato', 'classic'],
      thumbnail:
        'https://s.enavabharat.com/wp-content/uploads/2022/03/samosa.jpg',
      images: [
        'https://s.enavabharat.com/wp-content/uploads/2022/03/samosa.jpg',
      ],
      video: {
        id: 'EKPAfUCn_Jo',
        platform: 'youtube',
        playlist: ['IEdVmXpjGcI', 'JgV8j4N73uc'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Samosa',
        description:
          'Deep-fried pastry filled with a spiced mixture of potatoes and peas.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Flour (Maida)', amount: '2', unit: 'cups', note: '' },
          { item: 'Potatoes', amount: '3', unit: 'pcs', note: 'Boiled' },
          { item: 'Green Peas', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Ajwain', amount: '1', unit: 'tsp', note: '' },
        ],
        steps: [
          { step: 1, text: 'Prepare stiff dough with flour and oil.' },
          { step: 2, text: 'Cook mashed potatoes with peas and spices.' },
          { step: 3, text: 'Fill cones with mixture, seal, and deep fry.' },
        ],
      },
      hi: {
        title: 'समोसा',
        description: 'आलू और मटर के मसाले से भरी हुई तली हुई कुरकुरी पेस्ट्री।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'मैदा', amount: '2', unit: 'कप', note: '' },
          { item: 'आलू', amount: '3', unit: 'नग', note: 'उबले हुए' },
          { item: 'हरे मटर', amount: '1/2', unit: 'कप', note: '' },
        ],
        steps: [
          { step: 1, text: 'मैदे और तेल से सख्त आटा गूंथ लें।' },
          { step: 2, text: 'आलू और मटर को मसालों के साथ पकाएं।' },
          { step: 3, text: 'मसाला भरकर समोसे का आकार दें और तलें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_23',
    slug: 'ras-malai',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.7,
      reviews: 300,
      difficulty: 'hard',
      prepTimeMinutes: 30,
      cookTimeMinutes: 40,
      totalTimeString: '70 min',
      calories: 350,
      servings: 4,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['desserts', 'sweets', 'festival_special', 'indian'],
      tags: ['milk', 'sweet', 'soft'],
      thumbnail:
        'https://t4.ftcdn.net/jpg/01/70/08/57/360_F_170085719_JV6PpID2AlvjZFKvCW7vu1ywVfwpAncJ.jpg',
      images: [
        'https://t4.ftcdn.net/jpg/01/70/08/57/360_F_170085719_JV6PpID2AlvjZFKvCW7vu1ywVfwpAncJ.jpg',
      ],
      video: {
        id: 'znefLMNyVE8',
        platform: 'youtube',
        playlist: ['9mm8my_NLlY', 'LECpZPkP9Wk'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Ras Malai',
        description:
          'Soft cottage cheese dumplings soaked in sweetened, thickened milk flavored with cardamom and saffron.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Milk', amount: '2', unit: 'liters', note: 'Full fat' },
          { item: 'Lemon Juice', amount: '2', unit: 'tbsp', note: 'To curdle' },
          { item: 'Sugar', amount: '1', unit: 'cup', note: '' },
          { item: 'Saffron', amount: '1', unit: 'pinch', note: '' },
        ],
        steps: [
          { step: 1, text: 'Make Chenna (cheese) by curdling milk.' },
          {
            step: 2,
            text: 'Knead chenna, make balls, and boil in sugar syrup.',
          },
          { step: 3, text: 'Soak balls in thickened saffron milk (Rabri).' },
        ],
      },
      hi: {
        title: 'रसमलाई',
        description:
          'इलायची और केसर वाले गाढ़े दूध में भीगे हुए नरम पनीर के गोले।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'दूध', amount: '2', unit: 'लीटर', note: '' },
          { item: 'नींबू का रस', amount: '2', unit: 'बड़े चम्मच', note: '' },
          { item: 'चीनी', amount: '1', unit: 'कप', note: '' },
        ],
        steps: [
          { step: 1, text: 'दूध फाड़कर छेना बनाएं।' },
          { step: 2, text: 'छेना गूंथकर गोले बनाएं और चाशनी में उबालें।' },
          { step: 3, text: 'गोलों को गाढ़े केसरिया दूध में भिगोएं।' },
        ],
      },
    },
  },

  {
    id: 'recipe_24',
    slug: 'kulfi',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 150,
      difficulty: 'medium',
      prepTimeMinutes: 10,
      cookTimeMinutes: 40,
      totalTimeString: '50 min',
      calories: 250,
      servings: 4,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['desserts', 'sweets', 'kids_special', 'indian'],
      tags: ['ice-cream', 'summer', 'nuts'],
      thumbnail:
        'https://www.potsandpans.in/cdn/shop/articles/iStock-657090194-Kulfi-Recipe.jpg?v=1539873741',
      images: [
        'https://www.potsandpans.in/cdn/shop/articles/iStock-657090194-Kulfi-Recipe.jpg?v=1539873741',
      ],
      video: {
        id: 'f6D7A6-QNl8',
        platform: 'youtube',
        playlist: ['34TQWHf_e8s', '6LHoeSrR6Zk'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Kulfi',
        description:
          'Traditional Indian ice cream made by slowly simmering milk until thick and creamy.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Milk', amount: '1', unit: 'liter', note: 'Full cream' },
          { item: 'Sugar', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Cardamom Powder', amount: '1/2', unit: 'tsp', note: '' },
          {
            item: 'Nuts',
            amount: '2',
            unit: 'tbsp',
            note: 'Pistachios, Almonds',
          },
        ],
        steps: [
          { step: 1, text: 'Boil milk until reduced to half.' },
          { step: 2, text: 'Add sugar, cardamom, and nuts.' },
          { step: 3, text: 'Pour into molds and freeze overnight.' },
        ],
      },
      hi: {
        title: 'कुल्फी',
        description:
          'दूध को गाढ़ा और मलाईदार होने तक उबालकर बनाई गई पारंपरिक भारतीय आइसक्रीम।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'दूध', amount: '1', unit: 'लीटर', note: '' },
          { item: 'चीनी', amount: '1/2', unit: 'कप', note: '' },
          { item: 'इलायची पाउडर', amount: '1/2', unit: 'छोटा चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'दूध को आधा होने तक उबालें।' },
          { step: 2, text: 'चीनी, इलायची और मेवे मिलाएं।' },
          { step: 3, text: 'सांचों में भरकर रात भर फ्रीज करें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_25',
    slug: 'gulab-jamun',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.8,
      reviews: 800,
      difficulty: 'medium',
      prepTimeMinutes: 20,
      cookTimeMinutes: 20,
      totalTimeString: '40 min',
      calories: 300,
      servings: 4,
      isVeg: true,
      isVegan: false,
      isGlutenFree: false, // Usually has some flour
      categoryIds: ['desserts', 'sweets', 'festival_special', 'indian'],
      tags: ['syrup', 'balls', 'festive'],
      thumbnail:
        'https://aartimadan.com/wp-content/uploads/2020/11/milk-powder-gulab-jamuns.jpg',
      images: [
        'https://aartimadan.com/wp-content/uploads/2020/11/milk-powder-gulab-jamuns.jpg',
      ],
      video: {
        id: 'QFvd7u_YjVk',
        platform: 'youtube',
        playlist: ['VVhs1wj9DhU', 'aUFO-YnWslw'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Gulab Jamun',
        description:
          'Deep-fried dough balls made of milk solids soaked in aromatic sugar syrup.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Milk Powder', amount: '1', unit: 'cup', note: '' },
          { item: 'All Purpose Flour', amount: '1/4', unit: 'cup', note: '' },
          { item: 'Ghee', amount: '1', unit: 'tbsp', note: '' },
          {
            item: 'Sugar Syrup',
            amount: '2',
            unit: 'cups',
            note: 'Rose flavored',
          },
        ],
        steps: [
          {
            step: 1,
            text: 'Mix milk powder, flour, and ghee to make a dough.',
          },
          { step: 2, text: 'Shape into smooth balls and fry on low heat.' },
          { step: 3, text: 'Soak fried balls in warm sugar syrup.' },
        ],
      },
      hi: {
        title: 'गुलाब जामुन',
        description:
          'खोया या मिल्क पाउडर के तले हुए गोले जिन्हें चाशनी में डुबोया जाता है।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'मिल्क पाउडर', amount: '1', unit: 'कप', note: '' },
          { item: 'मैदा', amount: '1/4', unit: 'कप', note: '' },
          { item: 'घी', amount: '1', unit: 'बड़ा चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'मिल्क पाउडर, मैदा और घी मिलाकर आटा गूंथें।' },
          { step: 2, text: 'गोले बनाएं और धीमी आंच पर तलें।' },
          { step: 3, text: 'तले हुए गोलों को चाशनी में डालें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_26',
    slug: 'barfi',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.3,
      reviews: 120,
      difficulty: 'medium',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      totalTimeString: '30 min',
      calories: 150,
      servings: 6,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['desserts', 'sweets', 'festival_special', 'indian'],
      tags: ['fudge', 'milk', 'square'],
      thumbnail:
        'https://foodhistoria.com/wp-content/uploads/2023/03/pressure-cooker-milk-burfi.jpg',
      images: [
        'https://foodhistoria.com/wp-content/uploads/2023/03/pressure-cooker-milk-burfi.jpg',
      ],
      video: {
        id: 'ktREiOWb_Bw',
        platform: 'youtube',
        playlist: ['9Ie2ncXp1Wc', 'LxC3OVfXihw'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Barfi',
        description: 'A dense milk-based sweet confectionery similar to fudge.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Milk Powder', amount: '2', unit: 'cups', note: '' },
          { item: 'Condensed Milk', amount: '1', unit: 'tin', note: '' },
          { item: 'Ghee', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Cardamom', amount: '1', unit: 'tsp', note: 'Powdered' },
        ],
        steps: [
          { step: 1, text: 'Mix milk powder and condensed milk in a pan.' },
          {
            step: 2,
            text: 'Cook with ghee until it leaves the sides of the pan.',
          },
          { step: 3, text: 'Spread on a tray, cool, and cut into squares.' },
        ],
      },
      hi: {
        title: 'बर्फी',
        description: 'दूध से बनी एक सख्त और मीठी मिठाई।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'मिल्क पाउडर', amount: '2', unit: 'कप', note: '' },
          { item: 'क कंडेंस्ड मिल्क', amount: '1', unit: 'टीन', note: '' },
          { item: 'घी', amount: '2', unit: 'बड़े चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'पैन में मिल्क पाउडर और कंडेंस्ड मिल्क मिलाएं।' },
          { step: 2, text: 'घी डालकर तब तक पकाएं जब तक वह पैन न छोड़ दे।' },
          { step: 3, text: 'ट्रे में फैलाएं, ठंडा करें और चौकोर काटें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_27',
    slug: 'lassi',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.6,
      reviews: 400,
      difficulty: 'easy',
      prepTimeMinutes: 5,
      cookTimeMinutes: 0,
      totalTimeString: '5 min',
      calories: 180,
      servings: 1,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['drinks', 'beverages', 'summer', 'indian', 'street_food'],
      tags: ['yogurt', 'cooling', 'sweet'],
      thumbnail:
        'https://i1.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/Flavoured-Lassi.jpg',
      images: [
        'https://i1.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/Flavoured-Lassi.jpg',
      ],
      video: {
        id: 'g4As2DDoUVI',
        platform: 'youtube',
        playlist: ['SlqpgRCdSyo', 'vKn1b9G1BjE'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Lassi',
        description:
          'A popular traditional yogurt-based drink from the Indian subcontinent.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Yogurt', amount: '1', unit: 'cup', note: 'Thick' },
          { item: 'Sugar', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Water/Milk', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Cardamom', amount: '1', unit: 'pinch', note: '' },
        ],
        steps: [
          { step: 1, text: 'Whisk yogurt until smooth.' },
          { step: 2, text: 'Add sugar, water/milk, and flavorings.' },
          {
            step: 3,
            text: 'Blend well and serve chilled topped with nuts/malai.',
          },
        ],
      },
      hi: {
        title: 'लस्सी',
        description: 'दही से बना एक लोकप्रिय भारतीय पेय।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'दही', amount: '1', unit: 'कप', note: 'गाढ़ा' },
          { item: 'चीनी', amount: '2', unit: 'बड़े चम्मच', note: '' },
          { item: 'पानी/दूध', amount: '1/2', unit: 'कप', note: '' },
        ],
        steps: [
          { step: 1, text: 'दही को अच्छी तरह फेंटें।' },
          { step: 2, text: 'चीनी, पानी और स्वाद डालें।' },
          { step: 3, text: 'ब्लेंड करें और ठंडा परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_28',
    slug: 'pasta-red-sauce',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.1,
      reviews: 100,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      totalTimeString: '25 min',
      calories: 350,
      servings: 2,
      isVeg: true,
      isVegan: false, // Cheese
      isGlutenFree: false,
      categoryIds: ['pasta', 'italian', 'kids_special', 'continental'],
      tags: ['tomato', 'basil', 'quick'],
      thumbnail:
        'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?cs=srgb&dl=pexels-eneida-nieves-803963.jpg&fm=jpg',
      images: [
        'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?cs=srgb&dl=pexels-eneida-nieves-803963.jpg&fm=jpg',
      ],
      video: {
        id: 'yVDz0Av-s2A',
        platform: 'youtube',
        playlist: ['eQKxA4Fca-c', 'SoPgnUZMBXU'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Red Sauce Pasta',
        description:
          'Classic pasta cooked in a savory tomato and garlic sauce.',
        cuisine: 'Italian',
        ingredients: [
          { item: 'Pasta', amount: '2', unit: 'cups', note: 'Penne/Fusilli' },
          { item: 'Tomatoes', amount: '4', unit: 'pcs', note: 'Pureed' },
          { item: 'Garlic', amount: '4', unit: 'cloves', note: 'Minced' },
          { item: 'Olive Oil', amount: '2', unit: 'tbsp', note: '' },
        ],
        steps: [
          { step: 1, text: 'Boil pasta al dente and set aside.' },
          {
            step: 2,
            text: 'Sauté garlic in olive oil, add tomato puree and herbs.',
          },
          { step: 3, text: 'Toss pasta in the sauce and top with cheese.' },
        ],
      },
      hi: {
        title: 'पास्ता (रेड सॉस)',
        description: 'टमाटर और लहसुन की चटपटी सॉस में पकाया गया पास्ता।',
        cuisine: 'इटालियन',
        ingredients: [
          { item: 'पास्ता', amount: '2', unit: 'कप', note: '' },
          { item: 'टमाटर', amount: '4', unit: 'नग', note: 'प्यूरी' },
          { item: 'लहसुन', amount: '4', unit: 'कलियां', note: '' },
        ],
        steps: [
          { step: 1, text: 'पास्ता उबाल लें।' },
          { step: 2, text: 'लहसुन भूनें, टमाटर प्यूरी और मसाले डालें।' },
          { step: 3, text: 'पास्ता को सॉस में मिलाएं और चीज़ डालें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_29',
    slug: 'mixed-fruit-juice',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 80,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 0,
      totalTimeString: '10 min',
      calories: 120,
      servings: 2,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true,
      categoryIds: ['drinks', 'beverages', 'healthy', 'breakfast'],
      tags: ['vitamins', 'fresh', 'detox'],
      thumbnail:
        'https://st.depositphotos.com/1177973/2208/i/450/depositphotos_22081689-stock-photo-glasses-of-juise-with-leafs.jpg',
      images: [
        'https://st.depositphotos.com/1177973/2208/i/450/depositphotos_22081689-stock-photo-glasses-of-juise-with-leafs.jpg',
      ],
      video: {
        id: 'HYeGy9yTbsM',
        platform: 'youtube',
        playlist: ['DqeBeDwVX6Y', 'ljagZW5tY-8'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Mixed Fruit Juice',
        description:
          'Freshly squeezed juice made from a blend of seasonal fruits.',
        cuisine: 'Global',
        ingredients: [
          {
            item: 'Mixed Fruits',
            amount: '2',
            unit: 'cups',
            note: 'Oranges, Apples, Grapes',
          },
          { item: 'Ice Cubes', amount: '4', unit: 'pcs', note: '' },
          { item: 'Sugar/Honey', amount: '1', unit: 'tsp', note: 'Optional' },
        ],
        steps: [
          { step: 1, text: 'Wash and peel fruits.' },
          { step: 2, text: 'Blend or juice them.' },
          { step: 3, text: 'Strain (optional), add ice, and serve.' },
        ],
      },
      hi: {
        title: 'मिक्स फ्रूट जूस',
        description: 'मौसमी फलों के मिश्रण से बना ताजा रस।',
        cuisine: 'ग्लोबल',
        ingredients: [
          { item: 'फल', amount: '2', unit: 'कप', note: 'संतरा, सेब, अंगूर' },
          { item: 'बर्फ', amount: '4', unit: 'टुकड़े', note: '' },
        ],
        steps: [
          { step: 1, text: 'फलों को धोकर छील लें।' },
          { step: 2, text: 'जूसर या ब्लेंडर में पीस लें।' },
          { step: 3, text: 'छान लें और बर्फ डालकर परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_30',
    slug: 'naan',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.4,
      reviews: 250,
      difficulty: 'medium',
      prepTimeMinutes: 60,
      cookTimeMinutes: 10,
      totalTimeString: '70 min',
      calories: 280,
      servings: 4,
      isVeg: true,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['lunch', 'dinner', 'indian', 'north_indian'],
      tags: ['bread', 'tandoori', 'soft'],
      thumbnail:
        'https://vikrammills.com/superadmin/upload/blog/butter-naan.jpg',
      images: [
        'https://vikrammills.com/superadmin/upload/blog/butter-naan.jpg',
      ],
      video: {
        id: 'uBmiX-fer5o',
        platform: 'youtube',
        playlist: ['X59JECzaUU4', 'WnkTTvAVisU'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Naan',
        description:
          'A leavened, oven-baked flatbread found in the cuisines mainly of Western Asia and South Asia.',
        cuisine: 'North Indian',
        ingredients: [
          { item: 'All Purpose Flour', amount: '2', unit: 'cups', note: '' },
          { item: 'Yeast/Baking Powder', amount: '1', unit: 'tsp', note: '' },
          { item: 'Yogurt', amount: '2', unit: 'tbsp', note: '' },
          {
            item: 'Ghee/Butter',
            amount: '1',
            unit: 'tbsp',
            note: 'For brushing',
          },
        ],
        steps: [
          {
            step: 1,
            text: 'Knead flour with yogurt, yeast/baking powder, and water.',
          },
          { step: 2, text: 'Let the dough rise for 1 hour.' },
          {
            step: 3,
            text: 'Roll out and cook in Tandoor or on a hot skillet.',
          },
        ],
      },
      hi: {
        title: 'नान',
        description: 'तंदूर में पकाई जाने वाली एक लोकप्रिय भारतीय ब्रेड।',
        cuisine: 'उत्तर भारतीय',
        ingredients: [
          { item: 'मैदा', amount: '2', unit: 'कप', note: '' },
          {
            item: 'यीस्ट/बेकिंग पाउडर',
            amount: '1',
            unit: 'छोटा चम्मच',
            note: '',
          },
          { item: 'दही', amount: '2', unit: 'बड़े चम्मच', note: '' },
        ],
        steps: [
          { step: 1, text: 'मैदा, दही और यीस्ट मिलाकर आटा गूंथें।' },
          { step: 2, text: 'आटे को 1 घंटे फूलने दें।' },
          { step: 3, text: 'बेलकर तंदूर या तवे पर पकाएं।' },
        ],
      },
    },
  },

  //final recipies breakfast
  {
    id: 'recipe_31',
    slug: 'poha',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 234,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 10,
      totalTimeString: '20 min',
      calories: 250,
      servings: 2,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'indian'],
      tags: ['indian', 'quick', 'healthy', 'vegetarian', 'light'],
      thumbnail:
        'https://nfcihospitality.com/wp-content/uploads/2024/11/Lemon-Poha-Recipe.jpg',
      images: [
        'https://nfcihospitality.com/wp-content/uploads/2024/11/Lemon-Poha-Recipe.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'hL-BnQF_gmI',
          'UXaOuBoatUA',
          '92D8P1mamrQ',
          'VKvwWeVy8Nw',
          'XuttnylxuXY',
          'b0ky4eO9YcY',
          'itKRyARGpnA',
          'VJbrtiP-krY',
          '8LwYrE7PaC0',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Poha',
        description:
          'A light and nutritious Indian breakfast made with flattened rice, vegetables, and mild spices.',
        cuisine: 'Indian',
        ingredients: [
          {
            item: 'Poha (flattened rice)',
            amount: '1',
            unit: 'cup',
            note: 'washed and drained',
          },
          { item: 'Onion', amount: '1', unit: 'small', note: 'finely chopped' },
          { item: 'Green chilli', amount: '1', unit: 'pcs', note: 'chopped' },
          { item: 'Peanuts', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Mustard seeds', amount: '1', unit: 'tsp', note: '' },
          { item: 'Turmeric powder', amount: '1/4', unit: 'tsp', note: '' },
          { item: 'Curry leaves', amount: '6', unit: 'pcs', note: '' },
          { item: 'Lemon juice', amount: '1', unit: 'tsp', note: '' },
          {
            item: 'Fresh coriander',
            amount: '1',
            unit: 'tbsp',
            note: 'chopped',
          },
          { item: 'Salt', amount: 'to taste', unit: '', note: '' },
          { item: 'Oil', amount: '1', unit: 'tbsp', note: '' },
        ],
        steps: [
          {
            step: 1,
            text: 'Wash poha in water and drain well. Keep aside for a few minutes.',
          },
          {
            step: 2,
            text: 'Heat oil in a pan and add mustard seeds and curry leaves.',
          },
          { step: 3, text: 'Add peanuts and fry until slightly golden.' },
          {
            step: 4,
            text: 'Add chopped onion and green chilli, sauté until soft.',
          },
          {
            step: 5,
            text: 'Add turmeric powder, salt, and the soaked poha. Mix gently.',
          },
          {
            step: 6,
            text: 'Cook for 2–3 minutes, then add lemon juice and garnish with coriander.',
          },
          { step: 7, text: 'Serve hot with tea or yogurt.' },
        ],
      },
      hi: {
        title: 'पोहा',
        description:
          'पोहा एक हल्का और पौष्टिक भारतीय नाश्ता है जो चिवड़ा, सब्जियों और हल्के मसालों से बनाया जाता है।',
        cuisine: 'भारतीय',
        ingredients: [
          {
            item: 'पोहा (चिवड़ा)',
            amount: '1',
            unit: 'कप',
            note: 'धोकर पानी निकाल लें',
          },
          { item: 'प्याज', amount: '1', unit: 'छोटा', note: 'बारीक कटा हुआ' },
          { item: 'हरी मिर्च', amount: '1', unit: 'नग', note: 'कटी हुई' },
          { item: 'मूंगफली', amount: '2', unit: 'टेबलस्पून', note: '' },
          { item: 'राई', amount: '1', unit: 'टीस्पून', note: '' },
          { item: 'हल्दी पाउडर', amount: '1/4', unit: 'टीस्पून', note: '' },
          { item: 'करी पत्ता', amount: '6', unit: 'नग', note: '' },
          { item: 'नींबू का रस', amount: '1', unit: 'टीस्पून', note: '' },
          {
            item: 'हरा धनिया',
            amount: '1',
            unit: 'टेबलस्पून',
            note: 'कटा हुआ',
          },
          { item: 'नमक', amount: 'स्वादानुसार', unit: '', note: '' },
          { item: 'तेल', amount: '1', unit: 'टेबलस्पून', note: '' },
        ],
        steps: [
          {
            step: 1,
            text: 'पोहा को पानी से धोकर अच्छी तरह छान लें और कुछ मिनट के लिए अलग रखें।',
          },
          { step: 2, text: 'कढ़ाई में तेल गरम करें और राई व करी पत्ता डालें।' },
          { step: 3, text: 'मूंगफली डालकर हल्का सुनहरा होने तक भूनें।' },
          {
            step: 4,
            text: 'कटा हुआ प्याज और हरी मिर्च डालकर नरम होने तक भूनें।',
          },
          { step: 5, text: 'हल्दी, नमक और पोहा डालकर हल्के से मिलाएँ।' },
          {
            step: 6,
            text: '2–3 मिनट पकाएँ, फिर नींबू का रस और हरा धनिया डालें।',
          },
          { step: 7, text: 'गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_32',
    slug: 'masala-chai',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.8,
      reviews: 456,
      difficulty: 'easy',
      prepTimeMinutes: 2,
      cookTimeMinutes: 8,
      totalTimeString: '10 min',
      calories: 80,
      servings: 2,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'beverages'],
      tags: ['indian', 'beverage', 'tea', 'hot-drink', 'quick'],
      thumbnail:
        'https://t3.ftcdn.net/jpg/17/01/15/82/360_F_1701158245_Q1xE2II2mtiUjFOaQlU53Baou8AErfOE.jpg',
      images: [
        'https://t3.ftcdn.net/jpg/17/01/15/82/360_F_1701158245_Q1xE2II2mtiUjFOaQlU53Baou8AErfOE.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'dfBZ9r93qIQ',
          'hCAndap5HWs',
          '8fQAxZahx_U',
          'A3-QZnk1rdU',
          '0pgf6Hlzbpw',
          'hxGb6NjAKM',
          'wiYA7NC7FXk',
          'WMAkl6_MrMM',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Chai (Tea)',
        description:
          'A popular Indian milk tea made with black tea, milk, sugar, and aromatic spices. It is commonly enjoyed with breakfast or snacks.',
        cuisine: 'Indian',
        ingredients: [
          { item: 'Water', amount: '1', unit: 'cup', note: '' },
          { item: 'Milk', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Black tea leaves', amount: '1', unit: 'tsp', note: '' },
          {
            item: 'Sugar',
            amount: '1-2',
            unit: 'tsp',
            note: 'adjust to taste',
          },
          {
            item: 'Ginger',
            amount: '1/2',
            unit: 'tsp',
            note: 'crushed (optional)',
          },
          {
            item: 'Cardamom',
            amount: '1',
            unit: 'pcs',
            note: 'crushed (optional)',
          },
        ],
        steps: [
          { step: 1, text: 'Add water to a saucepan and bring it to a boil.' },
          {
            step: 2,
            text: 'Add crushed ginger and cardamom if using, and simmer for a minute.',
          },
          { step: 3, text: 'Add tea leaves and let it boil for 1–2 minutes.' },
          { step: 4, text: 'Pour in the milk and add sugar.' },
          {
            step: 5,
            text: 'Boil the tea for another 1–2 minutes until it becomes aromatic.',
          },
          { step: 6, text: 'Strain the tea into cups and serve hot.' },
        ],
      },
      hi: {
        title: 'चाय',
        description:
          'चाय भारत में बहुत लोकप्रिय दूध वाली चाय है जो चायपत्ती, दूध, चीनी और कभी-कभी मसालों के साथ बनाई जाती है। इसे अक्सर नाश्ते या स्नैक्स के साथ पिया जाता है।',
        cuisine: 'भारतीय',
        ingredients: [
          { item: 'पानी', amount: '1', unit: 'कप', note: '' },
          { item: 'दूध', amount: '1/2', unit: 'कप', note: '' },
          { item: 'चायपत्ती', amount: '1', unit: 'टीस्पून', note: '' },
          { item: 'चीनी', amount: '1-2', unit: 'टीस्पून', note: 'स्वादानुसार' },
          {
            item: 'अदरक',
            amount: '1/2',
            unit: 'टीस्पून',
            note: 'कुचली हुई (वैकल्पिक)',
          },
          {
            item: 'इलायची',
            amount: '1',
            unit: 'नग',
            note: 'कुचली हुई (वैकल्पिक)',
          },
        ],
        steps: [
          { step: 1, text: 'एक पैन में पानी डालकर उबाल लें।' },
          {
            step: 2,
            text: 'अगर चाहें तो अदरक और इलायची डालकर एक मिनट उबालें।',
          },
          { step: 3, text: 'चायपत्ती डालें और 1–2 मिनट तक उबलने दें।' },
          { step: 4, text: 'अब दूध और चीनी डालें।' },
          {
            step: 5,
            text: '1–2 मिनट और उबालें जब तक चाय अच्छी खुशबूदार न हो जाए।',
          },
          { step: 6, text: 'छानकर कप में डालें और गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_33',
    slug: 'scrambled-fried-eggs',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.3,
      reviews: 312,
      difficulty: 'easy',
      prepTimeMinutes: 3,
      cookTimeMinutes: 7,
      totalTimeString: '10 min',
      calories: 180,
      servings: 1,
      isVeg: false,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'continental'],
      tags: ['protein', 'quick', 'eggs', 'keto', 'high-protein'],
      thumbnail:
        'https://www.shutterstock.com/image-photo/scrambled-eggs-onion-served-bread-260nw-2725044665.jpg',
      images: [
        'https://www.shutterstock.com/image-photo/scrambled-eggs-onion-served-bread-260nw-2725044665.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'EMTCplPvF0Y',
          'lDKCse41tZY',
          'yyi55ZrpJ0E',
          'GNGGWBWkRbE',
          'b52h7kraC3A',
          '7goNbTdFwNM',
          'nA-VDufx8go',
          'KhL9c3v4bG4',
          '-OHfxqVp-Wg',
          'voUDP4rUKvQ',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Eggs (Scrambled / Fried)',
        description:
          'A quick and protein-rich breakfast made with eggs. Scrambled or fried eggs are simple to cook and are often served with toast or vegetables.',
        cuisine: 'International',
        ingredients: [
          { item: 'Eggs', amount: '2', unit: 'pcs', note: '' },
          { item: 'Butter or Oil', amount: '1', unit: 'tsp', note: '' },
          { item: 'Salt', amount: 'to taste', unit: '', note: '' },
          { item: 'Black pepper', amount: 'to taste', unit: '', note: '' },
          {
            item: 'Milk',
            amount: '2',
            unit: 'tbsp',
            note: 'optional, for scrambled eggs',
          },
          {
            item: 'Bread (toast)',
            amount: '2',
            unit: 'slices',
            note: 'optional for serving',
          },
        ],
        steps: [
          {
            step: 1,
            text: 'Heat butter or oil in a frying pan over medium heat.',
          },
          {
            step: 2,
            text: 'For fried eggs: crack the eggs directly into the pan.',
          },
          {
            step: 3,
            text: 'Cook until the egg whites are set and season with salt and pepper.',
          },
          {
            step: 4,
            text: 'For scrambled eggs: beat eggs with milk, salt, and pepper in a bowl.',
          },
          {
            step: 5,
            text: 'Pour the egg mixture into the pan and stir gently while cooking.',
          },
          { step: 6, text: 'Cook until the eggs become soft and fluffy.' },
          { step: 7, text: 'Serve hot with toast or vegetables.' },
        ],
      },
      hi: {
        title: 'अंडे (स्क्रैम्बल्ड / फ्राइड)',
        description:
          'अंडों से बना एक आसान और प्रोटीन से भरपूर नाश्ता। स्क्रैम्बल्ड या फ्राइड अंडे जल्दी बन जाते हैं और अक्सर टोस्ट या सब्जियों के साथ परोसे जाते हैं।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'अंडे', amount: '2', unit: 'नग', note: '' },
          { item: 'मक्खन या तेल', amount: '1', unit: 'टीस्पून', note: '' },
          { item: 'नमक', amount: 'स्वादानुसार', unit: '', note: '' },
          { item: 'काली मिर्च', amount: 'स्वादानुसार', unit: '', note: '' },
          {
            item: 'दूध',
            amount: '2',
            unit: 'टेबलस्पून',
            note: 'स्क्रैम्बल्ड अंडों के लिए वैकल्पिक',
          },
          {
            item: 'ब्रेड (टोस्ट)',
            amount: '2',
            unit: 'स्लाइस',
            note: 'परोसने के लिए वैकल्पिक',
          },
        ],
        steps: [
          { step: 1, text: 'एक पैन में मध्यम आंच पर मक्खन या तेल गरम करें।' },
          {
            step: 2,
            text: 'फ्राइड अंडों के लिए: अंडों को सीधे पैन में फोड़ें।',
          },
          { step: 3, text: 'जब सफेदी पक जाए तो नमक और काली मिर्च डालें।' },
          {
            step: 4,
            text: 'स्क्रैम्बल्ड अंडों के लिए: एक बाउल में अंडे, दूध, नमक और काली मिर्च फेंट लें।',
          },
          {
            step: 5,
            text: 'अंडे का मिश्रण पैन में डालें और धीरे-धीरे चलाते रहें।',
          },
          { step: 6, text: 'अंडों को नरम और फूला हुआ होने तक पकाएँ।' },
          { step: 7, text: 'गरमागरम टोस्ट या सब्जियों के साथ परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_34',
    slug: 'bacon-sausage',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.4,
      reviews: 278,
      difficulty: 'easy',
      prepTimeMinutes: 2,
      cookTimeMinutes: 10,
      totalTimeString: '12 min',
      calories: 350,
      servings: 1,
      isVeg: false,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'continental'],
      tags: ['protein', 'western', 'meat', 'quick', 'non-veg'],
      thumbnail:
        'https://thumbs.dreamstime.com/b/full-english-breakfast-fried-eggs-bacon-sausage-beans-vegetables-traditional-sunny-side-up-crispy-baked-tomatoes-salad-405683941.jpg',
      images: [
        'https://thumbs.dreamstime.com/b/full-english-breakfast-fried-eggs-bacon-sausage-beans-vegetables-traditional-sunny-side-up-crispy-baked-tomatoes-salad-405683941.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          '0gLs0-g0tSU',
          '572GRN7Mkts',
          '31cdwdpWy6g',
          'nBTBQk9L8gk',
          'x0a80Crx_CE',
          'epbMd5P3tj8',
          'vibGcqDqfc8',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Bacon or Sausage',
        description:
          'A savory and protein-rich breakfast option commonly served in Western breakfasts. Bacon or sausages are usually pan-fried and served with eggs, toast, or beans.',
        cuisine: 'International',
        ingredients: [
          {
            item: 'Bacon strips or sausages',
            amount: '2-3',
            unit: 'pcs',
            note: '',
          },
          { item: 'Oil or Butter', amount: '1', unit: 'tsp', note: 'optional' },
          {
            item: 'Black pepper',
            amount: 'to taste',
            unit: '',
            note: 'optional',
          },
          {
            item: 'Bread (toast)',
            amount: '2',
            unit: 'slices',
            note: 'optional for serving',
          },
          { item: 'Eggs', amount: '2', unit: 'pcs', note: 'optional side' },
        ],
        steps: [
          { step: 1, text: 'Heat a frying pan over medium heat.' },
          { step: 2, text: 'Place bacon strips or sausages in the pan.' },
          {
            step: 3,
            text: 'Cook for 4–6 minutes, turning occasionally until browned and crispy.',
          },
          {
            step: 4,
            text: 'Remove from the pan and place on paper towel to absorb excess oil.',
          },
          { step: 5, text: 'Season lightly with black pepper if desired.' },
          { step: 6, text: 'Serve hot with eggs, toast, or baked beans.' },
        ],
      },
      hi: {
        title: 'बेकन या सॉसेज',
        description:
          'यह पश्चिमी नाश्ते में आमतौर पर खाया जाने वाला प्रोटीन से भरपूर व्यंजन है। बेकन या सॉसेज को तवे पर तलकर अंडे, टोस्ट या बीन्स के साथ परोसा जाता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          {
            item: 'बेकन स्ट्रिप्स या सॉसेज',
            amount: '2-3',
            unit: 'नग',
            note: '',
          },
          {
            item: 'तेल या मक्खन',
            amount: '1',
            unit: 'टीस्पून',
            note: 'वैकल्पिक',
          },
          {
            item: 'काली मिर्च',
            amount: 'स्वादानुसार',
            unit: '',
            note: 'वैकल्पिक',
          },
          {
            item: 'ब्रेड (टोस्ट)',
            amount: '2',
            unit: 'स्लाइस',
            note: 'परोसने के लिए वैकल्पिक',
          },
          {
            item: 'अंडे',
            amount: '2',
            unit: 'नग',
            note: 'साथ में परोसने के लिए वैकल्पिक',
          },
        ],
        steps: [
          { step: 1, text: 'एक पैन को मध्यम आंच पर गरम करें।' },
          { step: 2, text: 'पैन में बेकन स्ट्रिप्स या सॉसेज रखें।' },
          {
            step: 3,
            text: '4–6 मिनट तक पकाएँ और बीच-बीच में पलटते रहें जब तक अच्छी तरह सुनहरे न हो जाएँ।',
          },
          {
            step: 4,
            text: 'पकने के बाद उन्हें पेपर टॉवल पर रखें ताकि अतिरिक्त तेल निकल जाए।',
          },
          { step: 5, text: 'अगर चाहें तो हल्की काली मिर्च डालें।' },
          { step: 6, text: 'गरमागरम अंडे, टोस्ट या बीन्स के साथ परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_35',
    slug: 'toast-bagels',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.0,
      reviews: 189,
      difficulty: 'easy',
      prepTimeMinutes: 2,
      cookTimeMinutes: 5,
      totalTimeString: '7 min',
      calories: 200,
      servings: 1,
      isVeg: true,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['quick', 'simple', 'bread', 'snack', 'light'],
      thumbnail:
        'https://static.vecteezy.com/system/resources/thumbnails/003/815/334/small/french-toast-on-white-plate-photo.jpg',
      images: [
        'https://static.vecteezy.com/system/resources/thumbnails/003/815/334/small/french-toast-on-white-plate-photo.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: ['hNuTM8eBgJE', 'YFoGGwCOC64', 'TQtqhRSEI_4', '9fLQHBPa3KI'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Toast / Bagels',
        description:
          'A simple and quick breakfast made by toasting bread or bagels. It is commonly served with butter, jam, cream cheese, or eggs.',
        cuisine: 'International',
        ingredients: [
          {
            item: 'Bread slices or bagels',
            amount: '2',
            unit: 'pcs',
            note: '',
          },
          { item: 'Butter', amount: '1', unit: 'tbsp', note: 'optional' },
          {
            item: 'Jam or Honey',
            amount: '1',
            unit: 'tbsp',
            note: 'optional topping',
          },
          {
            item: 'Cream cheese',
            amount: '1',
            unit: 'tbsp',
            note: 'optional for bagels',
          },
          {
            item: 'Avocado or Eggs',
            amount: '1',
            unit: 'serving',
            note: 'optional topping',
          },
        ],
        steps: [
          {
            step: 1,
            text: 'Place bread slices or bagels in a toaster or on a heated pan.',
          },
          { step: 2, text: 'Toast until golden brown and crisp.' },
          { step: 3, text: 'Spread butter while the toast is warm.' },
          { step: 4, text: 'Add jam, honey, or cream cheese if desired.' },
          { step: 5, text: 'Serve warm with coffee, tea, or eggs.' },
        ],
      },
      hi: {
        title: 'टोस्ट / बैगल',
        description:
          'एक आसान और जल्दी बनने वाला नाश्ता जिसमें ब्रेड या बैगल को टोस्ट करके मक्खन, जैम या क्रीम चीज़ के साथ परोसा जाता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'ब्रेड स्लाइस या बैगल', amount: '2', unit: 'नग', note: '' },
          { item: 'मक्खन', amount: '1', unit: 'टेबलस्पून', note: 'वैकल्पिक' },
          {
            item: 'जैम या शहद',
            amount: '1',
            unit: 'टेबलस्पून',
            note: 'वैकल्पिक',
          },
          {
            item: 'क्रीम चीज़',
            amount: '1',
            unit: 'टेबलस्पून',
            note: 'बैगल के लिए वैकल्पिक',
          },
          {
            item: 'एवोकाडो या अंडे',
            amount: '1',
            unit: 'सर्विंग',
            note: 'वैकल्पिक टॉपिंग',
          },
        ],
        steps: [
          { step: 1, text: 'ब्रेड या बैगल को टोस्टर या तवे पर रखें।' },
          { step: 2, text: 'इसे सुनहरा और कुरकुरा होने तक टोस्ट करें।' },
          { step: 3, text: 'गरम टोस्ट पर मक्खन लगाएँ।' },
          { step: 4, text: 'इच्छानुसार जैम, शहद या क्रीम चीज़ लगाएँ।' },
          { step: 5, text: 'चाय, कॉफी या अंडों के साथ गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_36',
    slug: 'fluffy-pancakes',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.6,
      reviews: 423,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      totalTimeString: '25 min',
      calories: 350,
      servings: 2,
      isVeg: true,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['sweet', 'american', 'kids-favorite', 'weekend', 'brunch'],
      thumbnail:
        'https://media.istockphoto.com/id/161170090/photo/pancakes-with-berries-and-maple-syrup.jpg?s=612x612&w=0&k=20&c=8EctScsN7q5UmxeXPNBnYN1eFmJmgmp2bE0OIq_czwM=',
      images: [
        'https://media.istockphoto.com/id/161170090/photo/pancakes-with-berries-and-maple-syrup.jpg?s=612x612&w=0&k=20&c=8EctScsN7q5UmxeXPNBnYN1eFmJmgmp2bE0OIq_czwM=',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          '9zCVCL4V8JQ',
          'Rqk6XMpzJkg',
          '3kfGNNnld-I',
          'N1T1uNmSnOk',
          'Pn15LITONhU',
          'iwxJTIxIoFo',
          'paX-zFaOFQk',
          '10uy-h2HTPs',
          'a_pxmiGcRkU',
          'oMeOPxqIiUQ',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Pancakes',
        description:
          'Soft and fluffy pancakes are a popular breakfast dish made from a simple batter and cooked on a pan. They are often served with butter, syrup, fruits, or honey.',
        cuisine: 'International',
        ingredients: [
          { item: 'All-purpose flour', amount: '1', unit: 'cup', note: '' },
          { item: 'Milk', amount: '3/4', unit: 'cup', note: '' },
          { item: 'Egg', amount: '1', unit: 'pcs', note: '' },
          { item: 'Sugar', amount: '1', unit: 'tbsp', note: '' },
          { item: 'Baking powder', amount: '1', unit: 'tsp', note: '' },
          {
            item: 'Butter or Oil',
            amount: '1',
            unit: 'tbsp',
            note: 'for cooking',
          },
          {
            item: 'Maple syrup or Honey',
            amount: 'to taste',
            unit: '',
            note: 'for serving',
          },
        ],
        steps: [
          { step: 1, text: 'In a bowl, mix flour, sugar, and baking powder.' },
          {
            step: 2,
            text: 'Add milk and egg, then whisk until the batter is smooth.',
          },
          { step: 3, text: 'Heat a lightly greased pan over medium heat.' },
          { step: 4, text: 'Pour a small amount of batter onto the pan.' },
          {
            step: 5,
            text: 'Cook until bubbles appear on the surface, then flip the pancake.',
          },
          { step: 6, text: 'Cook the other side until golden brown.' },
          { step: 7, text: 'Serve warm with butter and maple syrup or honey.' },
        ],
      },
      hi: {
        title: 'पैनकेक',
        description:
          'पैनकेक एक नरम और फूला हुआ नाश्ता है जो मैदा के घोल से तवे पर बनाया जाता है। इसे आमतौर पर मक्खन, शहद, सिरप या फलों के साथ परोसा जाता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'मैदा', amount: '1', unit: 'कप', note: '' },
          { item: 'दूध', amount: '3/4', unit: 'कप', note: '' },
          { item: 'अंडा', amount: '1', unit: 'नग', note: '' },
          { item: 'चीनी', amount: '1', unit: 'टेबलस्पून', note: '' },
          { item: 'बेकिंग पाउडर', amount: '1', unit: 'टीस्पून', note: '' },
          {
            item: 'मक्खन या तेल',
            amount: '1',
            unit: 'टेबलस्पून',
            note: 'पकाने के लिए',
          },
          {
            item: 'मेपल सिरप या शहद',
            amount: 'स्वादानुसार',
            unit: '',
            note: 'परोसने के लिए',
          },
        ],
        steps: [
          { step: 1, text: 'एक बाउल में मैदा, चीनी और बेकिंग पाउडर मिलाएँ।' },
          {
            step: 2,
            text: 'दूध और अंडा डालकर अच्छी तरह फेंटें ताकि घोल स्मूद हो जाए।',
          },
          {
            step: 3,
            text: 'मध्यम आंच पर तवा या पैन गरम करें और हल्का तेल या मक्खन लगाएँ।',
          },
          { step: 4, text: 'पैन पर थोड़ा घोल डालें।' },
          { step: 5, text: 'ऊपर बुलबुले दिखने लगें तो पैनकेक पलट दें।' },
          { step: 6, text: 'दूसरी तरफ से सुनहरा होने तक पकाएँ।' },
          { step: 7, text: 'मक्खन और शहद या सिरप के साथ गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_37',
    slug: 'hot-coffee',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.7,
      reviews: 534,
      difficulty: 'easy',
      prepTimeMinutes: 2,
      cookTimeMinutes: 5,
      totalTimeString: '7 min',
      calories: 50,
      servings: 1,
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'beverages'],
      tags: ['beverage', 'hot-drink', 'quick', 'caffeine', 'morning'],
      thumbnail:
        'https://media.istockphoto.com/id/1177900338/photo/cup-of-espresso-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=5cAWrCndkNTzBkcFKFqEn3eXvEwBT30uMRkSogaH-oY=',
      images: [
        'https://media.istockphoto.com/id/1177900338/photo/cup-of-espresso-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=5cAWrCndkNTzBkcFKFqEn3eXvEwBT30uMRkSogaH-oY=',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'sE81MU3icfU',
          '9TiRb0e6Kl8',
          'kLcEzqZDLfs',
          '3zBcpK52ZSM',
          'kKkwkWCeHAY',
          'J_YVRNVwhiU',
          'PbKmZwniSF4',
          'Ly84ggFNTv4',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Coffee',
        description:
          'A popular hot beverage made from roasted coffee beans. Coffee is commonly enjoyed at breakfast and can be served black or with milk and sugar.',
        cuisine: 'International',
        ingredients: [
          { item: 'Water', amount: '1', unit: 'cup', note: '' },
          { item: 'Coffee powder', amount: '1-2', unit: 'tsp', note: '' },
          { item: 'Milk', amount: '1/4', unit: 'cup', note: 'optional' },
          { item: 'Sugar', amount: 'to taste', unit: '', note: 'optional' },
        ],
        steps: [
          { step: 1, text: 'Boil water in a saucepan or kettle.' },
          { step: 2, text: 'Add coffee powder to a cup.' },
          { step: 3, text: 'Pour hot water over the coffee powder.' },
          { step: 4, text: 'Add sugar and stir well.' },
          { step: 5, text: 'Add milk if desired and mix.' },
          { step: 6, text: 'Serve hot.' },
        ],
      },
      hi: {
        title: 'कॉफी',
        description:
          'कॉफी भुनी हुई कॉफी बीन्स से बनने वाला एक लोकप्रिय गर्म पेय है। इसे अक्सर नाश्ते के साथ पिया जाता है और इसे दूध व चीनी के साथ या बिना भी बनाया जा सकता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'पानी', amount: '1', unit: 'कप', note: '' },
          { item: 'कॉफी पाउडर', amount: '1-2', unit: 'टीस्पून', note: '' },
          { item: 'दूध', amount: '1/4', unit: 'कप', note: 'वैकल्पिक' },
          { item: 'चीनी', amount: 'स्वादानुसार', unit: '', note: 'वैकल्पिक' },
        ],
        steps: [
          { step: 1, text: 'पानी को एक पैन या केतली में उबालें।' },
          { step: 2, text: 'एक कप में कॉफी पाउडर डालें।' },
          { step: 3, text: 'कॉफी पाउडर पर गर्म पानी डालें।' },
          { step: 4, text: 'चीनी डालकर अच्छी तरह मिलाएँ।' },
          { step: 5, text: 'यदि चाहें तो दूध डालकर मिलाएँ।' },
          { step: 6, text: 'गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_38',
    slug: 'steamed-rice',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.2,
      reviews: 198,
      difficulty: 'easy',
      prepTimeMinutes: 5,
      cookTimeMinutes: 15,
      totalTimeString: '20 min',
      calories: 200,
      servings: 2,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'japanese'],
      tags: ['japanese', 'staple', 'simple', 'healthy', 'base'],
      thumbnail:
        'https://res.cloudinary.com/anova-applied-electronics/image/upload/w_567,h_567,c_fill,f_auto,q_auto,dpr_auto,/v1594684608/mobileProduction/o7jayxyiqee6j6l7otfl.jpg',
      images: [
        'https://res.cloudinary.com/anova-applied-electronics/image/upload/w_567,h_567,c_fill,f_auto,q_auto,dpr_auto,/v1594684608/mobileProduction/o7jayxyiqee6j6l7otfl.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'fcqi9meOwJQ',
          'jLBaScAQa0E',
          'THxUIqQQrYM',
          'vaYEJPxwZt0',
          'XAhrjT208lo',
          'hnkVNVH3XzE',
          'sv9ayheTsA0',
          '196q4mxbjWY',
          'aTgTXyD8s1s',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Steamed Rice',
        description:
          'A staple food in many Asian cuisines, especially in Japan. Steamed rice is soft, fluffy, and commonly served as part of a traditional breakfast with soup, fish, or vegetables.',
        cuisine: 'Japanese',
        ingredients: [
          { item: 'Short-grain rice', amount: '1', unit: 'cup', note: '' },
          { item: 'Water', amount: '1.5', unit: 'cups', note: '' },
        ],
        steps: [
          {
            step: 1,
            text: 'Rinse the rice in cold water until the water runs clear.',
          },
          { step: 2, text: 'Add rice and water to a pot or rice cooker.' },
          { step: 3, text: 'Cook until the rice becomes soft and fluffy.' },
          { step: 4, text: 'Let the rice rest for 5 minutes before serving.' },
          { step: 5, text: 'Serve warm.' },
        ],
      },
      hi: {
        title: 'स्टीम्ड राइस',
        description:
          'स्टीम्ड राइस एशियाई देशों में एक मुख्य भोजन है, खासकर जापान में। इसे अक्सर सूप, मछली या सब्जियों के साथ परोसा जाता है।',
        cuisine: 'जापानी',
        ingredients: [
          { item: 'छोटे दाने वाला चावल', amount: '1', unit: 'कप', note: '' },
          { item: 'पानी', amount: '1.5', unit: 'कप', note: '' },
        ],
        steps: [
          {
            step: 1,
            text: 'चावल को ठंडे पानी से धोएँ जब तक पानी साफ न हो जाए।',
          },
          { step: 2, text: 'चावल और पानी को बर्तन या राइस कुकर में डालें।' },
          { step: 3, text: 'चावल नरम और फूला हुआ होने तक पकाएँ।' },
          { step: 4, text: 'परोसने से पहले 5 मिनट के लिए ढककर रखें।' },
          { step: 5, text: 'गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_39',
    slug: 'miso-soup',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 287,
      difficulty: 'easy',
      prepTimeMinutes: 5,
      cookTimeMinutes: 10,
      totalTimeString: '15 min',
      calories: 60,
      servings: 2,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'japanese'],
      tags: ['japanese', 'soup', 'healthy', 'warm', 'light'],
      thumbnail:
        'https://img.freepik.com/free-photo/steaming-bowl-miso-soup-with-tofu-green-onions-black-background_9975-124512.jpg',
      images: [
        'https://img.freepik.com/free-photo/steaming-bowl-miso-soup-with-tofu-green-onions-black-background_9975-124512.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'v4aXJsfl_Ss',
          'wshf6yZbhwk',
          '1T73y_yPYCI',
          'topOXVCAY6c',
          'dXc8e0KStRg',
          'uv-4hMPjmtQ',
          '_VRcHQGmRdM',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Miso Soup',
        description:
          'A traditional Japanese soup made with miso paste, tofu, and seaweed. It is a common part of Japanese breakfasts.',
        cuisine: 'Japanese',
        ingredients: [
          { item: 'Water', amount: '2', unit: 'cups', note: '' },
          { item: 'Miso paste', amount: '1', unit: 'tbsp', note: '' },
          { item: 'Tofu', amount: '50', unit: 'g', note: 'cubed' },
          { item: 'Seaweed (wakame)', amount: '1', unit: 'tsp', note: 'dried' },
          { item: 'Green onions', amount: '1', unit: 'tbsp', note: 'chopped' },
        ],
        steps: [
          { step: 1, text: 'Heat water in a saucepan.' },
          { step: 2, text: 'Add tofu and seaweed and simmer gently.' },
          {
            step: 3,
            text: 'Dissolve miso paste in a small amount of hot water.',
          },
          { step: 4, text: 'Add the miso mixture to the soup and stir.' },
          {
            step: 5,
            text: 'Garnish with chopped green onions and serve warm.',
          },
        ],
      },
      hi: {
        title: 'मिसो सूप',
        description:
          'मिसो सूप जापान का एक पारंपरिक सूप है जो मिसो पेस्ट, टोफू और समुद्री घास से बनाया जाता है।',
        cuisine: 'जापानी',
        ingredients: [
          { item: 'पानी', amount: '2', unit: 'कप', note: '' },
          { item: 'मिसो पेस्ट', amount: '1', unit: 'टेबलस्पून', note: '' },
          {
            item: 'टोफू',
            amount: '50',
            unit: 'ग्राम',
            note: 'टुकड़ों में कटा',
          },
          {
            item: 'समुद्री घास (वाकामे)',
            amount: '1',
            unit: 'टीस्पून',
            note: '',
          },
          {
            item: 'हरी प्याज',
            amount: '1',
            unit: 'टेबलस्पून',
            note: 'कटी हुई',
          },
        ],
        steps: [
          { step: 1, text: 'एक पैन में पानी गरम करें।' },
          { step: 2, text: 'टोफू और समुद्री घास डालकर हल्का उबालें।' },
          { step: 3, text: 'थोड़े गरम पानी में मिसो पेस्ट घोलें।' },
          { step: 4, text: 'इसे सूप में डालकर मिलाएँ।' },
          { step: 5, text: 'ऊपर से हरी प्याज डालकर गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_40',
    slug: 'grilled-salmon',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.6,
      reviews: 345,
      difficulty: 'medium',
      prepTimeMinutes: 5,
      cookTimeMinutes: 12,
      totalTimeString: '17 min',
      calories: 280,
      servings: 1,
      isVeg: false,
      isVegan: false,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'japanese'],
      tags: ['japanese', 'fish', 'protein', 'healthy', 'omega3'],
      thumbnail:
        'https://t4.ftcdn.net/jpg/01/57/58/09/360_F_157580962_PGzcBcdxp2I16PM0iYZVfaY0l9BpJu7Z.jpg',
      images: [
        'https://t4.ftcdn.net/jpg/01/57/58/09/360_F_157580962_PGzcBcdxp2I16PM0iYZVfaY0l9BpJu7Z.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'w1kpJIQ9r70',
          'BIjZ5TpCo78',
          'bbTWSF87jMw',
          'XdzNyQlMEqU',
          'RxD60-ygBJY',
          '-x2E7T3-r7k',
          'j7BkpjD-HZ0',
          'grG6c3eNWyQ',
          'TwTECqKNNmc',
          'Mk4_v0AKR7o',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Grilled Fish (Salmon)',
        description:
          'A classic Japanese breakfast dish where salmon is lightly seasoned and grilled until tender and flavorful.',
        cuisine: 'Japanese',
        ingredients: [
          { item: 'Salmon fillet', amount: '1', unit: 'pcs', note: '' },
          { item: 'Salt', amount: 'to taste', unit: '', note: '' },
          { item: 'Lemon', amount: '1', unit: 'slice', note: 'optional' },
        ],
        steps: [
          { step: 1, text: 'Season the salmon with salt.' },
          { step: 2, text: 'Heat a grill or pan over medium heat.' },
          {
            step: 3,
            text: 'Place salmon on the grill and cook for 4–5 minutes.',
          },
          { step: 4, text: 'Flip and cook the other side until done.' },
          { step: 5, text: 'Serve hot with lemon.' },
        ],
      },
      hi: {
        title: 'ग्रिल्ड मछली (सैल्मन)',
        description:
          'जापानी नाश्ते का एक पारंपरिक व्यंजन जिसमें सैल्मन मछली को हल्का नमक लगाकर ग्रिल किया जाता है।',
        cuisine: 'जापानी',
        ingredients: [
          { item: 'सैल्मन फिलेट', amount: '1', unit: 'नग', note: '' },
          { item: 'नमक', amount: 'स्वादानुसार', unit: '', note: '' },
          { item: 'नींबू', amount: '1', unit: 'स्लाइस', note: 'वैकल्पिक' },
        ],
        steps: [
          { step: 1, text: 'मछली पर हल्का नमक लगाएँ।' },
          { step: 2, text: 'ग्रिल या पैन को मध्यम आंच पर गरम करें।' },
          { step: 3, text: 'मछली को 4–5 मिनट तक पकाएँ।' },
          { step: 4, text: 'पलटकर दूसरी तरफ से भी पकाएँ।' },
          { step: 5, text: 'नींबू के साथ गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_41',
    slug: 'pickled-vegetables',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.1,
      reviews: 156,
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 0,
      totalTimeString: '40 min',
      calories: 30,
      servings: 4,
      isVeg: true,
      isVegan: true,
      isGlutenFree: true,
      categoryIds: ['breakfast', 'japanese'],
      tags: ['japanese', 'side-dish', 'healthy', 'tangy', 'fermented'],
      thumbnail:
        'https://www.liveeatlearn.com/wp-content/uploads/2020/04/Pickled-Veggies_Photos_v1_Fullsize_08-480x270.jpg',
      images: [
        'https://www.liveeatlearn.com/wp-content/uploads/2020/04/Pickled-Veggies_Photos_v1_Fullsize_08-480x270.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          '3PvMdbmf55Q',
          '4irTe8S81Dk',
          'a9DDPzRCdvU',
          'c-lgXP6BMCk',
          'UY-Ra48-ERs',
          'svbZFrCrTyI',
          'LsNoBkNXFu0',
          'HJQNJER1J5M',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Pickled Vegetables',
        description:
          'Pickled vegetables are commonly served in Japanese meals to add a tangy and refreshing flavor.',
        cuisine: 'Japanese',
        ingredients: [
          { item: 'Cucumber', amount: '1', unit: 'pcs', note: 'sliced' },
          { item: 'Salt', amount: '1', unit: 'tsp', note: '' },
          { item: 'Rice vinegar', amount: '1', unit: 'tbsp', note: '' },
          { item: 'Sugar', amount: '1', unit: 'tsp', note: '' },
        ],
        steps: [
          { step: 1, text: 'Slice the vegetables thinly.' },
          { step: 2, text: 'Mix vinegar, salt, and sugar in a bowl.' },
          { step: 3, text: 'Add vegetables and mix well.' },
          { step: 4, text: 'Let them marinate for 20–30 minutes.' },
          { step: 5, text: 'Serve chilled or at room temperature.' },
        ],
      },
      hi: {
        title: 'अचार वाली सब्जियाँ',
        description:
          'जापानी भोजन में खट्टी और ताज़गी भरी स्वाद के लिए अचार वाली सब्जियाँ परोसी जाती हैं।',
        cuisine: 'जापानी',
        ingredients: [
          { item: 'खीरा', amount: '1', unit: 'नग', note: 'पतले स्लाइस' },
          { item: 'नमक', amount: '1', unit: 'टीस्पून', note: '' },
          { item: 'राइस विनेगर', amount: '1', unit: 'टेबलस्पून', note: '' },
          { item: 'चीनी', amount: '1', unit: 'टीस्पून', note: '' },
        ],
        steps: [
          { step: 1, text: 'सब्जियों को पतले स्लाइस में काटें।' },
          { step: 2, text: 'एक बाउल में विनेगर, नमक और चीनी मिलाएँ।' },
          { step: 3, text: 'सब्जियाँ डालकर अच्छी तरह मिलाएँ।' },
          { step: 4, text: '20–30 मिनट के लिए छोड़ दें।' },
          { step: 5, text: 'ठंडा या सामान्य तापमान पर परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_42',
    slug: 'natto',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 3.8,
      reviews: 98,
      difficulty: 'easy',
      prepTimeMinutes: 2,
      cookTimeMinutes: 0,
      totalTimeString: '5 min',
      calories: 100,
      servings: 1,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'japanese'],
      tags: ['japanese', 'fermented', 'protein', 'probiotic', 'healthy'],
      thumbnail:
        'https://thumbs.dreamstime.com/b/natto-fermented-soybean-traditional-japanese-food-healthy-eating-gut-health-411414077.jpg',
      images: [
        'https://thumbs.dreamstime.com/b/natto-fermented-soybean-traditional-japanese-food-healthy-eating-gut-health-411414077.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: ['HQH1J4t6dOw', 'maxkUd52LbY', 'd_MoecaUnB4', '4wpABueCvLg'],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Natto (Fermented Soybeans)',
        description:
          'Natto is a traditional Japanese food made from fermented soybeans. It is rich in protein and probiotics.',
        cuisine: 'Japanese',
        ingredients: [
          {
            item: 'Natto (fermented soybeans)',
            amount: '1',
            unit: 'pack',
            note: '',
          },
          { item: 'Soy sauce', amount: '1', unit: 'tsp', note: 'optional' },
          { item: 'Mustard', amount: '1/2', unit: 'tsp', note: 'optional' },
          { item: 'Green onions', amount: '1', unit: 'tbsp', note: 'chopped' },
        ],
        steps: [
          { step: 1, text: 'Open the natto package and place it in a bowl.' },
          { step: 2, text: 'Add soy sauce and mustard if desired.' },
          { step: 3, text: 'Mix thoroughly until it becomes sticky.' },
          { step: 4, text: 'Top with chopped green onions.' },
          { step: 5, text: 'Serve with steamed rice.' },
        ],
      },
      hi: {
        title: 'नाटो (फर्मेंटेड सोयाबीन)',
        description:
          'नाटो जापान का पारंपरिक भोजन है जो किण्वित सोयाबीन से बनाया जाता है और प्रोटीन से भरपूर होता है।',
        cuisine: 'जापानी',
        ingredients: [
          {
            item: 'नाटो (किण्वित सोयाबीन)',
            amount: '1',
            unit: 'पैक',
            note: '',
          },
          { item: 'सोया सॉस', amount: '1', unit: 'टीस्पून', note: 'वैकल्पिक' },
          { item: 'सरसों', amount: '1/2', unit: 'टीस्पून', note: 'वैकल्पिक' },
          {
            item: 'हरी प्याज',
            amount: '1',
            unit: 'टेबलस्पून',
            note: 'कटी हुई',
          },
        ],
        steps: [
          { step: 1, text: 'नाटो पैक खोलकर एक बाउल में डालें।' },
          { step: 2, text: 'सोया सॉस और सरसों डालें।' },
          { step: 3, text: 'अच्छी तरह मिलाएँ जब तक चिपचिपा न हो जाए।' },
          { step: 4, text: 'ऊपर से हरी प्याज डालें।' },
          { step: 5, text: 'स्टीम्ड राइस के साथ परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_43',
    slug: 'full-english-breakfast',
    isActive: true,
    isPremium: true,
    meta: {
      rating: 4.7,
      reviews: 389,
      difficulty: 'medium',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      totalTimeString: '30 min',
      calories: 650,
      servings: 1,
      isVeg: false,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['english', 'hearty', 'protein', 'weekend', 'brunch'],
      thumbnail:
        'https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Full-English-Breakfast.jpg',
      images: [
        'https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Full-English-Breakfast.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          '5wi_mhjjSp0',
          'atZv0KZwLoc',
          'rVnLCPJYEK4',
          'itRfVfIidXQ',
          'UKi0LTtSzxU',
          'nOpV4UnPebo',
          '8KI8lN_he0A',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Full English Breakfast',
        description:
          'A traditional British breakfast consisting of eggs, bacon, sausages, baked beans, toast, and grilled tomatoes.',
        cuisine: 'British',
        ingredients: [
          { item: 'Eggs', amount: '2', unit: 'pcs', note: '' },
          { item: 'Bacon strips', amount: '2', unit: 'pcs', note: '' },
          { item: 'Sausages', amount: '2', unit: 'pcs', note: '' },
          { item: 'Baked beans', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Toast', amount: '2', unit: 'slices', note: '' },
          { item: 'Tomato', amount: '1', unit: 'pcs', note: 'halved' },
          { item: 'Mushrooms', amount: '4', unit: 'pcs', note: 'optional' },
          { item: 'Butter', amount: '1', unit: 'tbsp', note: '' },
        ],
        steps: [
          { step: 1, text: 'Heat a large pan and cook the sausages first.' },
          { step: 2, text: 'Add bacon strips and cook until crispy.' },
          { step: 3, text: 'Push aside and fry the eggs in the same pan.' },
          { step: 4, text: 'Grill or pan-fry the tomato halves.' },
          { step: 5, text: 'Heat the baked beans in a small pot.' },
          { step: 6, text: 'Toast the bread and spread with butter.' },
          { step: 7, text: 'Arrange everything on a plate and serve hot.' },
        ],
      },
      hi: {
        title: 'फुल इंग्लिश ब्रेकफास्ट',
        description:
          'एक पारंपरिक ब्रिटिश नाश्ता जिसमें अंडे, बेकन, सॉसेज, बेक्ड बीन्स, टोस्ट और ग्रिल्ड टमाटर होते हैं।',
        cuisine: 'ब्रिटिश',
        ingredients: [
          { item: 'अंडे', amount: '2', unit: 'नग', note: '' },
          { item: 'बेकन स्ट्रिप्स', amount: '2', unit: 'नग', note: '' },
          { item: 'सॉसेज', amount: '2', unit: 'नग', note: '' },
          { item: 'बेक्ड बीन्स', amount: '1/2', unit: 'कप', note: '' },
          { item: 'टोस्ट', amount: '2', unit: 'स्लाइस', note: '' },
          { item: 'टमाटर', amount: '1', unit: 'नग', note: 'आधा कटा हुआ' },
          { item: 'मशरूम', amount: '4', unit: 'नग', note: 'वैकल्पिक' },
          { item: 'मक्खन', amount: '1', unit: 'टेबलस्पून', note: '' },
        ],
        steps: [
          { step: 1, text: 'एक बड़े पैन में सबसे पहले सॉसेज पकाएँ।' },
          { step: 2, text: 'बेकन डालें और कुरकुरा होने तक पकाएँ।' },
          { step: 3, text: 'साइड में करके उसी पैन में अंडे फ्राई करें।' },
          { step: 4, text: 'टमाटर को ग्रिल या पैन में पकाएँ।' },
          { step: 5, text: 'बेक्ड बीन्स को एक छोटे बर्तन में गरम करें।' },
          { step: 6, text: 'ब्रेड को टोस्ट करें और मक्खन लगाएँ।' },
          { step: 7, text: 'सब कुछ प्लेट में सजाकर गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_44',
    slug: 'avocado-toast',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 412,
      difficulty: 'easy',
      prepTimeMinutes: 5,
      cookTimeMinutes: 5,
      totalTimeString: '10 min',
      calories: 220,
      servings: 1,
      isVeg: true,
      isVegan: true,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['healthy', 'trendy', 'quick', 'brunch', 'fiber'],
      thumbnail:
        'https://img.freepik.com/free-photo/avocado-open-toast-with-avocado-slices-lemon-flax-seeds-sesame-seeds-black-bread-slices-top-view_2831-797.jpg',
      images: [
        'https://img.freepik.com/free-photo/avocado-open-toast-with-avocado-slices-lemon-flax-seeds-sesame-seeds-black-bread-slices-top-view_2831-797.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'vW9D_vnKzMs',
          'dP6btliLGy4',
          '2Ee9jFxJikA',
          '0R5km8AQGlI',
          'iS-nRFsWKzk',
          'zZuH1Lz7nBQ',
          'juTWYrfPbYA',
          'AT5Rm60i81o',
          'Rh4EI4luKAQ',
          '28GCv_C-SVI',
          'N3WK8sjWNWQ',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Avocado Toast',
        description:
          'A healthy and popular breakfast made with mashed avocado spread over toasted bread, often topped with eggs, seeds, or vegetables.',
        cuisine: 'International',
        ingredients: [
          { item: 'Bread slices', amount: '2', unit: 'pcs', note: 'toasted' },
          { item: 'Avocado', amount: '1', unit: 'pcs', note: 'ripe' },
          { item: 'Lemon juice', amount: '1', unit: 'tsp', note: '' },
          { item: 'Salt', amount: 'to taste', unit: '', note: '' },
          { item: 'Black pepper', amount: 'to taste', unit: '', note: '' },
          { item: 'Olive oil', amount: '1', unit: 'tsp', note: 'optional' },
        ],
        steps: [
          { step: 1, text: 'Toast the bread slices until golden brown.' },
          { step: 2, text: 'Mash the avocado in a bowl.' },
          { step: 3, text: 'Add lemon juice, salt, and black pepper.' },
          { step: 4, text: 'Spread the avocado mixture on the toast.' },
          { step: 5, text: 'Drizzle olive oil and serve immediately.' },
        ],
      },
      hi: {
        title: 'एवोकाडो टोस्ट',
        description:
          'एवोकाडो टोस्ट एक हेल्दी और लोकप्रिय नाश्ता है जिसमें टोस्टेड ब्रेड पर मसला हुआ एवोकाडो लगाया जाता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'ब्रेड स्लाइस', amount: '2', unit: 'नग', note: 'टोस्टेड' },
          { item: 'एवोकाडो', amount: '1', unit: 'नग', note: 'पका हुआ' },
          { item: 'नींबू का रस', amount: '1', unit: 'टीस्पून', note: '' },
          { item: 'नमक', amount: 'स्वादानुसार', unit: '', note: '' },
          { item: 'काली मिर्च', amount: 'स्वादानुसार', unit: '', note: '' },
          { item: 'ऑलिव ऑयल', amount: '1', unit: 'टीस्पून', note: 'वैकल्पिक' },
        ],
        steps: [
          { step: 1, text: 'ब्रेड को सुनहरा होने तक टोस्ट करें।' },
          { step: 2, text: 'एवोकाडो को बाउल में मैश करें।' },
          { step: 3, text: 'नींबू का रस, नमक और काली मिर्च मिलाएँ।' },
          { step: 4, text: 'इस मिश्रण को टोस्ट पर फैलाएँ।' },
          { step: 5, text: 'ऊपर से ऑलिव ऑयल डालकर परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_45',
    slug: 'oatmeal',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.4,
      reviews: 298,
      difficulty: 'easy',
      prepTimeMinutes: 2,
      cookTimeMinutes: 8,
      totalTimeString: '10 min',
      calories: 180,
      servings: 1,
      isVeg: true,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['healthy', 'fiber', 'warm', 'customizable', 'filling'],
      thumbnail:
        'https://img.freepik.com/free-photo/oatmeal-porridge-with-raspberries-blueberries-almonds-bowl-wooden-table_123827-32361.jpg',
      images: [
        'https://img.freepik.com/free-photo/oatmeal-porridge-with-raspberries-blueberries-almonds-bowl-wooden-table_123827-32361.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'VZOHHCosuzY',
          '6wShR0o9qDc',
          'ywkEGKXk2cQ',
          '3dyy1SyKwCE',
          'hgYXCs_8Eqs',
          'QCWDY80L6-w',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'Oatmeal',
        description:
          'A nutritious breakfast made by cooking oats with milk or water, often topped with fruits, honey, or nuts.',
        cuisine: 'International',
        ingredients: [
          { item: 'Rolled oats', amount: '1/2', unit: 'cup', note: '' },
          { item: 'Milk or Water', amount: '1', unit: 'cup', note: '' },
          { item: 'Honey', amount: '1', unit: 'tsp', note: 'optional' },
          {
            item: 'Fruits',
            amount: '2',
            unit: 'tbsp',
            note: 'optional topping',
          },
          { item: 'Nuts', amount: '1', unit: 'tbsp', note: 'optional' },
        ],
        steps: [
          { step: 1, text: 'Heat milk or water in a saucepan.' },
          { step: 2, text: 'Add oats and cook on low heat.' },
          { step: 3, text: 'Stir occasionally until thick.' },
          { step: 4, text: 'Add honey, fruits, or nuts.' },
          { step: 5, text: 'Serve warm.' },
        ],
      },
      hi: {
        title: 'ओटमील',
        description:
          'ओटमील एक पौष्टिक नाश्ता है जिसे ओट्स को दूध या पानी में पकाकर बनाया जाता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'ओट्स', amount: '1/2', unit: 'कप', note: '' },
          { item: 'दूध या पानी', amount: '1', unit: 'कप', note: '' },
          { item: 'शहद', amount: '1', unit: 'टीस्पून', note: 'वैकल्पिक' },
          { item: 'फल', amount: '2', unit: 'टेबलस्पून', note: 'वैकल्पिक' },
        ],
        steps: [
          { step: 1, text: 'पैन में दूध या पानी गरम करें।' },
          { step: 2, text: 'ओट्स डालकर धीमी आंच पर पकाएँ।' },
          { step: 3, text: 'गाढ़ा होने तक चलाते रहें।' },
          { step: 4, text: 'ऊपर से फल या शहद डालें।' },
          { step: 5, text: 'गरमागरम परोसें।' },
        ],
      },
    },
  },

  {
    id: 'recipe_46',
    slug: 'french-toast',
    isActive: true,
    isPremium: false,
    meta: {
      rating: 4.5,
      reviews: 367,
      difficulty: 'easy',
      prepTimeMinutes: 5,
      cookTimeMinutes: 10,
      totalTimeString: '15 min',
      calories: 280,
      servings: 2,
      isVeg: true,
      isVegan: false,
      isGlutenFree: false,
      categoryIds: ['breakfast', 'continental'],
      tags: ['sweet', 'brunch', 'kids-favorite', 'classic', 'weekend'],
      thumbnail:
        'https://t3.ftcdn.net/jpg/03/40/17/52/360_F_340175247_nqfs85ZGS2MPTovBIVuiFBdPyUUW9FJm.jpg',
      images: [
        'https://t3.ftcdn.net/jpg/03/40/17/52/360_F_340175247_nqfs85ZGS2MPTovBIVuiFBdPyUUW9FJm.jpg',
      ],
      video: {
        id: 'duoVN7_uRFI',
        platform: 'youtube',
        playlist: [
          'sdgroNuyKdI',
          '4uFHkuJnc08',
          'r1ZLSbQ0r0I',
          '6Z0N1Tr_gzQ',
          'Z9JEIIQDdEg',
          'Km7KRbKVu88',
          'UPz7aUqELXk',
          'cndhV2W3IgQ',
          'zgr7JZqNKsY',
        ],
      },
      authorId: 'admin',
    },
    content: {
      en: {
        title: 'French Toast',
        description:
          'A sweet breakfast dish made by dipping bread in an egg mixture and frying it until golden brown.',
        cuisine: 'International',
        ingredients: [
          { item: 'Bread slices', amount: '2', unit: 'pcs', note: '' },
          { item: 'Egg', amount: '1', unit: 'pcs', note: '' },
          { item: 'Milk', amount: '2', unit: 'tbsp', note: '' },
          { item: 'Sugar', amount: '1', unit: 'tsp', note: '' },
          { item: 'Butter', amount: '1', unit: 'tsp', note: 'for cooking' },
        ],
        steps: [
          { step: 1, text: 'Whisk egg, milk, and sugar in a bowl.' },
          { step: 2, text: 'Dip bread slices in the mixture.' },
          { step: 3, text: 'Heat butter in a pan.' },
          { step: 4, text: 'Cook bread until golden brown on both sides.' },
          { step: 5, text: 'Serve with honey or syrup.' },
        ],
      },
      hi: {
        title: 'फ्रेंच टोस्ट',
        description:
          'फ्रेंच टोस्ट एक मीठा नाश्ता है जिसमें ब्रेड को अंडे के घोल में डुबोकर तवे पर पकाया जाता है।',
        cuisine: 'अंतरराष्ट्रीय',
        ingredients: [
          { item: 'ब्रेड स्लाइस', amount: '2', unit: 'नग', note: '' },
          { item: 'अंडा', amount: '1', unit: 'नग', note: '' },
          { item: 'दूध', amount: '2', unit: 'टेबलस्पून', note: '' },
          { item: 'चीनी', amount: '1', unit: 'टीस्पून', note: '' },
          { item: 'मक्खन', amount: '1', unit: 'टीस्पून', note: '' },
        ],
        steps: [
          { step: 1, text: 'अंडा, दूध और चीनी को फेंटें।' },
          { step: 2, text: 'ब्रेड को मिश्रण में डुबोएँ।' },
          { step: 3, text: 'पैन में मक्खन गरम करें।' },
          { step: 4, text: 'ब्रेड को दोनों तरफ से सुनहरा होने तक पकाएँ।' },
          { step: 5, text: 'शहद या सिरप के साथ परोसें।' },
        ],
      },
    },
  },
];

export default recipes;
