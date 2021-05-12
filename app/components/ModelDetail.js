import React from 'react'
import {fetchModelDetail} from "../utils/api";
import {useTable} from "react-table";
import {Button, Row} from "react-bootstrap";
import { useParams } from 'react-router-dom';

export default function ModelDetail() {
    const { id } = useParams()
    const [model, setModel] = React.useState([])
    const [loading, setLoading] = React.useState(null)


    React.useEffect(() => {
        setLoading(true)
        fetchModelDetail(id).then((data) => {
            setModel(data['assetModel']['positions'])
            setLoading(false)
        })
    }, [])

    const data = React.useMemo(() => model, [model])

    const columns = React.useMemo(
        () => [
            {
                Header: "Symbol", accessor: "symbol",
            },
            {Header: "Weight", accessor: "weight"},
        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})


    if (loading === true) {
        return <p>Loading...</p>
    }

    return (<React.Fragment>
            <Row>
                <table {...getTableProps()}>
                    <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Row>
        </React.Fragment>
    )
}