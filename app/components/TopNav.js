import * as React from 'react'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from 'react-bootstrap/Nav'
import Portfolios from "./Portfolios";
import Models from "./Models";
import Accounts from "./Accounts";
import ModelDetail from "./ModelDetail";


export function TopNav() {
    return (
        <React.Fragment>
            <Row>
                <Col md={{span: 6, offset: 5}}>
                    <Nav activeKey="/home">
                        <Router>
                            <Nav.Link>Blog</Nav.Link> |
                            <Nav.Link> Tutorials</Nav.Link> |
                            <Nav.Link eventKey="disabled" disabled> Support</Nav.Link>
                        </Router>
                    </Nav>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>fithm</Col>
                <Col md={{span: 10}}></Col>
                <Col>Logout</Col>
            </Row>
        </React.Fragment>
    )
}

export function SideNav() {
    return (
        <Row>
            <Router>
                <Col lg={2}>
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/accounts/account_summary">Accounts</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/trade/trade_summary">Trades</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/model/model_summary">Strategies</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/portfolio/portfolio_summary">Portfolios</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/main/profile">Profile</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col lg={10}>
                    <Route exact path='/' component={Portfolios}/>
                    <Route exact path='/model/model_summary' component={Models}/>
                    <Route path={`/model/model_detail/:id`} component={ModelDetail}></Route>

                    <Route path='/accounts/account_summary' component={Accounts}/>
                </Col>
            </Router>
        </Row>
    )
}