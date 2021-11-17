import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Paper
} from '@mui/material'
import { PortfolioInfo } from 'types/portfolio'

type PortfolioTableProps = {
  portfolios: PortfolioInfo[];
}
export const PortfolioTable: React.FC<PortfolioTableProps> = (props) => {

  const { portfolios } = props
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const history = useHistory()

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, [])

  const onSelect = (e: React.MouseEvent, id: number): void => {
    e.preventDefault()
    history.push(`/user/business/portfolios/${id}`)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key='id' style={{ minWidth: 120 }}>ID</TableCell>
              <TableCell key='broker' style={{ minWidth: 120 }}>Name</TableCell>
              <TableCell key='portfolio' style={{ minWidth: 120 }}>Keywords</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolios.map(portfolio => (
              <TableRow
                hover
                key={portfolio.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => onSelect(e, portfolio.id)}
              >
                <TableCell>{portfolio.id}</TableCell>
                <TableCell>{portfolio.name}</TableCell>
                <TableCell>{[]}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={portfolios.length}
        page={page}
        onPageChange={changePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={changePageSize}
      />
    </Paper>
  )
}
