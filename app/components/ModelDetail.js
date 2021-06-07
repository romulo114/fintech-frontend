import React from 'react'
import {Button, Row, Form, Col} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {useTable} from "react-table";

import {EditableCell, EditableCheckbox, LoadingForm} from "./UtilityComponents"
import {fetchModelDetail, postModelPositions} from "../utils/api";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
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
        postModelPositions(model.id, positions)
    }


    React.useEffect(() => {
        setLoading(true)
        fetchModelDetail(id).then((response) => {
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
                Header: "Symbol", accessor: "symbol",
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
                <LoadingForm id={model.id}/>
            </Row>
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
                <Col>
                    <Button onClick={addRow}>Add Asset</Button>
                </Col>
                <Col>
                    <Button onClick={saveData}>Update Model Positions</Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}