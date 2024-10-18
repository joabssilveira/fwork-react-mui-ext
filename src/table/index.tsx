import React from 'react'
import { TableBaseComponent, TableBaseComponentProps } from './base'
import { StyledTableRow, StyledTableRowProps } from './common'

export interface TableComponentRowProps<T> extends StyledTableRowProps {
  onClickGetItem?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: T) => void
}

export interface TableComponentProps<T> extends TableBaseComponentProps<T> {
  rowProps?: TableComponentRowProps<T>,
}

export const TableComponent: React.FC<TableComponentProps<any>> = <T,>(props: TableComponentProps<T>) => {
  return <>
    <TableBaseComponent
      {...props}
      bodyRowBuilder={(item: T, idx: number) => {
        return (
          <StyledTableRow
            odd={props.rowProps?.odd != null ? props.rowProps.odd : true}
            hover={props.rowProps?.hover != null ? props.rowProps.hover : true}
            key={props.rowProps?.key != null ? props.rowProps.key : idx}
            style={{
              width: '100%',
              cursor: props.rowProps?.onClickGetItem ? 'pointer' : 'default',
              ...props.rowProps?.style,
            }}
            onClick={(event) => {
              if (props.rowProps?.onClick)
                props.rowProps.onClick(event)

              if (props.rowProps?.onClickGetItem)
                props.rowProps.onClickGetItem(event, item)
            }}
          >
            {props.bodyRowBuilder(item, idx)}
          </StyledTableRow>
        )
      }}
    />
  </>
}