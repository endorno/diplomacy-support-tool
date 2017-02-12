/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

import React from 'react'
import {connect} from 'react-redux'
import Field from '../components/Field'

class Game extends React.Component {
    render() {
        return (
            <Field units={this.props.units}>

            </Field>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        units: state.game.units
    };
};

const mapDispatchToProps = () => {
    return {

    };
};


Game = connect(mapStateToProps, mapDispatchToProps)(Game)
export default Game;
