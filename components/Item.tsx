// como podemos ter mais de 1 item, é boa prática fazer esse código reutilizável, e separá-lo em outro arquivo, como um componente.

// como estamos usando typescript, devemos específicar os props do item
// recomendo: https://dev.to/nascimento_/react-o-que-sao-props-5h39
type Props = {
    nome: string
    descricao: string
    imagem: string
    removerItem: Function // como esse item não tem como acessar uma função definida no arquivo `page.tsx`, devemos passar como prop
 }

export default function Item(props: Props) {
    return (
        <div className="flex w-full space-x-10 items-center border-2 border-gray-200 bg-gray-50 rounded-lg p-2">
                <img src={props.imagem} className="aspect-square w-auto h-20 object-cover"/>
            <div className="w-full">
                <p>
                    {props.nome}
                </p>
                <p>
                    {props.nome}
                </p>
            </div>
            <button className="border-2 border-red-300 bg-red-50 px-2 rounded-lg h-min" onClick={() => props.removerItem(props.nome)}>Remover</button>
        </div>
    )
  }
  