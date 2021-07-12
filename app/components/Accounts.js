import React from 'react'
import {getCollection, postCollection} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap"
import {Link, Router, Route} from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import {AssignItem, EditableCheckbox, NewItem, StandardTable} from "./UtilityComponents";


export default function Accounts(props) {
    const [accounts, setAccounts] = React.useState([])
    const [loading, setLoading] = React.useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        if (typeof value === "boolean") value = !value
        setAccounts(old =>
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
        let url = '/api/accounts'
        if ('portfolioId' in props) {
            url = url + `?portfolioId=${props.portfolioId}`
        }
        if ('not' in props) {
            url = url + `&not=${props.not}`
        }
        getCollection(url).then((data) => {
            if (unmounted) {
                return; // not mounted anymore. bail.
            }
            if (props.port) {
                data['accounts'].forEach((item, index) => {
                    //      item.add_row = "+"
                    item.delete_row = false
                })
            }
            setAccounts(data["accounts"])
            setLoading(false)
        })
        return () => unmounted = true;
    }, [])


    const data = React.useMemo(() => accounts, [accounts])
    const columns = React.useMemo(
        () => {
            let columnAttrs = [
            {
                Header: "Name",
                accessor: "label",
                Cell: ({row}) => <Nav.Link as={Link}
                                           to={`/accounts/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
            },
            // {Header: "Description", accessor: "description"},
        ]
            if (props.port) {columnAttrs.push({
                Header: "Delete", accessor: "delete_row",
                Cell: EditableCheckbox
            })}
        return columnAttrs},
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
                {props.port ? <AssignItem url={`/api/accounts/assign/${props.portfolioId}`}
                                             items={accounts}
                                             setItems={setAccounts}
                                             buttonLabel='Assign Account'
                                             itemType='account'
                /> : <NewItem url='/api/accounts'
                                  items={accounts}
                                  setItems={setAccounts}
                                  seed={{"account": {"label": "Name Me"}}}
                                  buttonLabel='Add Account'
                                  itemType='account'
                />}

            </Row>

        </React.Fragment>
    )
}