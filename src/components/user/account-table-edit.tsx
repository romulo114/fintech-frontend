import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Paper,
  Checkbox
} from '@mui/material'
import { AccountInfo } from 'types/account'

type AccountTableProps = {
  all: AccountInfo[];
  accounts: AccountInfo[];
  selected: AccountInfo[];
  setSelected: (sels: AccountInfo[]) => void;
  editing: boolean;
}
export const AccountEditTable: React.FC<AccountTableProps> = (props) => {

  const { accounts, all, editing, selected, setSelected } = props

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

  const onSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected([...all])
    } else {
      setSelected([])
    }
  }, [all, setSelected])

  const onSelectOne = (e: React.ChangeEvent<HTMLInputElement>, acc: AccountInfo): void => {
    const exists = selected.find(sel => sel.id === acc.id)
    if (e.target.checked) {
      if (!exists) {
        selected.push(acc)
        setSelected([...selected])
      }
    } else {
      if (exists) {
        selected.push(acc)
        setSelected(selected.filter(sel => sel.id !== acc.id))
      }
    }
  }

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }, [])

  const onSelect = (e: React.MouseEvent, id: number): void => {
    e.preventDefault()
    history.push(`/user/business/accounts/${id}`)
  }

  const data = editing ? all : accounts
  console.log(data)
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {editing && (
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    indeterminate={selected.length > 0 && selected.length < all.length}
                    checked={selected.length > 0 && selected.length === all.length}
                    onChange={onSelectAll}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
              )}
              <TableCell key='id' style={{ minWidth: 120 }}>Fithm ID</TableCell>
              <TableCell key='broker' style={{ minWidth: 120 }}>Broker Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(acc => (
              <TableRow
                hover
                key={acc.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => onSelect(e, acc.id)}
              >
                {editing && (
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={!!selected.find(sel => sel.id === acc.id)}
                      onChange={e => onSelectOne(e, acc)}
                      onClick={onClick}
                    />
                  </TableCell>
                )}
                <TableCell>{acc.accountNo}</TableCell>
                <TableCell>{acc.brokerName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(editing && pageSize < all.length) || (!editing && pageSize < accounts.length) && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component='div'
          count={accounts.length}
          page={page}
          onPageChange={changePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={changePageSize}
        />
      )}
    </>
  )
}
