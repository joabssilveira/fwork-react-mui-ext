import { IconButton, TableHead } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TableBaseComponent } from "./base";
import { StyledTableCell, StyledTableRow } from "./common";

type AnyObject = { [key: string]: any };

function isObject(value: any): value is AnyObject {
  return value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date);
}

function mergeArrays<T>(...arrays: T[][]): T[] {
  const combinedArray = arrays.reduce((acc, curr) => acc.concat(curr), []);
  const uniqueArray = Array.from(new Set(combinedArray));
  return uniqueArray;
}

export const ObjInTableShowHideWrapperComponent = (props: ObjInTableComponentProps) => {
  const [show, setShow] = useState(false)

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <IconButton onClick={() => setShow(!show)}>{show ? <FaMinus size={8} /> : <FaPlus size={8} />}</IconButton>
    {show ? <TableObjWrapperComponent {...props} /> : <></>}
  </div>
}

export interface ObjInTableComponentProps extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  obj: any,
  quoteStr?: boolean,
}

export const TableObjWrapperComponent = (props: ObjInTableComponentProps) => {
  const { obj, quoteStr } = props

  let objIsObj = isObject(obj)
  let objIsArray = Array.isArray(obj)
  let data: any[] = objIsObj ? [obj] : objIsArray ? [...obj.map((o: any) => (isObject(o) ? o : { value: o }))] : [{ value: obj }]

  const getColumns = (): any[] => {
    return mergeArrays(...data.map(d => Object.keys(d)))
  }

  const getColData = (objData: any, col: string, idx: number, quoteStr?: boolean) => {
    let lIsObject = isObject(objData[col])
    let lIsArray = Array.isArray(objData[col])

    return <StyledTableCell key={idx} style={{ verticalAlign: 'top', whiteSpace: 'nowrap' }}>
      {lIsObject || lIsArray ?
        <ObjInTableShowHideWrapperComponent {...props} obj={objData[col]} /> :
        typeof objData[col] === 'string' && !quoteStr ? <pre style={{margin: 0}}>{objData[col]}</pre> : <pre style={{margin: 0}}>{JSON.stringify(objData[col])}</pre>}
    </StyledTableCell>
  }

  return obj ? <>
    <TableBaseComponent
      wrapperProps={{
        style: {
          borderRadius: 5,
          display: 'inline-block',
          background: 'rgba(200,200,200,.08)'
        }
      }}
      header={<TableHead style={{
        background: 'rgba(200,200,200,.08)'
      }}>
        <StyledTableRow>
          {getColumns().map((c, idx) => <StyledTableTitleCell key={idx} align='left'>{c}</StyledTableTitleCell>)}
        </StyledTableRow>
      </TableHead >}
      bodyList={data}
      bodyRowBuilder={(data: any, idx: number) => {
        return <StyledTableRow key={idx} style={{ background: 'rgba(200,200,200,.08)' }}>{getColumns().map((col, idx) => getColData(data, col, idx, quoteStr))}</StyledTableRow>
      }}
    />
  </> : <>Nada a exibir</>
}

export const StyledTableTitleCell = styled(StyledTableCell)(() => ({
  fontWeight: 'bold',
  whiteSpace: 'nowrap'
}))