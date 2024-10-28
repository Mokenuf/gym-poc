import { useAuthService } from '~/composables/services/auth'
import { useUserService } from '~/composables/services/user'
import User from '~/models/user'

export const useAuthStore = defineStore('auth', () => {
  // Composables
  const { loginService, logoutService } = useAuthService()
  const { getMe } = useUserService()
  const toast = useToast()

  // State
  const loggedUser: Ref<User | null> = ref(null)

  // Actions
  const login = async ({ email, password }: { email: string; password: string }) => {
    const authId = await loginService({ email, password })

    if (authId) {
      const data = await getMe(authId)
      const _loggedUser = new User(data)
      if (_loggedUser) {
        setLoggedUser(_loggedUser)
        toast.add({
          title: 'Bienvenido !',
          icon: 'i-heroicons-check-circle',
          timeout: 3000,
          color: 'primary',
        })
        return true
      } else {
        return false
      }
    }
  }

  const logout = async () => {
    await logoutService()
    clearloggedUser()
    toast.add({
      title: 'Hasta luego !',
      icon: 'i-heroicons-check-circle',
      timeout: 3000,
      color: 'primary',
    })
    return true
  }

  // Mutations
  const setLoggedUser = (user: User) => {
    loggedUser.value = user
  }

  const clearloggedUser = () => {
    loggedUser.value = null
  }

  return { loggedUser, login, logout, setLoggedUser, clearloggedUser }
})
