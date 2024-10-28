export const useAuthService = () => {

  // Composables
  const supabase = useSupabaseClient()

  // Services
  const loginService = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Error logging in:', error.message)
      return null
    }
    return data.user?.id || null
  }

  const logoutService = async () => {
    await supabase.auth.signOut()
  }

  return { loginService, logoutService }
}