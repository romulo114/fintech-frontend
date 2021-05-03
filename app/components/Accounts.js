import React from 'react'
import {fetchAccounts} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap";

export default function Accounts() {
    const [accounts, setAccounts] = React.useState([])
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        fetchAccounts().then((data) => {
            setAccounts(data)
            setLoading(false)
        })
    }, [])
    const data = React.useMemo(() => accounts, [accounts])
    const columns = React.useMemo(
        () => [
            {Header: "Account Number", accessor: "account_number"},
            {Header: "Broker", accessor: "broker_name"},
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

