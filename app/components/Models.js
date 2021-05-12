import React from 'react'
import {fetchModelSummary} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap";
import {Link, Router, Route} from "react-router-dom";
import ModelDetail from "./ModelDetail";
import Nav from "react-bootstrap/Nav";

export default function Models() {
    const [models, setModels] = React.useState([])
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        fetchModelSummary().then((data) => {

            setModels(data["assetModels"])
            setLoading(false)
        })
    }, [])
    const data = React.useMemo(() => models, [models])
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "label",
                Cell: ({row}) =><Nav.Link as={Link} to={`/models/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
            },
            {Header: "Description", accessor: "description"},
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
            <Row>
                <Button>Button</Button>
            </Row>
        </React.Fragment>
    )
}