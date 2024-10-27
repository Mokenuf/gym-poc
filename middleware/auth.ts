export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()

  if (!userStore.user) {
    return navigateTo('/')
  }
})