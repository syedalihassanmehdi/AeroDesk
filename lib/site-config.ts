import { getSupabaseClient } from './supabase'

export interface SiteConfig {
  // Branding
  agency_name: string
  logo_url: string
  primary_color: string
  accent_color: string
  font_body: string

  // Navbar colors
  nav_bg: string
  nav_text: string
  nav_cta_bg: string
  nav_cta_text: string

  // Hero colors
  hero_bg_overlay: string
  hero_badge_bg: string
  hero_badge_text: string
  hero_title_color: string
  hero_subtitle_color: string
  hero_cta_primary_bg: string
  hero_cta_primary_text: string
  hero_cta_secondary_border: string
  hero_cta_secondary_text: string

  // Tours section colors
  tours_bg: string
  tours_badge_color: string
  tours_title_color: string
  tours_subtitle_color: string
  tours_card_bg: string
  tours_card_border: string
  tours_price_color: string
  tours_btn_bg: string
  tours_btn_text: string

  // Why Us colors
  whyus_bg: string
  whyus_badge_color: string
  whyus_title_color: string
  whyus_text_color: string
  whyus_icon_bg: string
  whyus_icon_color: string
  whyus_since_color: string

  // Moments colors
  moments_bg: string
  moments_title_color: string
  moments_badge_color: string
  moments_hover_color: string

  // Testimonials colors
  testimonials_bg: string
  testimonials_card_bg: string
  testimonials_card_border: string
  testimonials_quote_color: string
  testimonials_text_color: string
  testimonials_name_color: string
  testimonials_star_color: string

  // CTA colors
  cta_bg: string
  cta_overlay: string
  cta_title_color: string
  cta_subtitle_color: string
  cta_btn_bg: string
  cta_btn_text: string

  // Journal colors
  journal_bg: string
  journal_card_bg: string
  journal_card_border: string
  journal_title_color: string
  journal_badge_color: string
  journal_text_color: string
  journal_link_color: string

  // Footer colors
  footer_bg: string
  footer_text_color: string
  footer_muted_color: string
  footer_border_color: string
  footer_btn_bg: string
  footer_btn_text: string

  // Hero content
  hero_badge: string
  hero_title: string
  hero_subtitle: string
  hero_image: string
  hero_cta_primary: string
  hero_cta_secondary: string

  // Tours section content
  tours_badge: string
  tours_title: string
  tours_subtitle: string
  tours_cta_label: string

  // Why Us content
  whyus_badge: string
  whyus_title: string
  whyus_subtitle: string
  whyus_since: string
  whyus_features: { icon: string; title: string; desc: string }[]
  whyus_images: string[]

  // Moments content
  moments_title: string
  moments_badge: string
  moments_images: string[]

  // Testimonials content
  testimonials_badge: string
  testimonials_title: string
  testimonials: { quote: string; name: string; role: string; avatar: string }[]

  // CTA content
  cta_title: string
  cta_subtitle: string
  cta_button: string
  cta_image: string

  // Journal content
  journal_badge: string
  journal_title: string
  journal_posts: { title: string; category: string; excerpt: string; image: string; date: string }[]

  // Footer content
  footer_tagline: string
  footer_whatsapp: string
  footer_email: string
  footer_phone: string
  footer_address: string
  footer_instagram: string
  footer_facebook: string
  footer_twitter: string
  footer_newsletter_text: string

  // Navbar content
  nav_links: { label: string; href: string }[]
}

