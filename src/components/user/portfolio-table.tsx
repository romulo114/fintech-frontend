import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material'
import { PortfolioInfo } from 'types/portfolio'

type PortfolioTableProps = {
  portfolios: PortfolioInfo[];
}
export const PortfolioTable: React.FC<PortfolioTableProps> = (props) => {

  const { portfolios } = props
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
    navigate(`/user/business/portfolios/${id}`)
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key='id' style={{ minWidth: 120 }}>ID</TableCell>
              <TableCell key='broker' style={{ minWidth: 120 }}>Name</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {portfolios.length > pageSize && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={portfolios.length}
          page={page}
          onPageChange={changePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={changePageSize}
        />
      )}
    </>
  )
}
