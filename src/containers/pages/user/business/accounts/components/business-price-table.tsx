import React, { useCallback, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BusinessPrice } from 'types/business';
import { CircleIconButton } from 'components/base';

type BusinessPricesTableProps = {
  prices: BusinessPrice[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
export const BusinessPricesTable: React.FC<BusinessPricesTableProps> = (props) => {

  const { prices, onDelete, onEdit } = props;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

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

  return (
    <>
      {prices?.length ? (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 60 }}>No</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Symbol</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Price</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prices.map((pos, idx) => (
                  <TableRow
                    hover
                    key={pos.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{pos.symbol}</TableCell>
                    <TableCell>{pos.price}</TableCell>
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
          {prices.length > pageSize && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="div"
              count={prices.length}
              page={page}
              onPageChange={changePage}
              rowsPerPage={pageSize}
              onRowsPerPageChange={changePageSize}
            />
          )}
        </>
      ) : (
        <Typography>No prices yet</Typography>
      )}
    </>
  )
}
