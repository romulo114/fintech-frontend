import React from 'react'
import {getCollection, postCollection} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap"
import {Link, Router, Route} from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import {NewItem, StandardTable} from "./UtilityComponents";


export default function Accounts(props) {
    const [accounts, setAccounts] = React.useState([])
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        let unmounted = false
        setLoading(true)
        let url = '/api/accounts'
        if ('portfolio_id' in props) {url = url + `?portfolio_id=${props.portfolio_id}`}
        getCollection(url).then((data) => {
            if (unmounted) {
                return; // not mounted anymore. bail.
            }
            setAccounts(data["accounts"])
            setLoading(false)
        })
        return () => unmounted = true;
    }, [])


    const data = React.useMemo(() => accounts, [accounts])
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "label",
                Cell: ({row}) => <Nav.Link as={Link}
                                           to={`/accounts/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
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
                <NewItem url='/api/accounts'
                         items={accounts}
                         setItems={setAccounts}
                         seed={{"account": {"label": "Name Me"}}}
                         buttonLabel='Add Account'
                         itemType='account'
                />
            </Row>

        </React.Fragment>
    )
}