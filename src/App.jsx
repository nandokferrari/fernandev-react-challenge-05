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
    setList(sortedArray);
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
      {list.map((item) => (
      <Pokemon key={item.name} data={item}/>
      ))}
    </>
  );
}




// Pegando as informacoes dos pokemons individuais, usando o useState e o axios para fazer as requisoes
const Pokemon = ({data}) => {
  const [details, setDetails] = useState(null);

// squirtle 
// requisao para pegar as informacoes dos pokemons separadamente
const fetchIndividualPokemon = () => {
    axios.get(data.url).then((response) => setDetails(response.data));
}

useEffect(() => {
  fetchIndividualPokemon();
}, [])
// comparacao
  if(details === null) {
    return <div>carregando...</div>
  }







//HTML
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
