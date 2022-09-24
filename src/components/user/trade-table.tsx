import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material'
import { TradeInfo } from 'types/trade'

type TradeTableProps = {
  trades: TradeInfo[];
}

export const TradeTable: React.FC<TradeTableProps> = (props) => {
  const { trades } = props
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, [])

  const onSelect = (e: React.MouseEvent, id: number): void => {
    e.preventDefault()
    navigate(`/user/business/trades/${id}`)
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key='id' style={{ minWidth: 120 }}>ID</TableCell>
              <TableCell key='name' style={{ minWidth: 120 }}>Name</TableCell>
              <TableCell key='created' style={{ minWidth: 120 }}>Created</TableCell>
              <TableCell key='status' style={{ minWidth: 120 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map(trade => (
              <TableRow
                hover
                key={trade.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => onSelect(e, trade.id)}
              >
                <TableCell>{trade.id}</TableCell>
                <TableCell>{trade.name}</TableCell>
                <TableCell>{trade.created}</TableCell>
                <TableCell><b>{trade.status ? 'true' : 'false'}</b></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {trades.length > pageSize && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={trades.length}
          page={page}
          onPageChange={changePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={changePageSize}
        />
      )}
    </>
  )
}
