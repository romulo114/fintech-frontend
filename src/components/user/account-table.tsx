import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AccountInfo } from 'types/account';
import { CircleIconButton } from 'components/base';

type AccountTableProps = {
  accounts: AccountInfo[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
export const AccountTable: React.FC<AccountTableProps> = (props) => {

  const { accounts, onDelete, onEdit } = props;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, []);

  const handleEdit = (e: React.MouseEvent, id: number): void => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDelete = (e: React.MouseEvent, id: number): void => {
    e.stopPropagation();
    onDelete(id);
  };

  const onSelect = (e: React.MouseEvent, id: number): void => {
    e.preventDefault();
    navigate(`/user/business/accounts/${id}`);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
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
              <TableRow
                hover
                key={acc.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => onSelect(e, acc.id)}
              >
                <TableCell>{acc.id}</TableCell>
                <TableCell>{acc.brokerName}</TableCell>
                <TableCell>{acc.portfolioId}</TableCell>
                <TableCell sx={{ p: 1 }}>
                  <CircleIconButton
                    color='primary'
                    onClick={(e) => handleEdit(e, acc.id)}
                  >
                    <EditIcon fontSize='small' />
                  </CircleIconButton>
                  <CircleIconButton
                    color='error'
                    sx={{ ml: 2 }}
                    onClick={(e) => handleDelete(e, acc.id)}
                  >
                    <DeleteIcon />
                  </CircleIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {accounts.length > pageSize && (
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
    </>
  )
}
