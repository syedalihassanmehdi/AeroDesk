import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const AUTH_COOKIE_NAME = 'aerodesk_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required.`)
  }

  return value
}

export function getAdminCredentials() {
  return {
    email: getRequiredEnv('ADMIN_EMAIL').trim().toLowerCase(),
    password: getRequiredEnv('ADMIN_PASSWORD'),
    secret: getRequiredEnv('AUTH_SECRET'),
  }
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('hex')
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) return false
  return timingSafeEqual(aBuffer, bBuffer)
}

export function isValidAdminLogin(email: string, password: string) {
  const credentials = getAdminCredentials()
  return (
    safeEqual(email.trim().toLowerCase(), credentials.email) &&
    safeEqual(password, credentials.password)
  )
}

export function createSessionToken(email: string) {
  const credentials = getAdminCredentials()
  const payload = JSON.stringify({
    email: email.trim().toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
  })
  const encodedPayload = Buffer.from(payload).toString('base64url')
  const signature = sign(encodedPayload, credentials.secret)
  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token?: string | null) {
  if (!token) return null

  const credentials = getAdminCredentials()
  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) return null

  const expectedSignature = sign(encodedPayload, credentials.secret)
  if (!safeEqual(signature, expectedSignature)) return null

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as {
      email?: string
      exp?: number
    }

    if (!payload.email || !payload.exp || payload.exp < Date.now()) {
      return null
    }

    if (!safeEqual(payload.email, credentials.email)) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function getServerSession() {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value)
}

export function getRequestSession(req: NextRequest) {
  return verifySessionToken(req.cookies.get(AUTH_COOKIE_NAME)?.value)
}
