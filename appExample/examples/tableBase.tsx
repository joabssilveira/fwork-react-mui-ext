import { TableBaseComponent } from '@lib/table/base';
import { StyledTableCell, StyledTableRow, TableComponentSetCurrPageProps } from "@lib/table/common";
import { StyledTableTitleCell } from "@lib/table/objWrapper";
import { TableHead } from "@mui/material";
import React from "react";

type DataType = {
    textColumn: string,
    numberColumn: number
}

export const TableBaseComponentExample = () => {
    const tableComponentSetCurrPageRef = React.useRef<TableComponentSetCurrPageProps>(() => { });
    const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current

    const data: DataType[] = [{
        textColumn: 'text value a',
        numberColumn: 98.7
    }, {
        textColumn: 'text value b',
        numberColumn: 6543.21
    }]

    return <>
        <h2>TableBaseComponent</h2>
        <TableBaseComponent
            downloadCsv={true}
            setCurrPageRef={tableComponentSetCurrPageRef}
            header={<TableHead>
                <StyledTableRow>
                    <StyledTableTitleCell>Text Column</StyledTableTitleCell>
                    <StyledTableTitleCell>Number Column</StyledTableTitleCell>
                </StyledTableRow>
            </TableHead >}
            bodyList={data || []}
            bodyRowBuilder={(item: DataType, idx: number) => {
                return <StyledTableRow key={idx}>
                    <StyledTableCell>
                        {item.textColumn}
                    </StyledTableCell>
                    <StyledTableCell>
                        {item.numberColumn}
                    </StyledTableCell>
                </StyledTableRow>
            }}
        />
    </>
}