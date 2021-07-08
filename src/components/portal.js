import React from 'react';
import ReactDOM from 'react-dom';
class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.appRoot = document.getElementById('root');
        this.modalRoot = document.getElementById('modal-root');
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Portal;