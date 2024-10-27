import { defineStore } from 'pinia'
import User from '~/models/user'

export const useUserStore = defineStore('user', () => {
  // State
  const user: Ref<User | null> = ref(null)

  // Actions
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  const logout = () => {
    user.value = null
  }

  return { user, setUser, logout }
})