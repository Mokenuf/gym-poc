export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (!authStore.loggedUser) {
    return navigateTo('/')
  }
})