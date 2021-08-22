import React from 'react'
import {getCollection, getItem, postCollection, postItem} from '../utils/api'
import {useTable} from "react-table"
import {Button, Col, Row} from "react-bootstrap"
import {Link, Router, Route, useParams} from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import {EditableCheckbox, NewItem, StandardTable} from "./UtilityComponents"
import { useHistory } from "react-router-dom";

function NewModel(props) {
    const addModel = () => {
        postCollection('/api/assetModels').then((data) => {
            props.setModels(data["assetModels"])
        })
    }
    return <Button onClick={addModel}>Add Strategy</Button>
}

export default function PortfolioAssignStrategy(props) {
    const {id} = useParams()
    const [models, setModels] = React.useState([])
    const [portfolio, setPortfolio] = React.useState({})
    const [assetModel, setAssetModel] = React.useState({})
    const [loading, setLoading] = React.useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    let history = useHistory();

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        if (typeof value === "boolean") value = !value
        setModels(old =>
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

    const handleAssignment = (modelId, portfolioId) => {
        postItem(`/api/portfolios/assignModel`, {"modelId": modelId, "portfolioId": portfolioId}).then(() =>
            history.push(`/portfolios/${id}`)
        )
    }

    React.useEffect(() => {
        setLoading(true)
        getCollection('/api/assetModels').then((data) => {
            data['assetModels'].forEach((item, index) => {
                item.delete_row = false
            })
            setModels(data["assetModels"])
            setLoading(false)
        })
        getItem('/api/portfolios/', id).then((response) => {
            setPortfolio(response['portfolio'])
            getItem(`/api/assetModels/`, response['portfolio']['assetModel']).then((response) => {
                setAssetModel(response['assetModel'])
            })
        })

    }, [])


    const model_data = React.useMemo(() => models, [models])
    const columns = React.useMemo(
        () => {
            if (!props.assign) {
                return [
                    {
                        Header: "Name",
                        accessor: "label",
                        Cell: ({row}) => <Nav.Link as={Link}
                                                   to={`/models/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
                    },
                ]
            } else {
                return [
                    {
                        Header: "Name",
                        accessor: "label",
                    },
                    {
                        Header: "Name",
                        accessor: "delete_row",
                        Cell: ({row}) => <Button onClick={() => handleAssignment(row.original.id, id)}>Assign</Button>
                    },
                ]
            }
        },
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: model_data, autoResetPage: !skipPageReset, updateMyData})


    if (loading === true) {
        return <p>Loading...</p>
    }
    return (<React.Fragment>
            <Row>
                <Col>
                    {portfolio["label"]}
                </Col>
                <Col>{assetModel["label"]}</Col>
            </Row>
            <Row>
                <StandardTable
                    getTableProps={getTableProps}
                    getTableBodyProps={getTableBodyProps}
                    headerGroups={headerGroups}
                    rows={rows}
                    prepareRow={prepareRow}/>
            </Row>

            {/*<Row>*/}
            {/*    <NewItem url='/api/assetModels'*/}
            {/*             items={models}*/}
            {/*             setItems={setModels}*/}
            {/*             seed={{"assetModel": {"label": "Name Me"}}}*/}
            {/*             buttonLabel='Add Model'*/}
            {/*             itemType='assetModel'*/}
            {/*    />*/}
            {/*</Row>*/}

        </React.Fragment>
    )
}