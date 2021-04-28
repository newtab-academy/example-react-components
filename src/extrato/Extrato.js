import { useState } from 'react'

function Extrato() {
    const [produtos, setProdutos] = useState([])

    const [codigo, setCodigo] = useState(0);
    let createNewProduct = () => {
        setCodigo(codigo+1)
        setProdutos([...produtos, {codigo: codigo, name: 'Nova mercadoria'}])
    }

    return <>
        <table>
            {
                produtos.map((product) => {
                    return <tr>
                        <td>{product.codigo}</td>
                        <td>{product.name}</td>
                    </tr>
                })
            }
        </table>
        <button onClick={createNewProduct}>Nova compra</button>
    </>

}



export default Extrato