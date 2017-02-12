import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

const SEND = 'send';
const initialState = {
    value: null,
};

function send(value) {
    return {
        type: SEND,
        value: value,
    };
}

function formReducer(state, action) {
    switch (action.type) {
        case SEND:
            return Object.assign({}, state, {
                value: action.value
            });
        default:
            return state;
    }
}

const store = createStore(formReducer, initialState);


class FormApp extends React.Component {
    render() {
        return (
            <div>
                <FormInput handleClick={this.props.onClick}/>
                <FormDisplay data={this.props.value}/>
            </div>
        );
    }
}

FormApp.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
};

class FormInput extends React.Component {
    send(e) {
        e.preventDefault();
        this.props.handleClick(this.myInput.value.trim());
        this.myInput.value = '';
        return;
    }

    render() {
        return (
            <form>
                <input type="text" ref={(ref) => (this.myInput = ref)} defaultValue=""/>
                <button onClick={(event) => this.send(event)}>Send</button>
            </form>
        )
    }
}

FormInput.propTypes = {
    handleClick: React.PropTypes.func.isRequired
};

class FormDisplay extends React.Component {
    render() {
        return (
            <div>{this.props.data}</div>
        );
    }
}

FormDisplay.propTypes = {
    data: React.PropTypes.string
};


function mapStateToProps(state) {
    return {
        value: state.value
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick(value) {
            dispatch(send(value));
        },
    };
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormApp);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
)
;
