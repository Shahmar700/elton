import { usePageStore } from '~/stores/usePageStore'

export function usePagesData() {
  const pageStore = usePageStore()
  useAsyncData('pages', () => pageStore.fetchPages())
  useAsyncData('pageContent', () => pageStore.fetchPageContent())
  useAsyncData('pageImage', () => pageStore.fetchPageImage())
  return pageStore
}