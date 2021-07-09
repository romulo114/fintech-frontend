import React from 'react'
import {getCollection, postCollection} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap"
import {Link, Router, Route} from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import {NewItem, StandardTable} from "./UtilityComponents";


export default function Trades() {
    const [trades, setTrades] = React.useState([])
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        getCollection('/api/trades').then((data) => {
            setTrades(data["trades"])
            setLoading(false)
        })
    }, [])


    const data = React.useMemo(() => trades, [trades])
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "label",
                Cell: ({row}) => <Nav.Link as={Link}
                                           to={`/trades/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
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
                <StandardTable
                    getTableProps={getTableProps}
                    getTableBodyProps={getTableBodyProps}
                    headerGroups={headerGroups}
                    rows={rows}
                    prepareRow={prepareRow}
                />
            </Row>
            <Row>
                <NewItem url='/api/trades'
                         items={trades}
                         setItems={setTrades}
                         seed={{"trade": {"label": "Name Me"}}}
                         buttonLabel='Add Trade'
                         itemType='trade'
                />
            </Row>

        </React.Fragment>
    )
}