import { ListItemText, TableRowProps } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import * as locales from '@mui/material/locale'
import styled from '@mui/material/styles/styled'
import { ColorUtils } from 'fwork-jsts-common'

export type SupportedLocales = keyof typeof locales

export const StyledListItemText = styled(ListItemText)(() => ({
  margin: 0
}))

export const StyledTableCell = styled(TableCell)(() => ({
  padding: '8px 16px',
  boxSizing: 'border-box',
}));

export interface StyledTableRowProps extends TableRowProps {
  odd?: boolean | undefined
}

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'odd', // Não envia 'odd' para o DOM
})<StyledTableRowProps>(({ theme, odd }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: odd ? theme.palette.action.hover : 'initial',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&&:hover': {
    backgroundColor: ColorUtils.incColor(theme.palette.background.default, -20),
  }
}))

// EXPORTED METHOD...
export type TableComponentSetCurrPageProps = ((args: {
  page: number
}) => void) | null
// ...EXPORTED METHOD