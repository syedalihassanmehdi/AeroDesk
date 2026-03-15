import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()

    const updates: Record<string, any> = {}
    if (body.title) updates.title = body.title
    if (body.destination) updates.destination = body.destination
    if (body.country) updates.country = body.country
    if (body.price) updates.price = Number(body.price)
    if (body.duration) updates.duration = body.duration
    if (body.groupSize) updates.group_size = body.groupSize
    if (body.difficulty) updates.difficulty = body.difficulty
    if (body.image !== undefined) updates.image = body.image
    if (body.description !== undefined) updates.description = body.description
    if (body.overview !== undefined) updates.overview = body.overview
    if (body.highlights !== undefined) updates.highlights = body.highlights.split('\n').filter(Boolean)
    if (body.whatsapp_message !== undefined) updates.whatsapp_message = body.whatsapp_message
    if (body.inclusions !== undefined) updates.inclusions = body.inclusions.split('\n').filter(Boolean)
    if (body.exclusions !== undefined) updates.exclusions = body.exclusions.split('\n').filter(Boolean)

    const { data, error } = await getSupabaseAdmin().from('tours').update(updates).eq('id', id).select().single()
    if (error) throw error

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await getSupabaseAdmin().from('tours').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

