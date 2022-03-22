const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');
const pokeWeight = document.querySelector('[data-poke-weight]');
const pokeHeight = document.querySelector('[data-poke-height]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');





const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}



const renderPokemonData = data => {
    const sprite =  data.sprites.other.home.front_default;
    const { stats, types, moves, abilities } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    pokeWeight.textContent = `Peso: ${data.weight}`;
    pokeHeight.textContent = `Altura: ${data.height}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMove(moves);
    renderPokemonAbility(abilities);


}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.backgroundSize = ' 15px 15px';
    
    
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderPokemonMove = moves =>  {
    pokeMoves.innerHTML = '';
    moves.forEach(move =>   {
       const moveElemen = document.createElement("div");
       const moveElementName = document.createElement("div");
       moveElementName.textContent = move.move.name;
       moveElemen.appendChild(moveElementName);
       pokeMoves.appendChild(moveElemen)

    });
}


const renderPokemonAbility = abilities =>  {
    pokeAbilities.innerHTML = '';
    abilities.forEach(ability =>   {
       const abilityElemen = document.createElement("div");
       const abilityElementName = document.createElement("div");
       abilityElementName.textContent = ability.ability.name;
       abilityElemen.appendChild(abilityElementName);
       pokeAbilities.appendChild(abilityElemen)

    });
}


const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './Media/Imagenes/Poke-shadow.png');
    pokeImg.style.background =  '#dedede';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeMoves.innerHTML = '';
    pokeAbilities.innerHTML = '';
    pokeId.textContent = '';
    pokeHeight.textContent = '';
    pokeWeight.textContent = '';


}