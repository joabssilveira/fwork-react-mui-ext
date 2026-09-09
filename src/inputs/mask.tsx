import { TextField, TextFieldProps } from "@mui/material"
import { format, Replacement, unformat, useMask } from "@react-input/mask"
import React from "react"

export type InputMaskProps = {
  value?: string
  mask?: string
  replacement?: Record<string, string>
  onChange?: (data: string) => void
} & Omit<TextFieldProps, 'ref' | 'value' | 'onChange'>

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  (
    {
      mask,
      replacement,
      value,
      onChange,
      ...props
    },
    ref
  ) => {

    const parsed: any = {}
    if (replacement)
      for (let key of Object.keys(replacement))
        parsed[key] = new RegExp(replacement[key])

    const maskOptions: {
      mask: string;
      replacement: string | Replacement;
    } | undefined = mask ? { mask, replacement: parsed } : undefined

    const maskRef = maskOptions ? useMask(maskOptions) : undefined;

    return <>
      <TextField
        {...props}
        inputRef={(el) => {
          if (maskRef)
            maskRef.current = el

          if (typeof ref === 'function')
            ref(el)
          else if (ref)
            ref.current = el
        }}

        value={
          maskOptions
            ? format(value ?? '', maskOptions)
            : value ?? ''
        }
        onChange={(e) => {
          onChange?.(maskOptions ? unformat(e.target.value, maskOptions) : e.target.value)
        }}
      />
    </>
  })