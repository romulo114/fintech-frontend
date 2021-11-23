import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ModelInfo } from 'types/model'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Checkbox
} from '@mui/material'
import { usePagedData } from 'hooks/use-paged-data'

type StrategySelectTableProps = {
  publics: ModelInfo[];
  privates: ModelInfo[];
  value: ModelInfo | null;
  setModel: (id: ModelInfo | null) => void;
  editing: boolean;
}
export const StrategySelectTable: React.FC<StrategySelectTableProps> = (props) => {

  const { publics, privates, value, setModel, editing } = props
  const history = useHistory()

  const [all, setAll] = useState<ModelInfo[]>([])
  const [pageSize, setPageSize] = useState(2)
  const [page, setPage] = useState(0)
  const { data } = usePagedData<ModelInfo>(all, page, pageSize)

  useEffect(() => {
    setAll([...privates, ...publics])
  }, [publics, privates])

  const changePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  }, [])

  const onSelect = (e: React.MouseEvent, id: number): void => {
    e.preventDefault()
    history.push(`/user/business/strategies/${id}`)
  }

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }, [])

  const onSelectOne = (e: React.ChangeEvent<HTMLInputElement>, model: ModelInfo): void => {
    if (e.target.checked) {
      setModel(model)
    } else {
      setModel(null)
    }
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {editing && (
                <TableCell padding='checkbox'>
                </TableCell>
              )}
              <TableCell key='id' style={{ minWidth: 120 }}>Name</TableCell>
              <TableCell key='broker' style={{ minWidth: 120 }}>Keywords</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editing && data.map(model => (
              <TableRow
                hover
                key={model.id}
                sx={{ cursor: 'pointer' }}
                onClick={e => onSelect(e, model.id)}
              >
                {editing && (
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={value?.id === model.id}
                      onChange={e => onSelectOne(e, model)}
                      onClick={onClick}
                    />
                  </TableCell>
                )}
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.keywords.join(', ')}</TableCell>
              </TableRow>
            ))}
            {!editing && (
              <TableRow
                hover
                sx={{ cursor: 'pointer' }}
                onClick={!value ? undefined : e => onSelect(e, value.id)}
              >
                {!value ? (
                  <TableCell rowSpan={2}>Not selected</TableCell>
                ) : (
                  <>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.keywords.join(', ')}</TableCell>
                  </>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {editing && pageSize < all.length && (
        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 20, 50]}
          component='div'
          count={all.length}
          page={page}
          onPageChange={changePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={changePageSize}
        />
      )}
    </>
  )
}
