import { Button, Grid2 as Grid } from "@mui/material";
import { DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import { DatePickerExtComponent } from "../datePicker";
import { ModalComponent } from "../modal";

export const periodsValues = {
  'today': () => {
    const di = moment().startOf('day')
    const df = moment().endOf('day')
    const label = 'HOJE'

    return { di, df, label }
  },
  'days_last30': () => {
    const di = moment().subtract(29, 'day').startOf('day')
    const df = moment().endOf('day')
    const label = 'Últimos 30 dias'

    return { di, df, label }
  },
  'days_last14': () => {
    const di = moment().subtract(13, 'day').startOf('day')
    const df = moment().endOf('day')
    const label = 'Últimos 14 dias'

    return { di, df, label }
  },
  'days_last07': () => {
    const di = moment().subtract(6, 'day').startOf('day')
    const df = moment().endOf('day')
    const label = 'Últimos 7 dias'

    return { di, df, label }
  },
  'week_lastBefore': () => {
    const start = moment().startOf('week').subtract(2, 'week').startOf('day')
    const di = start
    const df = moment(start).endOf('week').endOf('day')
    const label = 'Semana Retrasada'

    return { di, df, label }
  },
  'week_last': () => {
    const start = moment().startOf('week').subtract(1, 'week').startOf('day')
    const di = start
    const df = moment(start).endOf('week').endOf('day')
    const label = 'Semana Passada'

    return { di, df, label }
  },
  'week_this': () => {
    const di = moment().startOf('week').startOf('day')
    const df = moment().endOf('day')
    const label = 'Esta Semana'

    return { di, df, label }
  },
  'month_lastBefore': () => {
    const start = moment().startOf('month').subtract(2, 'month').startOf('day')
    const di = start
    const df = moment(start).endOf('month').endOf('day')
    const label = 'Mês Retrasado'

    return { di, df, label }
  },
  'month_last': () => {
    const start = moment().startOf('month').subtract(1, 'month').startOf('day')
    const di = start
    const df = moment(start).endOf('month').endOf('day')
    const label = 'Mês Passado'

    return { di, df, label }
  },
  'month_this': () => {
    const di = moment().startOf('month').startOf('day')
    const df = moment().endOf('day')
    const label = 'Este Mês'

    return { di, df, label }
  },
  'quarter_lastBefore': () => {
    const start = moment().startOf('quarter').subtract(2, 'quarter').startOf('day')
    const di = start
    const df = moment(start).endOf('quarter').endOf('day')
    const label = 'Penúltimo Trimestre'

    return { di, df, label }
  },
  'quarter_last': () => {
    const start = moment().startOf('quarter').subtract(1, 'quarter').startOf('day')
    const di = start
    const df = moment(start).endOf('quarter').endOf('day')
    const label = 'Trimestre Passado'

    return { di, df, label }
  },
  'quarter_this': () => {
    const di = moment().startOf('quarter').startOf('day')
    const df = moment().endOf('day')
    const label = 'Este Trimestre'

    return { di, df, label }
  },
  'year_lastBefore': () => {
    const start = moment().startOf('year').subtract(2, 'year').startOf('day')
    const di = start
    const df = moment(start).endOf('year').endOf('day')
    const label = 'Penúltimo Ano'

    return { di, df, label }
  },
  'year_last': () => {
    const start = moment().startOf('year').subtract(1, 'year').startOf('day')
    const di = start
    const df = moment(start).endOf('year').endOf('day')
    const label = 'Ano Passado'

    return { di, df, label }
  },
  'year_this': () => {
    const di = moment().startOf('year').startOf('day')
    const df = moment().endOf('day')
    const label = 'Este Ano'

    return { di, df, label }
  },
}

export type PeriodValuesKeys = keyof typeof periodsValues;

export interface IDateTimeRangeDialogComponentProps {
  style?: React.CSSProperties | undefined,
  initLabel?: string
  diProps?: {
    initValue: Moment | undefined
  }
  dfProps?: {
    initValue: Moment | undefined
  }
  onConfirm?: (di: Moment | undefined, df: Moment | undefined, label: string | undefined, periodValueKey?: PeriodValuesKeys) => void
}

export const DateTimeRangeComponent: React.FC<IDateTimeRangeDialogComponentProps> = ({
  style,
  initLabel,
  diProps,
  dfProps,
  onConfirm,
}) => {
  const [di, setDi] = useState(diProps?.initValue)
  const [df, setDf] = useState(dfProps?.initValue)
  const [label, setLabel] = useState(initLabel ?? '')
  const [periodValueKey, setPeriodValueKey] = useState<PeriodValuesKeys>()

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
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().subtract(29, 'day').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Últimos 30 dias')
                const { di, df, label } = periodsValues['days_last30']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('days_last30')
              }}
            >Últimos 30 dias</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().subtract(13, 'day').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Últimos 14 dias')
                const { di, df, label } = periodsValues['days_last14']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('days_last14')
              }}
            >Últimos 14 dias</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().subtract(6, 'day').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Últimos 7 dias')
                const { di, df, label } = periodsValues['days_last07']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('days_last07')
              }}
            >Últimos 7 dias</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('week').subtract(2, 'week').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('week').endOf('day'))
                // setLabel('Semana Retrasada')
                const { di, df, label } = periodsValues['week_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('week_lastBefore')
              }}
            >Semana Retrasada</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('week').subtract(1, 'week').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('week').endOf('day'))
                // setLabel('Semana Passada')
                const { di, df, label } = periodsValues['week_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('week_last')
              }}
            >Semana Passada</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().startOf('week').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Esta Semana')
                const { di, df, label } = periodsValues['week_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('week_this')
              }}
            >Esta Semana</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('month').subtract(2, 'month').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('month').endOf('day'))
                // setLabel('Mês Retrasado')
                const { di, df, label } = periodsValues['month_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('month_lastBefore')
              }}
            >Mês Retrasado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('month').subtract(1, 'month').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('month').endOf('day'))
                // setLabel('Mês Passado')
                const { di, df, label } = periodsValues['month_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('month_last')
              }}
            >Mês Passado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().startOf('month').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Este Mês')
                const { di, df, label } = periodsValues['month_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('month_this')
              }}
            >Este Mês</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('quarter').subtract(2, 'quarter').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('quarter').endOf('day'))
                // setLabel('Penúltimo Trimestre')
                const { di, df, label } = periodsValues['quarter_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('quarter_lastBefore')
              }}
            >Penúltimo Trimestre</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('quarter').subtract(1, 'quarter').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('quarter').endOf('day'))
                // setLabel('Trimestre Passado')
                const { di, df, label } = periodsValues['quarter_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('quarter_last')
              }}
            >Trimestre Passado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().startOf('quarter').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Este Trimestre')
                const { di, df, label } = periodsValues['quarter_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('quarter_this')
              }}
            >Este Trimestre</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('year').subtract(2, 'year').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('year').endOf('day'))
                // setLabel('Penúltimo Ano')
                const { di, df, label } = periodsValues['year_lastBefore']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('year_lastBefore')
              }}
            >Penúltimo Ano</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // const start = moment().startOf('year').subtract(1, 'year').startOf('day')
                // setDi(start)
                // setDf(moment(start).endOf('year').endOf('day'))
                // setLabel('Ano Passado')
                const { di, df, label } = periodsValues['year_last']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('year_last')
              }}
            >Ano Passado</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="outlined" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().startOf('year').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Este Ano')
                const { di, df, label } = periodsValues['year_this']()
                setDi(di)
                setDf(df)
                setLabel(label)
                setPeriodValueKey('year_this')
              }}
            >Este Ano</Button>
          </Grid>
          <Grid size={1}>
            <Button variant="contained" style={{ width: '100%', height: '100%' }}
              onClick={() => {
                // setDi(moment().startOf('year').startOf('day'))
                // setDf(moment().endOf('day'))
                // setLabel('Este Ano')
                const { di, df, label } = periodsValues['today']()
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