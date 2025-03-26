import { useAuthStore } from '@/infra/store/authStore'

export const useAuth = () => {
  const state = useAuthStore()
  const canContinue = state.user?.role === 'admin'

  return {
    ...state,
    canContinue,
  }
}
