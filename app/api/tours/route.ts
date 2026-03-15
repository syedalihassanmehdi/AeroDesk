import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const tour = {
      slug,
      title: body.title,
      destination: body.destination,
      country: body.country,
      price: Number(body.price),
      duration: body.duration,
      group_size: body.groupSize || null,
      difficulty: body.difficulty || 'Easy',
      image: body.image || null,
      gallery: [],
      description: body.description || null,
      overview: body.overview || null,
      highlights: body.highlights ? body.highlights.split('\n').filter(Boolean) : [],
      whatsapp_message: body.whatsapp_message || null,
      inclusions: body.inclusions ? body.inclusions.split('\n').filter(Boolean) : [],
      exclusions: body.exclusions ? body.exclusions.split('\n').filter(Boolean) : [],
      policy: {},
      itinerary: [],
    }

    const { data, error } = await getSupabaseAdmin().from('tours').insert([tour]).select().single()
    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

