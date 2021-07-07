import React from 'react'
import {Button, Row, Form, Col} from "react-bootstrap";
import {useParams, Link} from 'react-router-dom';
import {useTable} from "react-table";

import {EditableCell, EditableCheckbox, LoadingForm, StandardTable} from "./UtilityComponents"
import {deleteItem, getItem, postCollection} from "../utils/api";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

function DeleteAccount(props) {
    const deleteAccount = () => {
        deleteItem(`/api/accounts/${props.id}`).then((data) => {
            alert("Account Deleted")
        })
    }
    return <Link to="/">
        <Button onClick={deleteAccount}>Delete Strategy</Button></Link>
}

export default function AccountDetail() {
    const {id} = useParams()
    const [positions, setPositions] = React.useState([])
    const [account, setAccount] = React.useState({"label": ""})
    const [loading, setLoading] = React.useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        if (typeof value === "boolean") value = !value
        setPositions(old =>
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
    const saveData = () => {
        postCollection(`/api/accounts/${account.id}/accountPositions`, positions).then(()=> setPositions(positions)).then(() =>
            alert("Positions Updated!"))
    }


    React.useEffect(() => {
        setLoading(true)
        getItem('/api/accounts/', id).then((response) => {
            response['accountPositions'].forEach((item, index) => {
                //      item.add_row = "+"
                item.delete_row = false
            })
            return response
        }).then((response) => {
            setPositions(response['accountPositions'])
            setAccount(response['account'])
            setLoading(false)
        })
    }, [])
    const data = React.useMemo(() => positions, [positions])
    const addRow = () => {
        setPositions(positions.concat([{"account_id": "10002", "symbol": "", "shares": 0.0, "Delete": false}]))
    }
    const columns = React.useMemo(
        () => [
            {
                Header: "Name", accessor: "symbol",
            },
            {Header: "Shares", accessor: "shares"},
            {
                Header: "Delete", accessor: "delete_row",
                Cell: EditableCheckbox
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

    } = useTable({columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData})

    if (loading === true) {
        return <p>Loading...</p>
    }
    return (<React.Fragment>
            <Row>
                <LoadingForm model={account}/>
            </Row>
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
                <Col>
                    <Button onClick={addRow}>Add Asset</Button>
                </Col>
                <Col>
                    <Button onClick={saveData}>Save Positions</Button>
                </Col>
            </Row>
            <Row>
                <DeleteAccount id={id}/>
            </Row>
        </React.Fragment>
    )
}