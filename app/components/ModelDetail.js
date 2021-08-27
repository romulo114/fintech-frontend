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

function DeleteModel(props) {
    const deleteModel = () => {
        deleteItem(`/api/assetModels/${props.id}`).then((data) => {
            alert("Model Deleted")
        })
    }
    return <Link to="/">
    <Button variant="danger" onClick={deleteModel}>Delete Strategy</Button></Link>
}

export default function ModelDetail() {
    const {id} = useParams()
    const [positions, setPositions] = React.useState([])
    const [model, setModel] = React.useState({"label": ""})
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
        postCollection(`/api/assetModels/${model.id}/modelPositions`, positions).then(()=> setPositions(positions)).then(() =>
            alert("Positions Updated!"))
    }


    React.useEffect(() => {
        setLoading(true)
        getItem('/api/assetModels/', id).then((response) => {
            response['modelPositions'].forEach((item, index) => {
                //      item.add_row = "+"
                item.delete_row = false
            })
            return response
        }).then((response) => {
            setPositions(response['modelPositions'])
            setModel(response['assetModel'])
            setLoading(false)
        })
    }, [])
    const data = React.useMemo(() => positions, [positions])
    const addRow = () => {
        setPositions(positions.concat([{"model_id": "10002", "symbol": "", "weight": 0.0, "Delete": false}]))
    }
    const columns = React.useMemo(
        () => [
            {
                Header: "Name", accessor: "symbol",
            },
            {Header: "Weight", accessor: "weight"},
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
                <LoadingForm model={model} url={`/api/assetModels/${id}`}/>
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
                <Col>
                    <DeleteModel id={id}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}