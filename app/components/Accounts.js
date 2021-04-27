import React from 'react'
import {fetchAccounts} from '../utils/api'
import {useTable} from "react-table"

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
            {Header: "Account ID", accessor: "account_id"},
            {Header: "Broker", accessor: "broker"},
            {Header: "Assigned Portfolio ID", accessor: "portfolio_id"},
            {Header: "Actions", accessor: "actions"}
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
    return (
        <table {...getTableProps()}>
            <thead>
            {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    column.render('Header')}
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
    )
}

