import { createContext, useContext } from "react"

export type LoadingBarState = {
  loadingCount: number,
  show: () => void,
  hide: () => void,
}

export const LoadingBarContext = createContext<LoadingBarState | null>(null)

export const useLoadingBar = () => {
  const ctx = useContext(LoadingBarContext)
  if (!ctx) throw new Error('useLoadingBar must be used inside LoadingBarProvider')
  return ctx
}