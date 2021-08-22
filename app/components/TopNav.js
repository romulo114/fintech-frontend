import * as React from 'react'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from 'react-bootstrap/Nav'
import Portfolios from "./Portfolios";
import Models from "./Models";
import Accounts from "./Accounts";
import ModelDetail from "./ModelDetail";
import AccountDetail from "./Account";
import PortfolioDetail from "./Portfolio";
import Trades from "./Trades";
import TradeDetail from "./Trade";
import PortfolioAssignStrategy from "./PortfolioAssignStrategy";


export function TopNav() {
    return (
        <React.Fragment>
            <Row>
                <Col md={{span: 6, offset: 5}}>
                    <Nav activeKey="/home">
                        <Router>
                            <Nav.Link disabled>Blog</Nav.Link> |
                            <Nav.Link disabled> Tutorials</Nav.Link> |
                            <Nav.Link disabled> Support</Nav.Link>
                        </Router>
                    </Nav>
                </Col>
            </Row>
            <Row>
                <Col><h3>DIYInvesting</h3></Col>
                <Col md={{span: 10}}></Col>
            </Row>
        </React.Fragment>
    )
}

export function SideNav() {

    return (
        <Row>
            <Router>
                <Col lg={2}>
                    <Nav className="flex-column bg-light">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Accounts</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/portfolios">Portfolios</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/trades">Trades</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/models">Strategies</Nav.Link>
                        </Nav.Item>
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link as={Link} to="/portfolio/portfolio_summary">Portfolios</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link as={Link} to="/main/profile">Profile</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                    </Nav>
                </Col>
                <Col lg={10}>
                    <Route exact path='/'><Accounts/></Route>
                    <Route exact path='/portfolios'><Portfolios/></Route>
                    <Route exact path='/models'><Models/></Route>
                    <Route exact path='/models/:id'><ModelDetail/></Route>
                    <Route exact path='/accounts/:id'><AccountDetail/></Route>
                    <Route exact path='/portfolios/:id'><PortfolioDetail/></Route>
                    <Route exact path='/trades'><Trades/></Route>
                    <Route exact path='/trades/:id'><TradeDetail/></Route>
                    <Route exact path='/portfolio_assign_strategy/:id'><PortfolioAssignStrategy assign={true}/></Route>
                </Col>
            </Router>
        </Row>
    )
}