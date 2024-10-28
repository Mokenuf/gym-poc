<template>
  <UContainer>
    <h1>¡Bienvenido, {{ user?.name }}!</h1>
    <p>Tu email es: {{ user?.email }}</p>
    <UButton label="Desloguear" @click="handleLogout" />
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const authStore = useAuthStore()
const user = authStore.loggedUser
const router = useRouter()

const handleLogout = async () => {
  const response = await authStore.logout()
  if (response) {
    router.push('/')
  } else {
    alert('Error al desloguear')
  }
}
</script>