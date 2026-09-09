import React, { FC, ReactNode, useMemo, useState } from "react"
import { LoadingBarComponent } from "."
import { LoadingBarContext, LoadingBarState } from "./context"

export const LoadingBarProvider: FC<{
  children: ReactNode
}> = ({
  children
}) => {
    const [loadingCount, setLoadingCount] = useState<number>(0)

    const value = useMemo(() => ({
      loadingCount: loadingCount,
      show() {
        const tmp = loadingCount + 1
        setLoadingCount(tmp)
      },
      hide() {
        let tmp = loadingCount - 1
        if (tmp < 0 ) tmp = 0
        setLoadingCount(tmp)
      },
    } as LoadingBarState), [loadingCount])

    return <>
      <LoadingBarContext.Provider value={value}>
        <LoadingBarComponent />
        {children}
      </LoadingBarContext.Provider>
    </>
  }