export const DEFAULT_CONFIG: SiteConfig = {
  agency_name: 'LuxeVoyage',
  logo_url: '',
  primary_color: '#0A2342',
  accent_color: '#C5A059',
  font_body: 'Inter',

  nav_bg: '#0a0a0a',
  nav_text: 'rgba(255,255,255,0.7)',
  nav_cta_bg: '#C5A059',
  nav_cta_text: '#121212',

  hero_bg_overlay: '#0A2342',
  hero_badge_bg: 'rgba(197,160,89,0.15)',
  hero_badge_text: '#C5A059',
  hero_title_color: '#ffffff',
  hero_subtitle_color: 'rgba(255,255,255,0.6)',
  hero_cta_primary_bg: '#C5A059',
  hero_cta_primary_text: '#121212',
  hero_cta_secondary_border: 'rgba(255,255,255,0.25)',
  hero_cta_secondary_text: 'rgba(255,255,255,0.8)',

  tours_bg: '#121212',
  tours_badge_color: 'rgba(255,255,255,0.3)',
  tours_title_color: '#ffffff',
  tours_subtitle_color: 'rgba(255,255,255,0.4)',
  tours_card_bg: '#1c1c1c',
  tours_card_border: 'rgba(255,255,255,0.08)',
  tours_price_color: '#C5A059',
  tours_btn_bg: 'rgba(197,160,89,0.12)',
  tours_btn_text: '#C5A059',

  whyus_bg: '#0f0f0f',
  whyus_badge_color: 'rgba(255,255,255,0.3)',
  whyus_title_color: '#ffffff',
  whyus_text_color: 'rgba(255,255,255,0.5)',
  whyus_icon_bg: 'rgba(197,160,89,0.12)',
  whyus_icon_color: '#C5A059',
  whyus_since_color: '#C5A059',

  moments_bg: '#121212',
  moments_title_color: '#ffffff',
  moments_badge_color: 'rgba(255,255,255,0.3)',
  moments_hover_color: 'rgba(197,160,89,0.25)',

  testimonials_bg: '#0f0f0f',
  testimonials_card_bg: '#1c1c1c',
  testimonials_card_border: 'rgba(255,255,255,0.08)',
  testimonials_quote_color: '#C5A059',
  testimonials_text_color: 'rgba(255,255,255,0.6)',
  testimonials_name_color: '#ffffff',
  testimonials_star_color: '#C5A059',

  cta_bg: '#121212',
  cta_overlay: '#0A2342',
  cta_title_color: '#ffffff',
  cta_subtitle_color: 'rgba(255,255,255,0.5)',
  cta_btn_bg: '#C5A059',
  cta_btn_text: '#121212',

  journal_bg: '#0f0f0f',
  journal_card_bg: '#1c1c1c',
  journal_card_border: 'rgba(255,255,255,0.08)',
  journal_title_color: '#ffffff',
  journal_badge_color: '#C5A059',
  journal_text_color: 'rgba(255,255,255,0.4)',
  journal_link_color: '#C5A059',

  footer_bg: '#0a0a0a',
  footer_text_color: 'rgba(255,255,255,0.35)',
  footer_muted_color: 'rgba(255,255,255,0.25)',
  footer_border_color: 'rgba(255,255,255,0.06)',
  footer_btn_bg: '#C5A059',
  footer_btn_text: '#121212',

  hero_badge: 'The Private Agency',
  hero_title: 'The Art of Extraordinary Travel',
  hero_subtitle: 'Immersive journeys designed for those who dare to claim and live the extraordinary.',
  hero_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80',
  hero_cta_primary: 'Explore Expeditions',
  hero_cta_secondary: 'Plan Your Journey',

  tours_badge: 'Curated Collection',
  tours_title: 'Signature Expeditions',
  tours_subtitle: "Curated selection of the world's most evocative landscapes and cultural heritage sites.",
  tours_cta_label: 'View All Tours',

  whyus_badge: 'The LuxeVoyage Standard',
  whyus_title: 'Why Choose LuxeVoyage',
  whyus_subtitle: 'We believe luxury is found through exclusive access, expert curation, and a seamless execution.',
  whyus_since: '2009',
  whyus_features: [
    { icon: '✦', title: 'Bespoke Itineraries', desc: 'Tailored private experiences with your personal travel consultant on a blank canvas, painted with your wishes.' },
    { icon: '◈', title: 'Exclusive Access', desc: 'Unbeatable exclusive guarded access to pre-closed, off-market experiences reserved for a select few.' },
    { icon: '◎', title: 'White-Glove Service', desc: '24/7 dedicated concierge at your fingertips ensuring perfection at all moments.' },
  ],
  whyus_images: [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
  ],

  moments_title: 'Travel Moments',
  moments_badge: 'Through the lens',
  moments_images: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    'https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=400&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
  ],

  testimonials_badge: 'Client Stories',
  testimonials_title: 'Voices of the Modern Voyager',
  testimonials: [
    { quote: 'The level of detail provided by LuxeVoyage is unparalleled.', name: 'Elena Rodriguez', role: 'CEO', avatar: 'ER' },
    { quote: 'I have never found the balance between adventure and absolute luxury like this.', name: 'Marcus Chen', role: 'Entrepreneur', avatar: 'MC' },
    { quote: 'LuxeVoyage crafts life-changing moments. The private access was unforgettable.', name: 'Thomas Pierre', role: 'Private Investor', avatar: 'TP' },
  ],

  cta_title: 'Your Journey Begins Here',
  cta_subtitle: 'Step into a world of curated elegance and discovery. Our consultants are waiting to design your masterpiece.',
  cta_button: 'Start Planning',
  cta_image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80',

  journal_badge: 'Stories & Insights',
  journal_title: 'The Journal',
  journal_posts: [
    { title: "The Hidden Gems of London's Historic Quarter", category: 'Destinations', excerpt: 'Uncovering the lesser-known treasures of this magnificent city...', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', date: 'Mar 8, 2026' },
    { title: 'Conservation & Luxury: The New Safari', category: 'Experiences', excerpt: 'How modern safari camps are redefining the balance...', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', date: 'Feb 22, 2026' },
    { title: 'The Secret Tables of the Mediterranean', category: 'Culinary', excerpt: "A guide to dining experiences you won't find in any guidebook...", image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', date: 'Feb 14, 2026' },
  ],

  footer_tagline: 'Crafting extraordinary journeys for the discerning traveler since 2009.',
  footer_whatsapp: '15551234567',
  footer_email: 'hello@luxevoyage.com',
  footer_phone: '+1 555 123 4567',
  footer_address: 'Dubai, UAE',
  footer_instagram: 'luxevoyage',
  footer_facebook: 'luxevoyage',
  footer_twitter: 'luxevoyage',
  footer_newsletter_text: 'Curated travel inspiration and exclusive offers, delivered monthly.',

  nav_links: [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Journal', href: '#journal' },
    { label: 'About', href: '#about' },
  ],
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const { data, error } = await getSupabaseClient()
      .from('site_config')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !data) return DEFAULT_CONFIG

    const merged: SiteConfig = {} as SiteConfig
    for (const key of Object.keys(DEFAULT_CONFIG) as (keyof SiteConfig)[]) {
      const val = data[key]
      ;(merged as any)[key] = (val !== undefined && val !== null) ? val : (DEFAULT_CONFIG as any)[key]
    }
    return merged
  } catch {
    return DEFAULT_CONFIG
  }
}
