import { useEffect, useState } from "react"
import "./List.css"

function List() {

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

            <input type="text" onChange={(e) => { setSearchParam(e.target.value); }} value={searchParam}/>
            <button onClick={() => { handleGoogleSearch() }}>Buscar no google</button>
            <button onClick={() => { setShowModal("none") }}>X</button>
        </div>
    </div>
}

export default List;