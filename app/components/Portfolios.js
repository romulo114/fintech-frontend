import React from 'react'
import {getCollection, postCollection} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap"
import {Link, Router, Route} from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import {NewItem, StandardTable} from "./UtilityComponents";


export default function Portfolios(props) {
    const [portfolios, setPortfolios] = React.useState([])
    const [loading, setLoading] = React.useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        if (typeof value === "boolean") value = !value
        setPortfolios(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    React.useEffect(() => {
        let unmounted = false
        setLoading(true)
        getCollection('/api/portfolios').then((data) => {
            if (unmounted) {
                return; // not mounted anymore. bail.
            }
            if (props.trade) {
                data['portfolios'].forEach((item, index) => {
                    //      item.add_row = "+"
                    item.delete_row = false
                })
            }
            setPortfolios(data["portfolios"])
            setLoading(false)
        })
        return () => unmounted = true;
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
    } = useTable({columns, data, autoResetPage: !skipPageReset, updateMyData})


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
                <NewItem url='/api/portfolios'
                         items={portfolios}
                         setItems={setPortfolios}
                         seed={{"portfolio": {"label": "Name Me"}}}
                         buttonLabel='Add Portfolio'
                         itemType='portfolio'
                />
            </Row>

        </React.Fragment>
    )
}