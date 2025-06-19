import { usePageStore } from '~/stores/usePageStore'

export function usePagesData() {
  const pageStore = usePageStore()
  return pageStore
}