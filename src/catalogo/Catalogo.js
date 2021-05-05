import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { increment, decrement, reset } from '../actions'

const mapStateToProps = (state) => {
    return {
       counter: state
    };
 };
 const mapDispatchToProps = (dispatch) => {
    return {
       increment: () => dispatch(increment()),
       decrement: () => dispatch(decrement()),
       reset: () => dispatch(reset())
    };
 };

function Catalogo(props) {
    const [produtos, setProdutos] = useState([])
   


    return <div>
        <div>{props.counter}</div>
        <div>
            <button onClick={props.increment}>++</button>
        </div>
        <div>
            <button onClick={props.decrement}>--</button>
        </div>
        <div>
            <button onClick={props.reset}>Reset</button>
        </div>
        <ul>
            {produtos.map((prod, k) => {
                return <li key={'li'+k}>{prod.nome}</li>
            })}
        </ul>
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo)