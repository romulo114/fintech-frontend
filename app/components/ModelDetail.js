import React from 'react'
import {Button, Row} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import {useTable} from "react-table";

import {EditableCell} from "./EditableCell"
import {fetchModelDetail} from "../utils/api";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

export default function ModelDetail() {
    const { id } = useParams()
    const [positions, setPositions] = React.useState([])
    const [model, setModel] = React.useState({})
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        fetchModelDetail(id).then((response) => {
            setPositions(response['assetModel']['positions'])
            setModel(response['assetModel'])
            setLoading(false)
        })
    }, [])

    const data = React.useMemo(() => positions, [positions])

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
    } = useTable({columns, data, defaultColumn})


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