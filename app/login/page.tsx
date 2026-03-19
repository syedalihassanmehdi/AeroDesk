import LoginForm from './LoginForm'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const params = await searchParams
  const redirectTo = params.from || '/dashboard'

  return <LoginForm redirectTo={redirectTo} />
}
