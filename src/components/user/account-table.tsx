import React, { useCallback, useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Paper,
  Fab
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { AccountInfo } from 'types/account'

type AccountTableProps = {
  accounts: AccountInfo[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number) => void;
}
export const AccountTable: React.FC<AccountTableProps> = (props) => {

  const { accounts, onDelete, onEdit } = props
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(-1)

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key='id' style={{ minWidth: 120 }}>ID</TableCell>
              <TableCell key='broker' style={{ minWidth: 120 }}>Broker Name</TableCell>
              <TableCell key='portfolio' style={{ minWidth: 120 }}>Portfolio</TableCell>
              <TableCell key='actions' style={{ minWidth: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(acc => (
              <TableRow hover key={acc.id}>
                <TableCell>{acc.id}</TableCell>
                <TableCell>{acc.brokerName}</TableCell>
                <TableCell>{acc.portfolioId}</TableCell>
                <TableCell>
                  <Fab color='primary' onClick={() => onEdit(acc.id)} aria-label='edit'>
                    <EditIcon />
                  </Fab>
                  <Fab color='primary' onClick={() => onDelete(acc.id)} aria-label='delete'>
                    <DeleteIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {page >= 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={accounts.length}
          page={page}
          onPageChange={changePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={changePageSize}
        />
      )}
    </Paper>
  )
}
