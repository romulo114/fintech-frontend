import React from 'react'
import {Button, Row, Form, Col} from "react-bootstrap";
import {useParams, Link} from 'react-router-dom';
import {useTable} from "react-table";

import {EditableCheckbox, LoadingForm, StandardTable} from "./UtilityComponents"
import {deleteItem, getItem, postCollection, postItem} from "../utils/api";
import Accounts from "./Accounts";
import Portfolios from "./Portfolios";


function DeleteTrade(props) {
    const deleteTrade = () => {
        deleteItem(`/api/trades/${props.id}`).then((data) => {
            alert("Trade Deleted")
        })
    }
    return <Link to="/">
        <Button onClick={deleteTrade}>Delete Strategy</Button></Link>
}

export default function TradeDetail() {
    const {id} = useParams()
    const [portfolios, setPortfolios] = React.useState([])
    const [trade, setTrade] = React.useState({"label": ""})
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
    const saveData = () => {
        postItem(`/api/trades/unassign/${trade.id}`, portfolios).then(()=> setPortfolios(portfolios)).then(() =>
            alert("Trades Updated!"))
    }

    React.useEffect(() => {
        setLoading(true)
        getItem('/api/trades/', id).then((response) => {

            response['portfolios'].forEach((item, index) => {
                item.delete_row = false
            })
            setPortfolios(response['portfolios'])
            setTrade(response['trade'])
            setLoading(false)
        })
    }, [])
    const data = React.useMemo(() => portfolios, [portfolios])
    const columns = React.useMemo(
        () => [
            {
                Header: "Label", accessor: "label",
            },
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

    } = useTable({columns, data, autoResetPage: !skipPageReset, updateMyData})

    if (loading === true) {
        return <p>Loading...</p>
    }
    return (<React.Fragment>
            <Row>
                <LoadingForm model={trade} url={`/api/trades/${id}`}/>
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
                    <Button onClick={saveData}>Save Positions</Button>
                </Col>
            </Row>
            <Row>
                <DeleteTrade id={id}/>
            </Row>
            <Row>
                <Portfolios tradeId={id} not={true} trade={true}/>
            </Row>
        </React.Fragment>
    )
}