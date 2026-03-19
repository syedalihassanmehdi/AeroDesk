import LoginForm from './LoginForm'

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { from?: string }
}) {
  const redirectTo = searchParams?.from || '/dashboard'

  return <LoginForm redirectTo={redirectTo} />
}
