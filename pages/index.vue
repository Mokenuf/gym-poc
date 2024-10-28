<template>
  <div>
    <UContainer>
      <h2>Loguear</h2>
      <UForm :validate="validate" :state="formModel" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="formModel.email" placeholder="Ingresa tu Mail" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="formModel.password" type="password" placeholder="Ingresa tu contraseña" />
        </UFormGroup>
        <UButton type="submit" label="Ingresar" />
      </UForm>
    </UContainer>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">

interface LoginForm {
  email: string,
  password: string
}

const formModel: LoginForm = reactive({
  email: '',
  password: ''
})

const authStore = useAuthStore()
const router = useRouter()

const validate = (formModel: LoginForm) => {
  const errors: any[] = []
  if (!formModel.email) errors.push({ path: 'email', message: 'Email es requerido' })
  if (!formModel.password) errors.push({ path: 'password', message: 'Password es requerido' })
  return errors
}

const onSubmit = async () => {
  const response = await authStore.login(formModel)
  if (response) {
    router.push('/welcome')
  } else {
    alert('Credenciales incorrectas')
  }
}
</script>