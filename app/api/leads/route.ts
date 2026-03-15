import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, travel_date, travelers, special_requests, tour_id, tour_title, total_price } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await getSupabaseAdmin().from('leads').insert([{
      name,
      email,
      phone,
      travel_date: travel_date || null,
      travelers: Number(travelers) || 1,
      special_requests: special_requests || null,
      tour_id: tour_id || null,
      tour_title: tour_title || null,
      total_price: total_price || null,
      status: 'new',
    }])

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

