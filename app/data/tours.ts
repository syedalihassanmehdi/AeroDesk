export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface TourData {
  id: string
  slug: string
  title: string
  destination: string
  country: string
  price: number
  duration: string
  groupSize: string
  difficulty: string
  image: string
  gallery: string[]
  whatsapp_message: string
  description: string
  highlights: string[]
  overview: string
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  policy: {
    cancellation: string
    payment: string
    childPolicy: string
    healthRequirements: string
  }
}

export const TOURS: TourData[] = [
  {
    id: '1',
    slug: 'dubai-desert-oasis',
    title: 'Dubai Desert Oasis',
    destination: 'Dubai',
    country: 'UAE',
    price: 3200,
    duration: '7 Days',
    groupSize: 'Max 12',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    ],
    whatsapp_message: "Hi! I'm interested in the Dubai Desert Oasis tour (7 days, from $3,200/person). Could you share availability and details?",
    description: 'A seamless fusion of ancient desert mystique and hyper-modern luxury.',
    highlights: ['Desert Safari', 'Burj Khalifa', 'Gold Souk', 'Yacht Charter', 'Dune Dinner'],
    overview:
      "Experience the duality of Dubai — where the world's most ambitious skyline meets endless golden desert. This seven-day curated journey takes you from the heights of the Burj Khalifa to the silence of the Rub' al Khali, with private yacht charters, exclusive souks, and a candlelit dinner under the stars on the dunes. Every detail is arranged, every moment is yours.",
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Downtown Immersion',
        description: 'Private airport transfer to your suite at the Armani Hotel. Evening stroll through Downtown Dubai.',
        activities: ['Private airport pickup', 'Armani Hotel check-in', 'Burj Khalifa At The Top (sunset)', 'Dinner at Atmosphere'],
      },
      {
        day: 2,
        title: 'The Golden Souk & Waterways',
        description: 'Explore the historic gold and spice souks before an Abra ride across the Dubai Creek.',
        activities: ['Gold & Spice Souk tour', 'Traditional Abra crossing', 'Al Fahidi Historic District', 'Rooftop lunch at Arabian Tea House'],
      },
      {
        day: 3,
        title: 'Desert Symphony',
        description: 'A full day immersed in the Rub\' al Khali — the Empty Quarter. Private dune drive and overnight camp.',
        activities: ['Private 4x4 desert drive', 'Falconry demonstration', 'Camel trek at golden hour', 'Candlelit dune dinner under stars'],
      },
      {
        day: 4,
        title: 'Arabian Gulf by Yacht',
        description: 'A private yacht charter along the iconic Palm Jumeirah coastline.',
        activities: ['Full-day private yacht', 'Snorkeling in the Gulf', 'Onboard gourmet lunch', 'Marina evening walk'],
      },
      {
        day: 5,
        title: 'Cultural Immersion',
        description: 'Visit the Sheikh Zayed Grand Mosque in Abu Dhabi — a two-hour drive of pure grandeur.',
        activities: ['Sheikh Zayed Mosque guided tour', 'Louvre Abu Dhabi', 'Date market visit', 'Return to Dubai'],
      },
      {
        day: 6,
        title: 'Leisure & Shopping',
        description: 'A free morning followed by curated shopping at the Dubai Mall and DIFC galleries.',
        activities: ['Dubai Mall private shopping guide', 'Dubai Aquarium (optional)', 'DIFC gallery walk', 'Farewell dinner at Nobu'],
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Late checkout and private airport transfer.',
        activities: ['Late checkout 12PM', 'Optional spa morning', 'Private airport transfer'],
      },
    ],
    inclusions: [
      '6 nights in 5-star accommodation',
      'All private airport transfers',
      'Daily breakfast + 4 dinners',
      'Full-day private desert experience',
      'Private yacht charter (Day 4)',
      'Abu Dhabi day tour with guide',
      'Burj Khalifa At The Top tickets',
      'Dedicated personal travel consultant',
      '24/7 on-ground support',
    ],
    exclusions: [
      'International flights',
      'UAE visa fees',
      'Personal shopping',
      'Alcoholic beverages',
      'Travel insurance',
      'Lunches not specified',
      'Optional activities not listed',
    ],
    policy: {
      cancellation:
        'Full refund if cancelled 30+ days before departure. 50% refund for cancellations 15–29 days prior. No refund within 14 days of departure.',
      payment:
        '30% deposit required to confirm booking. Remaining 70% due 30 days before departure. We accept bank transfer, major credit cards, and crypto (BTC/USDT).',
      childPolicy:
        'Children aged 12+ are welcome on this tour. A dedicated child rate (25% discount) applies for ages 12–17 sharing with two adults.',
      healthRequirements:
        'This is an easy-rated tour suitable for most fitness levels. Desert activities require comfortable walking shoes. Please inform us of any health conditions or dietary requirements at booking.',
    },
  },
  {
    id: '2',
    slug: 'sacred-bali-retreat',
    title: 'Sacred Bali Retreat',
    destination: 'Bali',
    country: 'Indonesia',
    price: 2400,
    duration: '10 Days',
    groupSize: 'Max 8',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
      'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80',
    ],
    whatsapp_message: "Hi! I'm interested in the Sacred Bali Retreat (10 days, from $2,400/person). Could you share availability?",
    description: 'Ten days of Balinese temple culture, jungle wellness, and coastal serenity.',
    highlights: ['Tegallalang Rice Terraces', 'Temple Ceremonies', 'Wellness Spa', 'Ubud Cooking Class', 'Uluwatu Sunset'],
    overview:
      "Bali is more than a destination — it is a feeling. This ten-day retreat takes you through the sacred heart of Ubud, the emerald ribbons of the Tegallalang rice terraces, and the dramatic cliff temples of Uluwatu. Rooted in Balinese spirituality and anchored by world-class wellness, each day unfolds at your pace in private villas and boutique sanctuaries.",
    itinerary: [
      { day: 1, title: 'Arrival in Ubud', description: 'Settle into your private jungle villa.', activities: ['Airport transfer', 'Villa check-in', 'Welcome ceremony', 'Sunset meditation'] },
      { day: 2, title: 'Temple Trail', description: 'Sacred temples of Ubud and surrounds.', activities: ['Tirta Empul holy springs', 'Goa Gajah Elephant Cave', 'Ubud Royal Palace', 'Traditional Kecak dance'] },
      { day: 3, title: 'Rice Terraces & Cooking', description: 'Morning in the terraces, afternoon in the kitchen.', activities: ['Tegallalang sunrise trek', 'Local market visit', 'Balinese cooking masterclass', 'Feast on your creations'] },
      { day: 4, title: 'Wellness Day', description: 'A full day of holistic treatments and yoga.', activities: ['Morning Hatha yoga', '4-hour spa journey', 'Sound healing session', 'Organic dinner'] },
      { day: 5, title: 'Sacred Mount Batur', description: 'Volcano sunrise trek — a Bali highlight.', activities: ['3AM departure', 'Sunrise at 1,717m', 'Natural hot springs descent', 'Afternoon rest'] },
      { day: 6, title: 'Transfer to Seminyak', description: 'Coast-bound luxury.', activities: ['Scenic drive south', 'Seminyak beach club', 'Sunset at Ku De Ta', 'Fine dining evening'] },
      { day: 7, title: 'Uluwatu & Sea Temples', description: 'Clifftop drama and Indian Ocean views.', activities: ['Uluwatu Temple at sunset', 'Kecak fire dance', 'Jimbaran seafood dinner on beach'] },
      { day: 8, title: 'Island Day Trip — Nusa Penida', description: 'Dramatic cliffs and crystal waters.', activities: ['Speed boat to Nusa Penida', 'Kelingking Beach viewpoint', 'Crystal Bay snorkeling', 'Return by sunset'] },
      { day: 9, title: 'Free Day', description: 'Your day, your rhythm.', activities: ['Optional surf lesson', 'Spa or beach', 'Shopping in Seminyak', 'Farewell rooftop dinner'] },
      { day: 10, title: 'Departure', description: 'Farewell to the Island of the Gods.', activities: ['Late villa checkout', 'Airport transfer'] },
    ],
    inclusions: ['9 nights private villa accommodation', 'Daily breakfast', 'Airport transfers', 'All guided tours & entrance fees', 'Cooking class', 'Full wellness day', 'Nusa Penida boat trip', 'Batur volcano trek guide'],
    exclusions: ['International flights', 'Visa on arrival fee', 'Personal expenses', 'Travel insurance', 'Optional activities'],
    policy: {
      cancellation: 'Full refund 30+ days prior. 50% refund 15–29 days. No refund within 14 days.',
      payment: '30% deposit to confirm. Balance due 30 days before departure.',
      childPolicy: 'Suitable for children 10+. 20% discount for ages 10–15 sharing with adults.',
      healthRequirements: 'Volcano trek requires moderate fitness. Spa and wellness days are open to all.',
    },
  },
  {
    id: '3',
    slug: 'alpine-elegance',
    title: 'Alpine Elegance',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    price: 5100,
    duration: '8 Days',
    groupSize: 'Max 10',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    whatsapp_message: "Hi! I'm interested in the Alpine Elegance Switzerland tour (8 days, from $5,100/person). Please share details.",
    description: 'Eight days through the snow-capped peaks and mirror lakes of Switzerland.',
    highlights: ['Matterhorn', 'Lake Geneva', 'Glacier Express', 'Zermatt', 'Jungfraujoch'],
    overview:
      "Switzerland in its most refined form — private rail journeys on the legendary Glacier Express, mornings gazing at the Matterhorn from your chalet balcony, and evenings dining in candlelit Zermatt restaurants. This eight-day Alpine journey moves through Zurich, Interlaken, Zermatt, and Geneva with handpicked luxury properties at every stop.",
    itinerary: [
      { day: 1, title: 'Zurich Arrival', description: 'Land and settle into old-town Zurich.', activities: ['Airport transfer', 'Baur au Lac hotel check-in', 'Old Town walk', 'Zurich lakeside dinner'] },
      { day: 2, title: 'Lucerne & the Lakes', description: 'Day trip to Lucerne and Lake Lucerne.', activities: ['Chapel Bridge & Lion Monument', 'Lake cruise', 'Mt. Pilatus gondola', 'Return to Zurich'] },
      { day: 3, title: 'Glacier Express to Zermatt', description: 'The world\'s most scenic train ride.', activities: ['Glacier Express first class', 'Anderson Valley viaducts', 'Zermatt car-free arrival', 'Matterhorn first view'] },
      { day: 4, title: 'Zermatt & Matterhorn', description: 'Full day in the shadow of the Matterhorn.', activities: ['Gornergrat Railway sunrise', 'Glacier Paradise cable car', 'Matterhorn Museum', 'Fondue evening in the village'] },
      { day: 5, title: 'Interlaken & Jungfraujoch', description: 'To the Top of Europe.', activities: ['Train to Jungfraujoch (3,454m)', 'Sphinx Observatory', 'Aletsch Glacier walk', 'Interlaken check-in'] },
      { day: 6, title: 'Bernese Oberland', description: 'Lakes Thun and Brienz by boat.', activities: ['Lake Thun cruise', 'Thun Castle', 'Brienz woodcarving village', 'Evening in Interlaken'] },
      { day: 7, title: 'Geneva & Lake Leman', description: 'Cosmopolitan lakeside luxury.', activities: ['Train to Geneva', 'Jet d\'Eau', 'Old Town & Reformation Wall', 'Farewell dinner at Hotel Beau-Rivage'] },
      { day: 8, title: 'Departure', description: 'Geneva International Airport transfer.', activities: ['Breakfast with lake view', 'Airport transfer', 'Departure'] },
    ],
    inclusions: ['7 nights 5-star hotels', 'Glacier Express first class tickets', 'Jungfraujoch tickets', 'All rail transfers between cities', 'Daily breakfast + 3 dinners', 'Private guides in each city', 'All gondola/cable car tickets'],
    exclusions: ['International flights', 'Swiss travel insurance', 'Personal shopping', 'Lunches', 'Ski equipment rental'],
    policy: {
      cancellation: 'Full refund 45+ days prior. 50% refund 20–44 days. No refund within 19 days.',
      payment: '40% deposit required. Balance 45 days before travel.',
      childPolicy: 'Children 12+ welcome. Switzerland rail passes include child discounts.',
      healthRequirements: 'Jungfraujoch is at altitude — guests with heart or respiratory conditions should consult a doctor. General moderate fitness required.',
    },
  },
  {
    id: '4',
    slug: 'parisian-midnight',
    title: 'Parisian Midnight',
    destination: 'Paris',
    country: 'France',
    price: 2900,
    duration: '6 Days',
    groupSize: 'Max 10',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1431274172761-fcdab704f66c?w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
      'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&q=80',
    ],
    whatsapp_message: "Hi! I'm interested in the Parisian Midnight tour (6 days, from $2,900/person). Could you share more?",
    description: 'Six days of art, haute cuisine, and the eternal romance of Paris.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Versailles', 'Seine Dinner Cruise', 'Montmartre'],
    overview:
      "Paris never quite lets you go. Six days of private museum access before the crowds arrive, a candlelit Seine dinner cruise beneath the Eiffel Tower, and mornings in Montmartre with a painter. This is not a tourist itinerary — it is an insider's love letter to the city of light, curated for those who want to live Paris rather than photograph it.",
    itinerary: [
      { day: 1, title: 'Bonjour Paris', description: 'Arrive and feel the city breathe.', activities: ['CDG private transfer', 'Hotel check-in (Le Marais)', 'Île de la Cité walk', 'Sunset wine at a cave à vins'] },
      { day: 2, title: 'The Louvre — Before the Crowds', description: 'Private early access to the world\'s greatest museum.', activities: ['7AM private Louvre access', 'Tuileries garden walk', 'Palais Royal lunch', 'Musée d\'Orsay afternoon'] },
      { day: 3, title: 'Versailles in Full', description: 'A full day at the Palace of Versailles.', activities: ['Private guided Versailles tour', 'Hall of Mirrors', 'Grand Trianon & Marie Antoinette\'s Estate', 'Return to Paris'] },
      { day: 4, title: 'Montmartre & the Arts', description: 'The bohemian soul of Paris.', activities: ['Sacré-Cœur at sunrise', 'Private painting session', 'Artist quarter walk', 'Seine dinner cruise at dusk'] },
      { day: 5, title: 'Haute Cuisine & Le Marais', description: 'A day for food lovers.', activities: ['Market tour with a chef', 'Cooking class lunch', 'Le Marais gallery walk', 'Michelin evening (pre-booked)'] },
      { day: 6, title: 'Au Revoir', description: 'Final Paris morning.', activities: ['Café breakfast on a terrace', 'Last shopping or stroll', 'CDG private transfer'] },
    ],
    inclusions: ['5 nights boutique hotel Le Marais', 'Daily breakfast', 'Private Louvre early access', 'Versailles full-day guided tour', 'Seine dinner cruise', 'Cooking class', 'All private transfers'],
    exclusions: ['International flights', 'Travel insurance', 'Lunches (Day 2–5)', 'Personal shopping', 'Michelin dinner cost (Day 5)'],
    policy: {
      cancellation: 'Full refund 30+ days. 50% refund 15–29 days. No refund within 14 days.',
      payment: '30% deposit to confirm. Balance 30 days before.',
      childPolicy: 'All ages welcome. Children under 18 receive museum discounts.',
      healthRequirements: 'Easy walking tour. Suitable for all fitness levels.',
    },
  },
  {
    id: '5',
    slug: 'azure-sanctuary',
    title: 'Azure Sanctuary',
    destination: 'Maldives',
    country: 'Maldives',
    price: 6800,
    duration: '7 Days',
    groupSize: 'Max 6',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
      'https://images.unsplash.com/photo-1559628233-100c798642d8?w=800&q=80',
    ],
    whatsapp_message: "Hi! I'm interested in the Azure Sanctuary Maldives package (7 days, from $6,800/person). Please share details.",
    description: 'Seven days of overwater villa bliss in the Indian Ocean.',
    highlights: ['Overwater Villa', 'Snorkeling', 'Sunset Cruise', 'Dolphin Watching', 'Underwater Dining'],
    overview:
      "The Maldives defies description — you simply have to be there, suspended over a lagoon of impossible turquoise, listening to nothing but the tide. This seven-day sanctuary places you in an overwater villa with direct ocean access, private snorkeling expeditions with marine biologists, sunset dhoni cruises, and a once-in-a-lifetime dinner beneath the sea at Ithaa Undersea Restaurant.",
    itinerary: [
      { day: 1, title: 'Seaplane Arrival', description: 'The world\'s most spectacular airport transfer.', activities: ['Male international airport', 'Seaplane transfer (30 min)', 'Overwater villa check-in', 'Welcome sunset cocktails'] },
      { day: 2, title: 'House Reef Exploration', description: 'Snorkel the living reef beneath your villa.', activities: ['Private snorkel guide', 'Manta ray territory', 'Kayaking at sunset', 'Overwater dinner'] },
      { day: 3, title: 'Marine Biology Day', description: 'Dive deep (or shallow) with a marine expert.', activities: ['Marine biologist guided dive/snorkel', 'Sea turtle sanctuary visit', 'Coral restoration activity', 'Beachside BBQ lunch'] },
      { day: 4, title: 'Sunset Dhoni Cruise', description: 'A traditional wooden dhoni at golden hour.', activities: ['Dolphin watching cruise', 'Champagne sunset', 'Stargazing on the water', 'Return under stars'] },
      { day: 5, title: 'Undersea Dining', description: 'The Maldives\' most iconic experience.', activities: ['Morning spa', 'Submarine excursion', 'Ithaa Undersea Restaurant dinner', 'Night swimming'] },
      { day: 6, title: 'Free Day in Paradise', description: 'Your overwater villa. Your time.', activities: ['Overwater hammock morning', 'Optional water sports', 'Couples massage', 'Farewell beach dinner'] },
      { day: 7, title: 'Departure', description: 'The hardest goodbye.', activities: ['Final sunrise dip', 'Seaplane back to Male', 'Departure'] },
    ],
    inclusions: ['6 nights overwater villa', 'Seaplane transfers (both ways)', 'All meals (full board)', 'Marine biologist guided snorkel', 'Sunset dhoni cruise with champagne', 'Ithaa Undersea Restaurant dinner', 'Couples spa treatment', 'Non-motorized water sports'],
    exclusions: ['International flights to Male', 'Dive certification (PADI)', 'Motorized water sports', 'Alcohol beyond welcome drinks', 'Travel insurance'],
    policy: {
      cancellation: 'Full refund 45+ days. 50% refund 20–44 days. Non-refundable within 19 days.',
      payment: '50% deposit to confirm. Balance 45 days prior.',
      childPolicy: 'Adults and couples only for this package. Children are welcome on request with modified program.',
      healthRequirements: 'Swimming ability required. Snorkeling equipment provided. Scuba diving requires certification.',
    },
  },
  {
    id: '6',
    slug: 'ottoman-grandeur',
    title: 'Ottoman Grandeur',
    destination: 'Istanbul',
    country: 'Turkey',
    price: 2100,
    duration: '5 Days',
    groupSize: 'Max 12',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80',
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
    ],
    whatsapp_message: "Hi! I'm interested in the Ottoman Grandeur Istanbul tour (5 days, from $2,100/person). Could you share details?",
    description: 'Five days where empires collide — between Europe, Asia, and the Ottoman world.',
    highlights: ['Hagia Sophia', 'Bosphorus Cruise', 'Grand Bazaar', 'Topkapi Palace', 'Turkish Hammam'],
    overview:
      "Istanbul is the city where two continents breathe as one — a 3,000-year collision of Byzantine domes, Ottoman minarets, and a roaring modern soul. Five days of private guided access to Hagia Sophia before visitors arrive, a private Bosphorus yacht at sunset, an evening lost in the Grand Bazaar, and a traditional Ottoman hammam ritual that has existed since the 15th century.",
    itinerary: [
      { day: 1, title: 'Istanbul Arrival', description: 'Land in a city that never sleeps.', activities: ['IST private transfer', 'Hotel check-in (Sultanahmet)', 'Rooftop dinner with Bosphorus view', 'Evening walk past Blue Mosque'] },
      { day: 2, title: 'Byzantine & Ottoman Icons', description: 'The greatest buildings ever built.', activities: ['Private Hagia Sophia early access', 'Topkapi Palace & Harem tour', 'Blue Mosque', 'Basilica Cistern'] },
      { day: 3, title: 'Bosphorus by Private Yacht', description: 'Two continents from the water.', activities: ['Private yacht charter', 'Rumeli Fortress', 'Asian shore lunch', 'Princes\' Islands stop'] },
      { day: 4, title: 'Bazaars & the Hammam', description: 'Trade routes and Ottoman rituals.', activities: ['Grand Bazaar with a guide', 'Spice Bazaar', 'Çemberlitaş Hammam ritual', 'Raki evening in Galata'] },
      { day: 5, title: 'Departure', description: 'Final Turkish breakfast and farewell.', activities: ['Menemen breakfast in Karaköy', 'Last Bosphorus view', 'IST private transfer'] },
    ],
    inclusions: ['4 nights boutique hotel Sultanahmet', 'Daily Turkish breakfast', 'Private Hagia Sophia access', 'Topkapi Palace guided tour', 'Private Bosphorus yacht half-day', 'Grand Bazaar expert guide', 'Çemberlitaş Hammam session', 'All private airport transfers'],
    exclusions: ['International flights', 'Turkish visa (if applicable)', 'Travel insurance', 'Lunch and dinner (except noted)', 'Personal shopping'],
    policy: {
      cancellation: 'Full refund 30+ days. 50% refund 15–29 days. No refund within 14 days.',
      payment: '30% deposit to confirm. Balance 30 days before.',
      childPolicy: 'All ages welcome. Children under 12 receive 30% discount.',
      healthRequirements: 'Easy walking tour. Hammam involves heat — not suitable for guests with heart conditions.',
    },
  },
]

export function getTourBySlug(slug: string): TourData | undefined {
  return TOURS.find((t) => t.slug === slug)
}
