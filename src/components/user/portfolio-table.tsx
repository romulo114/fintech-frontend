import React, { useCallback, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Checkbox
} from '@mui/material';
import { PortfolioInfo } from 'types/portfolio';

type PortfolioTableProps = {
  portfolios: PortfolioInfo[];
  onSelectAll?: (checked: boolean) => void;
  onSelect: (id: number) => void;
  selected?: number[];
}
export const PortfolioTable: React.FC<PortfolioTableProps> = (props) => {

  const { portfolios, onSelect, onSelectAll, selected } = props
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, [])

  const handleSelect = (e: React.MouseEvent, id: number): void => {
    e.preventDefault();
    onSelect(id);
  }

  const hasCheckbox = !!(onSelectAll && selected);
  const count = portfolios.length;

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {hasCheckbox && (
                <TableCell padding='checkbox' sx={{ pl: 1 }}>
                  <Checkbox
                    color='primary'
                    checked={count > 0 && selected.length === count}
                    indeterminate={selected.length > 0 && selected.length < count}
                    onChange={(_, checked) => onSelectAll(checked)}
                  />
                </TableCell>
              )}
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
                onClick={e => handleSelect(e, portfolio.id)}
              >
                {hasCheckbox && (
                  <TableCell padding='checkbox' sx={{ pl: 1 }}>
                  <Checkbox
                    color='primary'
                    checked={selected.includes(portfolio.id)}
                  />
                </TableCell>
                )}
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
