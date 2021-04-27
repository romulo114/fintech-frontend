import React from 'react'
import {fetchPortfolios} from '../utils/api'

export default class Portfolios extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []}

        this.updatePortfolios = this.updatePortfolios.bind(this)
    }

    componentDidMount() {
        this.updatePortfolios()
    }

    updatePortfolios() {
        fetchPortfolios().then((user) => this.setState({
            user,
            error: null,
        })).catch((error) => {
            console.warn('Error fetching repos: ', error)
            this.setState({
                error: `There was an error fetching the repositories.`
            })
        })
    }

    render() {
        const {user} = this.state;
         return <div>
            <ul>
                {user.map((task) => (
                    <li key={task}>{task}</li>
                ))}
            </ul>
        </div>
    }
}