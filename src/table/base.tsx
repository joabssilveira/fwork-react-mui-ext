import { LabelDisplayedRowsArgs, Table, TableBody, TableBodyProps, TableFooter, TablePagination, TablePaginationProps, TableProps } from '@mui/material'
import * as locales from '@mui/material/locale'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { SupportedLocales, TableComponentSetCurrPageProps } from './common'
import { CommonUtils } from 'fwork-jsts-common'
import { TablePaginationActions } from './actions'

export interface TableBaseComponentProps<T> {
  downloadCsv?: boolean,
  bodyList: T[],
  header?: ReactNode,
  footer?: ReactNode,

  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  tableShadowContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  tableScrollContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  tableProps?: TableProps,
  bodyProps?: TableBodyProps,
  paginationProps?: TablePaginationProps,

  bodyRowBuilder: (item: T, idx: number) => React.ReactNode,
  onPageChange?: (page: number) => void,
  onRowsPerPageChange?: (rowsPerPage: number) => void,

  // EXPORTED METHOD...
  setCurrPageRef?: React.MutableRefObject<TableComponentSetCurrPageProps>
  // ...EXPORTED METHOD
}

export const TableBaseComponent: React.FC<TableBaseComponentProps<any>> = <T,>(props: TableBaseComponentProps<T>) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // EXPORTED METHOD...  
  useEffect(() => {
    if (props.setCurrPageRef)
      props.setCurrPageRef.current = setCurrPage;
  }, []);

  const setCurrPage = (args: {
    page: number
  }) => {
    setPage(args.page)
  };
  // ...EXPORTED METHOD

  React.useEffect(() => {
    if (props.onPageChange)
      props.onPageChange(page)
  }, [page])

  React.useEffect(() => {
    if (props.onRowsPerPageChange)
      props.onRowsPerPageChange(rowsPerPage)
  }, [rowsPerPage])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  //TablePagination
  const [locale] = useState<SupportedLocales>('ptBR')
  const theme = useTheme()
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  )

  const handleLabelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs) => {
    // return defaultPageCount > 1 ? `Página ${page + 1} ${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}` : '';
    return defaultPageCount > 1 ? `${page + 1} ${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}` : '';
  };

  const items = props.bodyList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  // let pageCount = props.bodyList.length / 10
  // if (pageCount % 1 > 0) {
  //   pageCount = pageCount | 0
  //   pageCount++
  // }

  // const defaultPageCount = Math.ceil(props.bodyList.length / rowsPerPage)
  const defaultPageCount = Math.ceil(props.bodyList.length / 10)

  return <>
    <div {...props.wrapperProps}
      className={`table-and-pagination-wrapper ${props.wrapperProps?.className}`}
    >
      <div className={`table-shadow-wrapper ${props.tableShadowContainerProps?.className}`}
        style={{
          boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 3px',
          borderRadius: 5,
          ...props.tableShadowContainerProps?.style,
        }}>
        <div
          {...props.tableScrollContainerProps}
          className={`table-wrapper ${props.tableScrollContainerProps?.className}`}
          style={{
            width: '100%',
            overflowX: 'auto',
            // clipPath aplica o border radius na scroll bar
            clipPath: 'inset(0 round 5px)',
            borderRadius: 5,
            overflow: 'auto',
            ...props.tableScrollContainerProps?.style
          }}
        >
          <Table {...props.tableProps}>
            {items.length ? props.header : <></>}
            <TableBody {...props.bodyProps}>
              {items.map((item: T, idx: number) => {
                return props.bodyRowBuilder(item, idx)
              })}
            </TableBody>
            {items.length ? props.footer : <></>}
          </Table>
        </div >
      </div>

      {defaultPageCount > 1 || props.downloadCsv ? <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 10, minHeight: 60 }}>
        <ThemeProvider theme={themeWithLocale}>
          <TablePagination
            {...props.paginationProps}
            component={props.paginationProps?.component ?? "div"}
            labelRowsPerPage={props.paginationProps?.labelRowsPerPage ?? (defaultPageCount > 1 ? undefined : '')}
            rowsPerPageOptions={props.paginationProps?.rowsPerPageOptions ?? (defaultPageCount > 1 ? undefined : [])}
            labelDisplayedRows={(paginationInfo: LabelDisplayedRowsArgs) => {
              return props.paginationProps?.labelDisplayedRows ? props.paginationProps.labelDisplayedRows(paginationInfo) : handleLabelDisplayedRows(paginationInfo)
            }}

            ActionsComponent={(subprops) => {
              const CustomActions = props.paginationProps?.ActionsComponent;
              return (
                <>
                  {CustomActions && <CustomActions {...subprops} />}
                  <TablePaginationActions
                    {...subprops}
                    downloadCsv={props.downloadCsv}
                    onExport={() => CommonUtils.exportToCSV(props.bodyList)}
                  />
                </>
              );
            }}

            onPageChange={(e, newPage) => {
              handleChangePage(e, newPage)
              if (props.paginationProps?.onPageChange)
                props.paginationProps.onPageChange(e, newPage)
            }}
            onRowsPerPageChange={(e) => {
              handleChangeRowsPerPage(e)
              if (props.paginationProps?.onRowsPerPageChange)
                props.paginationProps.onRowsPerPageChange(e)
            }}
            count={props.bodyList.length}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </ThemeProvider >
      </div> : <></>}
    </div>
  </>
}