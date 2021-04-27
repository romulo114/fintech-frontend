import React from 'react'
import {fetchModels} from '../utils/api'

export default class Models extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            models: [],
            error: null
        }

        this.updateModels = this.updateModels.bind(this)
        this.isLoading = this.isLoading.bind(this)

    }
    componentDidMount() {
        this.updateModels()
    }


    updateModels() {
        fetchModels().then((models) => this.setState({
            models,
            error: null,
        })).catch((error) => {
            console.warn('Error fetching repos: ', error)
            this.setState({
                error: `There was an error fetching the repositories.`
            })
        })
    }

    isLoading() {
        return this.state.models.length === 0 && this.state.error === null
    }


    render() {
        const {models, error} = this.state;
        return (
            <React.Fragment>
                {this.isLoading() && <p>LOADING</p>}

                {error && <p>{error}</p>}

                <ul>
                    {models.map((task) => (
                        <li key={task}>{task}</li>
                    ))}
                </ul>
            </React.Fragment>
        )
    }
}