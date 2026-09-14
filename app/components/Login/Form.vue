<template>
  <v-card class="login-card mx-auto" max-width="460">
    <v-card-item>
      <v-card-title class="text-h4 font-weight-bold">Iniciar sesión</v-card-title>
      <v-card-subtitle class="mt-2">
        Accede a tu espacio de aprendizaje en PlayEdu.
      </v-card-subtitle>
    </v-card-item>

    <v-form ref="form" class="pa-4 pt-2" @submit.prevent="submitLogin">
      <v-alert
        v-if="errorMessage"
        class="mb-4"
        closable
        type="error"
        variant="tonal"
        @click:close="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>

      <v-alert
        class="mb-4"
        color="deep-purple-lighten-4"
        density="comfortable"
        type="info"
        variant="tonal"
      >
        Credenciales de prueba: admin@eduplay.com / playedu123
      </v-alert>

      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.email]"
        autocomplete="email"
        color="deep-purple"
        label="Correo electrónico"
        prepend-inner-icon="mdi-email-outline"
        type="email"
        variant="outlined"
      />

      <v-text-field
        v-model="password"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.required, rules.password]"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="current-password"
        class="mt-2"
        color="deep-purple"
        label="Contraseña"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="showPassword = !showPassword"
      />

      <v-btn
        block
        class="mt-4"
        color="deep-purple-accent-4"
        :loading="isLoading"
        size="large"
        type="submit"
      >
        Entrar
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface LoginForm {
  validate: () => Promise<{ valid: boolean }>
}

const VALID_CREDENTIALS = {
  email: 'admin@eduplay.com',
  password: 'playedu123',
}

const router = useRouter()
const form = ref<LoginForm | null>(null)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio',
  email: (value: string) => /\S+@\S+\.\S+/.test(value) || 'Introduce un correo válido',
  password: (value: string) => value.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
}

async function submitLogin() {
  errorMessage.value = ''
  const result = await form.value?.validate()

  if (!result?.valid) {
    return
  }

  const normalizedEmail = email.value.trim().toLowerCase()

  if (normalizedEmail !== VALID_CREDENTIALS.email || password.value !== VALID_CREDENTIALS.password) {
    errorMessage.value = 'Correo o contraseña incorrectos.'
    return
  }

  isLoading.value = true

  try {
    sessionStorage.setItem('eduplay-auth', 'true')
    sessionStorage.setItem('eduplay-user', normalizedEmail)
    await router.push('/')
  } catch {
    errorMessage.value = 'No se pudo iniciar sesión. Inténtalo de nuevo.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
}
</style>
