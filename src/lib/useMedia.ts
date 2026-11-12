import { useSyncExternalStore } from 'react'

export function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', notify)
      return () => list.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}
