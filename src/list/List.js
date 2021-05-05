import { useEffect, useState } from "react"
import "./List.css"
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

function List(props) {
    console.log(props)
    const cartoes = [
        {
            number:'0010123123'
        },
        {
            number:'0010asda123123'
        }
    ]

    const [produtos, setProdutos] = useState([])
    const [showModal, setShowModal] = useState("none")
    const [selectedProduct, setSelectedProduct] = useState({})
    let [searchParam, setSearchParam] = useState("")

    useEffect(() => {
        fetch("/json/produtos.json")
        .then((data_raw) => data_raw.json())
        .then((result) => {
            console.log(result)
            setProdutos(result)
        })
    },[])
    

    const handleClick = (obj) => {
        // alert(JSON.stringify(obj))
        if (selectedProduct.codigo == obj.codigo) {
            setShowModal("none")
        } else {
            setShowModal("block")
            setSelectedProduct(obj)
        }

    }

    const handleGoogleSearch = () => {
        console.log(searchParam)
        // window.open("https://www.google.com/search?q="+searchParam+" "+selectedProduct.nome, "_blank")
        fetch("/json/resposta.json", {
            method:"GET",
            // body:{
            //     nome: selectedProduct.nome
            // }
        }).then((data_raw) => data_raw.json())
        .then((result) => {
            if (result.status == "success") {
                setShowModal("none")
                setSearchParam("")

                alert(result.description)
            } else {
                alert("Confira seu modal novamente")
            }
        }).catch(err => console.log(err))
    }

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
        <h1>Listagem de produtos</h1>
        <table className="cotornado">
            <tr>
                <td className="cotornado negrito">
                    Código
                </td>
                <td className="cotornado">
                    Nome do produto
                </td>
                <td className="cotornado">
                    Preço
                </td>
            </tr>

            {produtos.map((obj, index) => {
                return <tr key={"linha-de-produto-" + index} onClick={(e) => {
                    handleClick(obj)
                }}>
                    <td className="cotornado">
                        {obj.codigo}
                    </td>
                    <td className="cotornado">
                        <span style={{color: obj.cor}}>
                            {obj.nome}
                        </span>
                    </td>
                    <td className="cotornado">
                        {obj.preco}
                    </td>
                </tr>
            })}
        </table>


        <div className="modal" style={{display:showModal}}>
            {
                selectedProduct.nome
            }
            <select>
                <option value=""> Selecione um cartão </option>
                {cartoes.map((cartao, i) => {
                    return <option value={cartao.number} key={'opcaoCartao' + i}>
                        {cartao.number}
                    </option>
                })}
            </select>
            <input type="text" onChange={(e) => { setSearchParam(e.target.value); }} value={searchParam}/>
            <button onClick={() => { handleGoogleSearch() }}>Buscar no google</button>
            <button onClick={() => { setShowModal("none") }}>X</button>
        </div>
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(List);