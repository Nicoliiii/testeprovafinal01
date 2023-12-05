'use client' // como todas as interações ocorrem no computador do usuário, devemos deixar isso explicito - https://nextjs.org/docs/app/building-your-application/rendering#the-use-client-directive
/* 
por padrão, o React renderiza no servidor. isso tudo no servidor. isso permite carregamentos mais rápidos e páginas mais leves

*/

/* 
como estamos usando typescript, devemos adicionar "tipagem" às variáveis, ou seja, declara qual seu tipo (número, texto, etc)
exceto quando entre {colchetes}, o texto depois de `:`, e às vezes entre <setas>, denota a tipagem. 
por exemplo, `numero_de_pessoas: number = 5`, ou `const [pessoa, atualizarPessoa] = useState<CadastroPessoa>()`
*/

import Item from '../components/Item' // reuitilizaremos esse item, portanto o código dele é contido em outro arquivo
import { useState } from 'react'

export default function Home() {
  // usamos o useState para acompanhar o nosso único dado; uma lista dos itens
  const [itens, atualizarItens] = useState<any[]>([]) // recomendo https://pt-br.legacy.reactjs.org/docs/hooks-state.html
  // mas basicamente, useState retorna uma variável com um item, e uma função que deve se rchamada para atualizar o item (ex. atualizarItens(novosItens))
  
  function adicionarItem(e: React.FormEvent<HTMLFormElement>) { // `event` geralmente é abreviado `e`
    // essa função será chamada ao enviar o formulário. por padrão, isso reinicia a página, portanto prevenimos isso abaixo
    e.preventDefault() 

    // event.target é o formulário
    // convenientemente, cada item do formulário é accessado pelo seu índice (0, 1, etc)
    let nome = e.target[0].value // pegar valor do item
    let descricao = e.target[1].value
    let imagem = e.target[2].value

    // checar se qualquer um dos campos estão em branco
    if (nome.length == 0 || descricao.length == 0 || imagem.length == 0) {
      alert('Preencha todos os campos') // abrir um alerta no navegador
      return // parar a função aqui
    }

    const novo_item = {
      nome: nome,
      descricao: descricao,
      imagem: imagem
    } // novo item como objeto
    atualizarItens([...itens, novo_item]) // os novos dados são os dados antigos, MAIS o novo dado
    // recomendo: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  }

  function removerItem(nome: string) {
    // filter: passa por todos os itens, e remove tal item se a condição dada é verdadeira, se não, mantenha-o
    // no caso, checamos se os dois nomes combinam, e criamos uma nova lista sem o item
    // NOTA: caso 2 itens tenham o mesmo nome, os dois itens serão removidos
    let novos_itens = itens.filter(item => item.nome != nome) 

    atualizarItens(novos_itens)
  }

  // devemos retornar um elemento em HTML, que será exibido na página
  /* 
  os nomes separados por espaço dentro do campo className são classes do TailWind. 
  se tiver duvida com algum, pesquise seu nome em https://tailwindcss.com/
  alguns padrões:
  flex: deixa tudo na mesma linha
  flex-col: deixa tudo na mesma coluna (precisa do `flex`) (sim, é meio confuso)
  p-[numero]: adiciona espaçamento interno no item
  m[x/y]-[numero]: adiciona espacameno externo no item
  space-[x/y]-[numero]: adiciona espacamento entre os itens contidos nesse item, no eixo x (horizontal) ou y (vertical)
  bg-[cor]-[intensidade]: adiciona fundo com cor e intensidade especificada
  rounded-[md/lg/etc]: arredonda os cantos do item
  border-[numero]: grosurra da borda
  etc.

  algumas classes são definidas em `globals.css`, por conveniencia
  */

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Gerenciador de produtos</h1>
      <div>
        {/* 
        usamos um elemento <form> (do inglês, "formulário") para deixar claro que aqui vamos coletar dados do usuário através de campos.
        eventualmente, faremos submit (do inglês, "enviar") do formulário. para fazer isso,
        temos um botão de tipo "submit". quando esse botão é apertado, emite o evento submit, e podemos especificar
        o que acontece nesse evento atráves do onSubmit. no caso, queremos chamar a função adicionarItem.
        note que na definição da função adicionarItem (mais abaixo), temos um parâmetro `e`, que é "secretamente" passado por
        consequência do jeito que foi escrito aqui. é simplesmente um truque do typescript/javascript. 
        Outra possibilidade seria:
        onSubmit={(evento) => adicionarItem(evento)}
        */}
        <form onSubmit={adicionarItem} className='w-full flex flex-col space-y-4 my-10'>
          {/* placeholder: texto que exibe quando o campo está vazio, ajuda a guiar o usuário */}
          <input type="text" name="nome" placeholder='nome do produto'/> 
          <input type="text" name="descrição" placeholder='descrição do produto'/> 
          {/* queremos um link, portanto, type="url" */}
          <input type="url" name="imagem" placeholder='link da imagem'/>
          <button type="submit" className='border-2 rounded-lg border-green-300 bg-green-200'>Adicionar</button>
        </form>
      </div>
      <div id="lista" className='space-y-5 w-full max-w-2xl'>
        {/* 
        lista.map: processa itens da lista, e retorna alguma coisa.
        no caso, para cada item da lista de dados, retornamos um elemento Item, que foi importado na 9ª linha desse arquivo.
        e claro, devemos passar os dados dos campos do item. `campo={item.campo}`
        passamos também uma função de ajuda, mais detalhes no arquivo `item.tsx`
        veja: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        */}
        {/* usamos colchetes (como nesse comentário) quando queremos inserir javascript dentro do HTML. */}
        {itens.map(item => <Item 
          key={item.name} // quando iteramos sobre uma lista usando map, devemos adicionar esse campo `key` com um valor único. pode ocorre rum erro se houver o mesmo nome para 2 ou mais produtos. veja: https://pt.stackoverflow.com/a/514428
          nome={item.nome} 
          descricao={item.descricao} 
          imagem={item.imagem}
          removerItem={removerItem} // como esse item não tem como acessar uma função definida no arquivo `page.tsx`, devemos passar como prop. ela será chamada de dentro do componente
        />)}
      </div>      
    </main>
  )
}