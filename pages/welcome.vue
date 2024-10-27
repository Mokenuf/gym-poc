<template>
  <UContainer>
    <h1>¡Bienvenido, {{ user.name }}!</h1>
    <p>Tu email es: {{ user.email }}</p>
    <UButton label="Desloguear" @click="handleLogout" />
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const userStore = useUserStore()
const { logout } = useAuth()
const user = userStore.user
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/')
}
</script>