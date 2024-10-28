export const useUserService = () => {

  // Composables
  const supabase = useSupabaseClient()

  // Services
  const getMe = async (authId: string) => {
    const { data, error } = await supabase.from('users').select().eq('auth_id', authId).single()
    if (error) {
      console.error('Error getting user:', error.message)
      return null
    }
    return data
  }

  return { getMe }
}