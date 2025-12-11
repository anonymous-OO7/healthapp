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
];

export default recipes;
