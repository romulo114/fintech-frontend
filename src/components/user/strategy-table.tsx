import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material'
import { ModelInfo } from 'types/model'

type StrategyTableProps = {
  models: ModelInfo[];
}
export const StrategyTable: React.FC<StrategyTableProps> = (props) => {

  const { models } = props
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
    e.preventDefault();
    navigate(`/user/business/strategies/${id}`);
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key='id' style={{ minWidth: 120 }}>ID</TableCell>
              <TableCell key='name' style={{ minWidth: 120 }}>Name</TableCell>
              <TableCell key='keywords' style={{ minWidth: 120 }}>Keywords</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map(model => (
              <TableRow
                hover
                key={model.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => onSelect(e, model.id)}
              >
                <TableCell>{model.id}</TableCell>
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.keywords.join(', ')}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {models.length > pageSize && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={models.length}
          page={page}
          onPageChange={changePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={changePageSize}
        />
      )}
    </>
  )
}
