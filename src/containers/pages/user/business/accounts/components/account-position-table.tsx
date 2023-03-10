import React, { useCallback, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow,
  Checkbox, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AccountPosition } from 'types/account';
import { CircleIconButton } from 'components/base';

type AccountPositionsTableProps = {
  positions: AccountPosition[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
export const AccountPositionsTable: React.FC<AccountPositionsTableProps> = (props) => {

  const { positions, onDelete, onEdit } = props;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, []);

  const handleEdit = (e: React.MouseEvent, id?: number): void => {
    e.stopPropagation();
    id && onEdit(id);
  };

  const handleDelete = (e: React.MouseEvent, id?: number): void => {
    e.stopPropagation();
    id && onDelete(id);
  };

  return (
    <>
      {positions?.length ? (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 60 }}>No</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Symbol</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Share</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Cash</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map((pos, idx) => (
                  <TableRow
                    hover
                    key={pos.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{pos.symbol}</TableCell>
                    <TableCell>{pos.shares}</TableCell>
                    <TableCell>
                      <Checkbox checked={pos.isCash} size='small' disabled />
                    </TableCell>
                    <TableCell sx={{ p: 1 }}>
                      <CircleIconButton
                        color='primary'
                        onClick={(e) => handleEdit(e, pos.id)}
                      >
                        <EditIcon fontSize='small' />
                      </CircleIconButton>
                      <CircleIconButton
                        color='error'
                        sx={{ ml: 2 }}
                        onClick={(e) => handleDelete(e, pos.id)}
                      >
                        <DeleteIcon />
                      </CircleIconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {positions.length > pageSize && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="div"
              count={positions.length}
              page={page}
              onPageChange={changePage}
              rowsPerPage={pageSize}
              onRowsPerPageChange={changePageSize}
            />
          )}
        </>
      ) : (
        <Typography>No positions yet</Typography>
      )}
    </>
  )
}
