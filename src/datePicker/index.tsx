import { IconButton, InputAdornment, InputAdornmentProps } from "@mui/material";
import { DatePicker, DatePickerProps, DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { browserLang } from 'fwork-jsts-browser';
import { Moment } from "moment";
import React from "react";
import { MdCancel } from "react-icons/md";

export interface DateTimePickerExtComponentProps
  extends Omit<DateTimePickerProps, 'onChange'> {

  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >

  onChange?: (
    value: Moment | null,
    context: any
  ) => void
}

export const DateTimePickerExtComponent = (props: DateTimePickerExtComponentProps) => {
  const { wrapperProps, onChange, ...rest } = props

  const inputAdornment = (props: InputAdornmentProps) => (
    <InputAdornment {...props}>
      {rest.value != null && (
        <IconButton
          style={{
            marginRight: -10,
            opacity: .6,
          }}
          disabled={rest.disabled}
          onClick={() => onChange?.(null, {} as any)}
        >
          <MdCancel />
        </IconButton>
      )}

      {props.children}
    </InputAdornment>
  )

  return <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={browserLang}>
    <span {...wrapperProps} style={{ position: 'relative', ...wrapperProps?.style }}>
      <DateTimePicker
        {...rest}
        slots={{
          ...rest.slots,
          inputAdornment,
        }}
        slotProps={{
          ...rest.slotProps,
          textField: (ownerState) => {
            const textFieldProps =
              typeof rest.slotProps?.textField === 'function'
                ? rest.slotProps.textField(ownerState)
                : rest.slotProps?.textField

            return {
              ...textFieldProps,
              style: {
                width: '100%',
                ...textFieldProps?.style,
              },
            }
          },
        }}
        viewRenderers={rest.viewRenderers ?? {
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
        onChange={(value, context) => {
          onChange?.(value as Moment | null, context)
        }}
      />
      {rest.value != null && <IconButton
        disabled={rest.disabled}
        style={{ position: 'absolute', right: 30, top: -3 }}
        onClick={() => onChange?.(null, {} as any)}>
        <MdCancel />
      </IconButton>}
    </span>
  </LocalizationProvider>
}

export interface DatePickerExtComponentProps
  extends Omit<DatePickerProps, 'onChange'> {

  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >

  onChange?: (
    value: Moment | null,
    context: any
  ) => void
}

export const DatePickerExtComponent = (props: DatePickerExtComponentProps) => {
  const { wrapperProps, onChange, ...rest } = props

  const inputAdornment = (props: InputAdornmentProps) => (
    <InputAdornment {...props}>
      {rest.value != null && (
        <IconButton
          style={{
            marginRight: -10,
            opacity: .6,
          }}
          disabled={rest.disabled}
          onClick={() => onChange?.(null, {} as any)}
        >
          <MdCancel />
        </IconButton>
      )}

      {props.children}
    </InputAdornment>
  )

  return <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt">
    <span {...wrapperProps} style={{ position: 'relative', ...wrapperProps?.style }}>
      <DatePicker
        {...rest}
        slots={{
          ...rest.slots,
          inputAdornment,
        }}
        slotProps={{
          ...rest.slotProps,
          textField: (ownerState) => {
            const textFieldProps =
              typeof rest.slotProps?.textField === 'function'
                ? rest.slotProps.textField(ownerState)
                : rest.slotProps?.textField

            return {
              ...textFieldProps,
              style: {
                width: '100%',
                ...textFieldProps?.style,
              },
            }
          },
        }}
        views={['year', 'month', 'day']}
        onChange={(value, context) => {
          onChange?.(value as Moment | null, context)
        }}
      />
    </span>
  </LocalizationProvider>
}