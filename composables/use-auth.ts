import User from "~/models/user"

export const useAuth = () => {
  const userStore = useUserStore()
  const router = useRouter()
  const supabase = useSupabaseClient()

  const getMe = async (authId: string) => {

    const { data, error } = await supabase.from('users').select('*').eq('auth_id', authId).single()
    if (error) {
      console.error('Error getting user:', error.message)
      return null
    }
    userStore.setUser(new User(data))
    return true
  }

  const login = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Error logging in:', error.message)
      return false
    }

    const authId = data?.user?.id
    if (authId) { await getMe(authId) }
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    userStore.logout()
    router.push('/login')
  }

  return { getMe, login, logout }
}