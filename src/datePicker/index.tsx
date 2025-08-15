import { DatePicker, DatePickerProps, DateTimePicker, DateTimePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Moment } from "moment";
import React from "react";

export interface DateTimePickerExtComponentProps<TDate extends
  PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false> extends DateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure> {
}

export const DateTimePickerExtComponent = (props: DateTimePickerExtComponentProps<any, any>) => {
  return <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt">
    <DateTimePicker
      {...props}
      viewRenderers={props.viewRenderers ?? {
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
      onChange={(value: Moment | undefined, ctx: any) => {
        props.onChange?.(value, ctx)
      }}
    />
  </LocalizationProvider>
}

export interface DatePickerExtComponentProps<TDate extends
  PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false> extends DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure> {
}

export const DatePickerExtComponent = (props: DatePickerExtComponentProps<any, any>) => {
  return <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt">
    <DatePicker
      {...props}
      views={['year', 'month', 'day']}
      onChange={(value: Moment | undefined, ctx: any) => {
        props.onChange?.(value, ctx)
      }}
    />
  </LocalizationProvider>
}