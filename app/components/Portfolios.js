import React from 'react'
import {getCollection, postCollection} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap"
import {Link, Router, Route} from "react-router-dom"
import Nav from "react-bootstrap/Nav"

function NewPortfolio(props) {
    const addPortfolio = () => {
        postCollection('/api/portfolios',
            JSON.stringify({"portfolio": {"label": "Name Me"}})).then((data) => {
            props.setPortfolios(props.portfolios.concat(data["portfolio"]))
        })
    }
    return <Button onClick={addPortfolio}>Add Portfolio</Button>
}

export default function Portfolios() {
    const [portfolios, setPortfolios] = React.useState([])
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        getCollection('/api/portfolios').then((data) => {
            setPortfolios(data["portfolios"])
            setLoading(false)
        })
    }, [])


    const data = React.useMemo(() => portfolios, [portfolios])
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "label",
                Cell: ({row}) => <Nav.Link as={Link}
                                           to={`/portfolios/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
            },
            // {Header: "Description", accessor: "description"},
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
                <NewPortfolio portfolios={portfolios} setPortfolios={setPortfolios}/>
            </Row>

        </React.Fragment>
    )
}