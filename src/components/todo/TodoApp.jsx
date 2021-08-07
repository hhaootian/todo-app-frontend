import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'


class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                    </>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

class ListTodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos : 
            [
                {id: 1, description: "Learn React", done: false, targetDate: new Date()},
                {id: 2, description: "Expert", done: false, targetDate: new Date()},
                {id: 3, description: "travel", done: false, targetDate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>description</th>
                            <th>Is Completed?</th>
                            <th>target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map (
                                todo => 
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div><a href="./" className="navbar-brand">website</a></div>
                    <ul className='navbar-nav'>
                        <li><Link className='nav-link' to="/welcome/default">Home</Link></li>
                        <li><Link className='nav-link' to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li ><Link className='nav-link' to="/login">Login</Link></li>
                        <li><Link className='nav-link' to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">
                    All rights reserved. 
                </span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You are logged out. </h1>
                <div className="container">
                    Thank you for using our application. 
                </div>
            </div>
        )
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                Welcome {this.props.match.params.name}!
                You can manage your todos <Link to='/todos'>here</Link>. 
            </div>
        )
    }
}

function ErrorComponent() {
    return (
        <div>Wrong!</div>
    )
}

class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "default",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    loginClicked() {
        // default, 123
        if (this.state.username === "default" && this.state.password === "123"){
            this.props.history.push(`/welcome/${this.state.username}`)
        }
        else {
            this.setState({showSuccessMessage: false, hasLoginFailed: true})
        }
    }

    render() {
        return (
            <div>
                {this.state.showSuccessMessage && <div>Success message</div>}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}

export default TodoApp;
