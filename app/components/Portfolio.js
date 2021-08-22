import React from 'react'
import {Button, Row, Form, Col} from "react-bootstrap";
import {useParams, Link} from 'react-router-dom';
import {useTable} from "react-table";

import {EditableCheckbox, LoadingForm, StandardTable} from "./UtilityComponents"
import {deleteItem, getItem, postCollection, postItem} from "../utils/api";
import Accounts from "./Accounts";


function DeletePortfolio(props) {
    const deletePortfolio = () => {
        deleteItem(`/api/portfolios/${props.id}`).then((data) => {
            alert("Portfolio Deleted")
        })
    }
    return <Link to="/">
        <Button onClick={deletePortfolio}>Delete Strategy</Button></Link>
}

export default function PortfolioDetail() {
    const {id} = useParams()
    const [accounts, setAccounts] = React.useState([])
    const [portfolio, setPortfolio] = React.useState({})
    const [assetModel, setAssetModel] = React.useState({})
    const [loading, setLoading] = React.useState(true)
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
    const saveData = () => {
        postItem(`/api/portfolios/unassign/${portfolio.id}`, accounts).then(() => setAccounts(accounts)).then(() =>
            alert("Accounts Updated!"))
    }

    React.useEffect(() => {
        getItem('/api/portfolios/', id).then((response) => {
            response['accounts'].forEach((item, index) => {
                item.delete_row = false
            })
            setAccounts(response['accounts'])
            setPortfolio(response['portfolio'])
            setLoading(false)
            getItem(`/api/assetModels/`, response['portfolio']['assetModel']).then((response) => {
                setAssetModel(response['assetModel'])
            })
        })
    }, [])
    const data = React.useMemo(() => accounts, [accounts])
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
                <Col>
                    <LoadingForm model={portfolio} url={`/api/portfolios/${id}`}/>
                </Col>
                <Col>
                    <p>Asset Model: {assetModel['label']}</p>
                    <Link to={`/portfolio_assign_strategy/${id}`}>Assign</Link>
                </Col>
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
                <DeletePortfolio id={id}/>
            </Row>
            <Row>
                <Accounts portfolioId={id} not={true} port={true} loading={loading}/>
            </Row>
        </React.Fragment>
    )
}