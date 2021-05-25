import React from 'react'
import {Button, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {useTable} from "react-table";

import {EditableCell} from "./EditableCell"
import {fetchModelDetail} from "../utils/api";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}


export default function ModelDetail() {
    const {id} = useParams()
    const [positions, setPositions] = React.useState([])
    const [model, setModel] = React.useState({})
    const [loading, setLoading] = React.useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
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
        setLoading(true)
        fetchModelDetail(id).then((response) => {
            response['assetModel']['positions'].forEach((item, index)=>{
                item.add_row = "+"
                item.delete_row = "-"
            })
            return response
        }).then((response) => {
            setPositions(response['assetModel']['positions'])
            setModel(response['assetModel'])
            setLoading(false)
        })
    }, [])
    const data = React.useMemo(() => positions, [positions])
    const addRow = () => {
        setPositions(positions.concat([{"model_id": "10002", "symbol": "SPY", "weight": 0.1}]))
    }
    const columns = React.useMemo(
        () => [
            {
                Header: "", accessor: "add_row",
                Cell:  ({ value }) => String(value)
            },
            {
                Header: "Symbol", accessor: "symbol",
            },
            {Header: "Weight", accessor: "weight"},
            {Header: "", accessor: "delete_row",
                Cell:  ({ value }) => String(value)}
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
                <Button onClick={addRow}>Button</Button>
            </Row>
        </React.Fragment>
    )
}