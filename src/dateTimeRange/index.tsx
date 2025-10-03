import { Button, Grid2 as Grid } from "@mui/material";
import { DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { periodOptions, PeriodOptionsNames } from "fwork-jsts-common";
import { Moment } from "moment";
import React, { useState } from "react";
import { DatePickerExtComponent } from "../datePicker";
import { ModalComponent } from "../modal";

export interface IDateTimeRangeDialogComponentProps {
  style?: React.CSSProperties | undefined,
  // initLabel?: string
  initPeriodValueKey?: PeriodOptionsNames
  diProps?: {
    initValue: Moment | undefined
  }
  dfProps?: {
    initValue: Moment | undefined
  }
  onConfirm?: (di: Moment | undefined, df: Moment | undefined, label: string | undefined, periodValueKey?: PeriodOptionsNames) => void
}

export const DateTimeRangeComponent: React.FC<IDateTimeRangeDialogComponentProps> = ({
  style,
  // initLabel,
  initPeriodValueKey,
  diProps,
  dfProps,
  onConfirm,
}) => {
  const valuesFromInitPeriodValuekey = initPeriodValueKey ? periodOptions[initPeriodValueKey]() : undefined

  const [di, setDi] = useState(valuesFromInitPeriodValuekey?.di ?? diProps?.initValue)
  const [df, setDf] = useState(valuesFromInitPeriodValuekey?.df ?? dfProps?.initValue)
  // const [label, setLabel] = useState(valuesFromInitPeriodValuekey?.label ?? initLabel ?? '')
  const [label, setLabel] = useState(valuesFromInitPeriodValuekey?.label ?? '')
  const [periodValueKey, setPeriodValueKey] = useState<PeriodOptionsNames | undefined>(initPeriodValueKey)

  return <>
    <ModalComponent
      modalContent={<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Grid container columns={2} spacing={2}>
          <Grid size={{ xs: 2, md: 1 }}>
            <DatePickerExtComponent
              sx={{
                width: '100%'
              }}
              label="Data Inicial"
              value={di}
              onChange={(value: Moment, _context: PickerChangeHandlerContext<DateTimeValidationError>) => {
                setDi(value.startOf('day'))
                setLabel('')
                setPeriodValueKey(undefined)
              }}
            />
          </Grid>
          <Grid size={{ xs: 2, md: 1 }}>
            <DatePickerExtComponent
              sx={{
                width: '100%'
              }}
              label="Data Final"
              value={df}
              onChange={(value: Moment, _context: PickerChangeHandlerContext<DateTimeValidationError>) => {
                setDf(value.endOf('day'))
                setLabel('')
                setPeriodValueKey(undefined)
              }}
            />
          </Grid>
        </Grid>
        <Grid container columns={3} spacing={2}>
          <Grid size={1}>
            <Button variant={periodValueKey == 'days_last30' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['days_last30']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('days_last30')
              }}
            >Últimos 30 dias</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'days_last14' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['days_last14']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('days_last14')
              }}
            >Últimos 14 dias</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'days_last07' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['days_last07']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('days_last07')
              }}
            >Últimos 7 dias</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'week_lastBefore' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['week_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('week_lastBefore')
              }}
            >Semana Retrasada</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'week_last' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['week_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('week_last')
              }}
            >Semana Passada</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'week_this' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['week_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('week_this')
              }}
            >Esta Semana</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'month_lastBefore' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['month_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('month_lastBefore')
              }}
            >Mês Retrasado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'month_last' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['month_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('month_last')
              }}
            >Mês Passado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'month_this' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['month_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('month_this')
              }}
            >Este Mês</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'quarter_lastBefore' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['quarter_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('quarter_lastBefore')
              }}
            >Penúltimo Trimestre</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'quarter_last' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['quarter_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('quarter_last')
              }}
            >Trimestre Passado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'quarter_this' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['quarter_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('quarter_this')
              }}
            >Este Trimestre</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'year_lastBefore' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['year_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('year_lastBefore')
              }}
            >Penúltimo Ano</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'year_last' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['year_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('year_last')
              }}
            >Ano Passado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'year_this' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['year_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('year_this')
              }}
            >Este Ano</Button>
          </Grid>
          <Grid size={1}>
            <Button variant={periodValueKey == 'today' ? 'contained' : 'outlined'} style={{ width: '100%', height: '100%' }}
              onClick={() => {
                const { di, df, label } = periodOptions['today']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('today')
              }}
            >Hoje</Button>
          </Grid>
        </Grid>
      </div>}
      onConfirm={(_) => onConfirm?.(di, df, label, periodValueKey)}
      style={style}
    >
      <Button style={{ width: '100%', height: '100%' }} variant="outlined">{di && df ? `Período entre ${new Date(di.unix() * 1000).toLocaleDateString()} e ${new Date(df.unix() * 1000).toLocaleDateString()} ${label ? ' - ' + label : ''}` : 'Clique para escolher o período'}</Button>
    </ModalComponent>
  </>
}