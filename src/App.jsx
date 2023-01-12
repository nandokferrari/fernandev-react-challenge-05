// trabalhando em equipe =============
// primeiro entra no projeto que voce quer faz o fork e cria um repositorio no gitHub
// em seguida clona a o projeto para a sua maquina,no terminal escreva - git clone "chave do repositorio" -
// em seguida crie sua propria branch(na maioria dos casos) e faca suas alteraçoes necessarias
// depois de tudo pronto, volta para o terminal e escreva - git add . -
// nao vai aparecer nada no terminal mas se voce der git status vai aparecer as mudanças que precisam ser commitadas
// agora com elas adicionadas escreva - git commit -m "escreva uma mensagem descritiva do projeto". 
// depois de ter feito o commit e so manda para o gitHub com - git push origin (nome da branch) -
//
//
//

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

import { useEffect, useState } from 'react';
import axios from "axios";

function App() {

  const [list, setList] = useState([]);
// funcao usando o axios para fazer a requisao na api pokeapi.co
  const fetchListData = () => {
  // reordenando alfabeticamente nossos pokemon

    //metodo axios para fazer requisicoes para a api
    // then(true) setando a lista com o data.results
   axios
   .get('https://pokeapi.co/api/v2/pokemon')
   .then((response) => { 
    // colocando os results dentro da variavel 
    const sortedArray = [...response.data.results]

// funcao sort de comparacao de itens de array, colocando os items em ordem alfabetica
    sortedArray.sort((a, b) => {
      
      return a.name.localeCompare(b.name)
    });
// passando a constante sortedArray para setar a lista e renderizar na tela

    console.log({sortedArray});

    const promisesArray = sortedArray.map(item => {
     return axios.get(item.url)
    });

    console.log(promisesArray);


    // REFATORANDO O CODIGO USANDO Promise.all para melhor a UX.
    Promise.all(promisesArray).then((values) => setList(values))
    // Promise.all();
    //setList(sortedArray);
  });
}
// para disparar apenas uma vez
  useEffect(() => {
    fetchListData();
  }, [])

  


  //HTML
  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.length === 0 && "carregando pokemon..."}
      {list.map((item) => (
      <Pokemon key={item.data.name} details={item.data}/>
      ))}
    </>
  );
}




// Pegando as informacoes dos pokemons individuais, usando o useState e o axios para fazer as requisoes
const Pokemon = ({details}) => {


// comparacao
  if(details === null) {
    return <div>carregando...</div>
  }
//se details não for igual a null esse if vai ficar renderizar esse HTML
return (
  
  <div style = {{ display: 'flex', alignItems: 'center'}}>
     <span>
        <img src={details.sprites.front_default} style= {{ width: 50, marginRight: 20}} />
    </span>
    
    <span>
      <b>{details.name}</b> - EXP {details.base_experience} 
    </span>

   
    </div>
  );







};

export default App;
