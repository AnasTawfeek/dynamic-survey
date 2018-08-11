import {connect} from 'react-redux'
import Test from '../components/Test'
import {add} from '../actions/test'

const mapStateToProps = state => ({
    text: state.test.text
})

const mapDispatchToProps = dispatch => ({
    add: () => dispatch(add())
})

export default connect(mapStateToProps, mapDispatchToProps)(Test);
