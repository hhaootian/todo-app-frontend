import React, { Component } from 'react'

class TodoCompnent extends Component {
    render() {
        return (
            <div>
                Todo Component for id - {this.props.match.params.id}
            </div>
        )
    }
}

export default TodoCompnent