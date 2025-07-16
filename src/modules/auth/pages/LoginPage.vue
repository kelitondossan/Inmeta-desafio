<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Animation -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div class="yugioh-cards">
        <div v-for="n in 5" :key="n" class="card" :style="{ animationDelay: `${n * 0.5}s` }"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 animate-fade-in">
            Bem-vindo ao Duelo!
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-delay">
            Ou
            <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300">
              crie sua conta gratuitamente
            </router-link>
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg py-8 px-4 shadow-2xl rounded-lg sm:px-10 animate-slide-up">
          <!-- Error Alert -->
          <div v-if="authStore.error" class="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative animate-shake" role="alert">
            <span class="block sm:inline">{{ authStore.error }}</span>
          </div>

          <form class="space-y-6" @submit="onSubmit">
            <div class="space-y-4">
              <BaseInput
                v-model="email"
                label="Email"
                type="email"
                autocomplete="email"
                required
                :error="emailError"
                @blur="emailBlur"
              />

              <div>
                <div class="flex items-center justify-between">
                  <BaseInput
                    v-model="password"
                    label="Senha"
                    type="password"
                    autocomplete="current-password"
                    required
                    :error="passwordError"
                    @blur="passwordBlur"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded transition-colors duration-300"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Lembrar-me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <BaseButton
                type="submit"
                :loading="loading"
                class="w-full flex justify-center transform hover:scale-105 transition-all duration-300"
              >
                Entrar
              </BaseButton>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400">
                  Ou continue com
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <BaseButton
                variant="secondary"
                class="w-full transform hover:scale-105 transition-all duration-300"
                type="button"
              >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Google
              </BaseButton>

              <BaseButton
                variant="secondary"
                class="w-full transform hover:scale-105 transition-all duration-300"
                type="button"
              >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import type { POSITION } from 'vue-toastification'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import BaseInput from '@/shared/components/BaseInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { object, string } from 'yup'
import { useForm, useField } from 'vee-validate'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const validationSchema = object({
  email: string().required('Email é obrigatório').email('Email inválido'),
  password: string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres')
})

const { handleSubmit } = useForm<{ email: string; password: string }>({
  validationSchema,
  validateOnMount: false
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')

const loading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    await authStore.login(values.email, values.password)
    const redirect = router.currentRoute.value.query.redirect as string
    router.push(redirect || '/')
    toast.success('Login realizado com sucesso! 👋', {
      timeout: 3000,
      position: 'top-right' as POSITION,
      icon: '✨'
    })
  } catch (error) {
    console.error('Login failed:', error)
    toast.error('Falha ao fazer login. Verifique suas credenciais.', {
      timeout: 4000,
      position: 'top-right' as POSITION,
      icon: '❌'
    })
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.yugioh-cards {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card {
  position: absolute;
  width: 150px;
  height: 220px;
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyMCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZkNzAwIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMjAgMjBoMTEwdjE4MEgyMHoiIGZpbGw9IiNmZmQ3MDAiLz48L3N2Zz4=') center/cover;
  animation: float 20s infinite linear;
  opacity: 0.1;
}

@keyframes float {
  0% {
    transform: translate(-100%, -100%) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  90% {
    opacity: 0.1;
  }
  100% {
    transform: translate(200%, 200%) rotate(720deg);
    opacity: 0;
  }
}

.card:nth-child(1) { top: 10%; left: 20%; }
.card:nth-child(2) { top: 30%; left: 60%; }
.card:nth-child(3) { top: 50%; left: 40%; }
.card:nth-child(4) { top: 70%; left: 80%; }
.card:nth-child(5) { top: 90%; left: 10%; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-delay {
  0% { opacity: 0; transform: translateY(-20px); }
  50% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in-delay 1s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style> 