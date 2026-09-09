import React, { FC, ReactNode, useMemo, useState } from "react"
import { LoadingCircularComponent } from "."
import { LoadingCircularContext, LoadingCircularState } from "./context"

export const LoadingCircularProvider: FC<{
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
    } as LoadingCircularState), [loadingCount])

    return <>
      <LoadingCircularContext.Provider value={value}>
        <LoadingCircularComponent />
        {children}
      </LoadingCircularContext.Provider>
    </>
  }