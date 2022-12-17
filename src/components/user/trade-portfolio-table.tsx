import React, { useCallback, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Switch
} from '@mui/material';
import { TradePortofolioInfo } from 'types';

type PortfolioTableProps = {
  portfolios: TradePortofolioInfo[];
  onSelect: (id: number) => void;
  onToggleStatus: (values: { portfolioId: number, status: boolean }) => void;
}
export const TradePortfolioTable: React.FC<PortfolioTableProps> = (props) => {

  const { portfolios, onSelect, onToggleStatus } = props;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

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

  const handleToggle = async (e: React.MouseEvent, id: number, status: boolean) => {
    e.stopPropagation();
    onToggleStatus({ portfolioId: id, status });
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key='id' style={{ minWidth: 120 }}>ID</TableCell>
              <TableCell key='broker' style={{ minWidth: 120 }}>Name</TableCell>
              <TableCell key='active' style={{ minWidth: 120 }}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolios.map(portfolio => (
              <TableRow
                hover
                key={portfolio.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => handleSelect(e, portfolio.portfolio.id)}
              >
                <TableCell>{portfolio.portfolio.id}</TableCell>
                <TableCell>{portfolio.portfolio.name}</TableCell>
                <TableCell>
                  <Switch
                    checked={portfolio.active}
                    onClick={(e) => handleToggle(e, portfolio.portfolio.id, !portfolio.active)}
                  />
                </TableCell>
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
