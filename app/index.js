import * as React from 'react'
import * as ReactDOM from 'react-dom'
import makeServer from "./server";
import {TopNav, SideNav} from "./components/TopNav";
import 'regenerator-runtime/runtime'
import Container from "react-bootstrap/Container"
import 'bootstrap/dist/css/bootstrap.min.css';


makeServer();

class App extends React.Component {
    render() {
        return (<Container>
                <TopNav/>
                <SideNav/>
            </Container>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)