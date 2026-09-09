import { createContext, useContext } from "react"

export type LoadingCircularState = {
  loadingCount: number,
  show: () => void,
  hide: () => void,
}

export const LoadingCircularContext = createContext<LoadingCircularState | null>(null)

export const useLoadingCircular = () => {
  const ctx = useContext(LoadingCircularContext)
  if (!ctx) throw new Error('useLoadingCircular must be used inside LoadingCircularProvider')
  return ctx
}