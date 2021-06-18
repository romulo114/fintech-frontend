import React from 'react'
import {getCollection, postCollection} from '../utils/api'
import {useTable} from "react-table"
import {Button, Row} from "react-bootstrap"
import {Link, Router, Route} from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import {NewItem, StandardTable} from "./UtilityComponents";

function NewModel(props) {
    const addModel = () => {
        postCollection('/api/assetModels').then((data) => {
            props.setModels(data["assetModels"])
        })
    }
    return <Button onClick={addModel}>Add Strategy</Button>
}

export default function Models() {
    const [models, setModels] = React.useState([])
    const [loading, setLoading] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        getCollection('/api/assetModels').then((data) => {
            setModels(data["assetModels"])
            setLoading(false)
        })
    }, [])


    const data = React.useMemo(() => models, [models])
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "label",
                Cell: ({row}) => <Nav.Link as={Link}
                                           to={`/models/${row.original.id}`}>{String(row.original.label)}</Nav.Link>
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
                    prepareRow={prepareRow}/>
            </Row>
            <Row>
                <NewItem url='/api/assetModels'
                         items={models}
                         setItems={setModels}
                         seed={{"assetModel": {"label": "Name Me"}}}
                         buttonLabel='Add Model'
                         itemType='assetModel'
                />
            </Row>

        </React.Fragment>
    )
}