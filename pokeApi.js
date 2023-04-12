let pokeGallery = document.getElementById('pokeGallery');

let arrayPokemon = [];
let firstGen = 151;

let getPokemon = async (counter) => {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`);
  let res = await response.json();
  return res;
};

let mapPokemon = (pokemon) => {
  return pokemon.map((pokemon) => ({
    pokeName: pokemon.name,
    pokeImg: pokemon.sprites.other.home.front_default,
    pokeType: pokemon.types,
    pokeId: pokemon.id,
  }));
};

let draw = (mapedPokemon) => {
  pokeGallery.innerHTML = '';
  for (let pokemon of mapedPokemon) {
    let divCard = document.createElement('div');
    divCard.innerHTML = `
    <img src='${pokemon.pokeImg}' alt='${pokemon.pokeName}' class = 'PokemonImg'>
    <h2>${pokemon.pokeName}</h2>
    <p>#${pokemon.pokeId.toString().padStart(3, 0)}</p>
    `;
    pokeGallery.appendChild(divCard);
  }
};

let pokeSearch = (filter, mapedPokemon) => {
  let filteredPokemon = mapedPokemon.filter((pokemon) =>
    pokemon.pokeName.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredPokemon);
  draw(filteredPokemon);
};

let takeInput = (mapedPokemon) => {
  let input = document.querySelector("input");
  input.addEventListener("input", () => pokeSearch(input.value, mapedPokemon));
};

let init = async () => {
  for (let i = 1; i <= firstGen; i++) {
    arrayPokemon.push(await getPokemon(i));
  }

  let mapedPokemon = mapPokemon(arrayPokemon);
  console.log(mapedPokemon);

  draw(mapedPokemon);
  takeInput(mapedPokemon);
};



init();
