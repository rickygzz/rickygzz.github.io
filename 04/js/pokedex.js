/* Name Input */
const pNameInput = document.getElementById("pokeName");

const pImage = document.getElementById("pokeImg");

const pNumber = document.getElementById("pokemonNumber");
const pName = document.getElementById("pokemonName");

const pType = document.getElementById("pokemonType");
const pWeakness = document.getElementById("pokemonWeakness");

const pHP = document.getElementById("pokemonHP");
const pAttack = document.getElementById("pokemonAttack");
const pDefense = document.getElementById("pokemonDefense");
const pSpecialAttack = document.getElementById("pokemonSpecialAttack");
const pSpecialDefense = document.getElementById("pokemonSpecialDefense");
const pSpeed = document.getElementById("pokemonSpeed");

const pAbilities = document.getElementById("pokemonAbilities");
const pWeight = document.getElementById("pokemonWeight");
const pHeight = document.getElementById("pokemonHeight");

const pFlavor = document.getElementById("pokemonFlavor");

const pEvolution1 = document.getElementById("pokemonEvolution1");
const pEvolution2 = document.getElementById("pokemonEvolution2");
const pEvolution3 = document.getElementById("pokemonEvolution3");

currentID = 0;

const maxPokemons = 898;

maxHP = 0;
maxAttack = 0;
maxDefense = 0;
maxSpecialAttack = 0;
maxSpecialDefense = 0;
maxSpeed = 0;

const initialScreen = () =>
{
    pImage.src = 'img/pokeball.png';
    pName.innerText = 'Click Next, Previous or Search button.';

    updateScreen(false);
}

function getMax()
{
    currentID = 1;

    maxHP = 0;
    maxAttack = 0;
    maxDefense = 0;
    maxSpecialAttack = 0;
    maxSpecialDefense = 0;
    maxSpeed = 0;
    
    getJSONobj('https://pokeapi.co/api/v2/pokemon/' + currentID, getMaxRes);
}

const getMaxRes = (jsonObj, pokeName = '') =>
{
   console.log('updateFetchedPokemon: ' + jsonObj + ", name " + pokeName);

    if (jsonObj)
    {
        // Call function
        console.log("Stats " + jsonObj.stats);

        jsonObj.stats.forEach(stat => {
            const statName = stat['stat']['name'];
    
            switch (statName)
            {
                case 'hp':
                    if (maxHP < stat['base_stat']) maxHP = stat['base_stat'];
                    break;
                case 'attack':
                    if (maxAttack < stat['base_stat']) maxAttack = stat['base_stat'];
    
                    break;
                case 'defense':
                    if (maxDefense < stat['base_stat']) maxDefense = stat['base_stat'];
    
                    break;
                case 'special-attack':
                    if (maxSpecialAttack < stat['base_stat']) maxSpecialAttack = stat['base_stat'];
    
                    break;
                case 'special-defense':
                    if (maxSpecialDefense < stat['base_stat']) maxSpecialDefense = stat['base_stat'];
    
                    break;
                case 'speed':
                    if (maxSpeed < stat['base_stat']) maxSpeed = stat['base_stat'];
    
                    break;
    
                default:
                    // pH.innerHTML = statName + " = " + stat['base_stat'];
    
            }
        })
    }

    console.log(currentID + " : HP " + maxHP + " Attak " + maxAttack
     + " Defense " + maxDefense
     + " Special Attack " + maxSpecialAttack
     + " Special Defense " + maxSpecialDefense
     + " Speed " + maxSpeed );

    // Next pokemon
    if (currentID < maxPokemons)
    {
        currentID++;
        getJSONobj('https://pokeapi.co/api/v2/pokemon/' + currentID, getMaxRes);
    }
    else
    {
        console.log("Results");
        console.log("================================");
    }
}

/**
 * Fetches json object from URL.
 * @param {1} url URL to fetch json object from.
 * @param {2} func Function to call returning 2 parameters (jsonObj, stringParam)
 * @param {3} stringParam Parameter to pass as second argument
 * @returns if found returns json object, otherwise returns false.
 */
const getJSONobj = (url, func, stringParam = '') =>
{
    fetch(url).then((res) => {
        if (res.status == "200")
        {
            console.log('200 ' + url);
            return res.json();
        }
        // Bad result
        throw new Error('getJSONobj() ' + res.status + ', fetch from ' + url);
    }).then((data) => {
        if (data)
        {
            console.log(data);

            func(data, stringParam);
        }
    }).catch((error) => {
        func(null, stringParam);

        console.log(error);
    });
}

/**
 * Updates pokedex screen with fetched pokemon data.
 * If jsonObj == false, update pokedex showing not found.
 * @param jsonObj json object 
 */
 const updateFetchedPokemon = (jsonObj, pokeName = '') =>
 {
    console.log('updateFetchedPokemon: ' + jsonObj + ", name " + pokeName);

     if (jsonObj)
     {
         // Call function
         updateScreen(jsonObj);
     }
     else
     {
         if (pokeName == '')
         {
            notFoundPokemon(getID());
         }
         else
         {
            notFoundPokemon(pokeName);
         }
     }
 }

/**
 * Fetches pokemon by a given name in text input pokeName.
 * Then, calls function to process the json object.
 */
const GetPokemonByName = () =>
{
    pokeName = pNameInput.value.toLowerCase();

    pNameInput.value = '';

    if (isEmpty(pokeName))
    {
        return;
    }

    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName;

    getJSONobj(url, updateFetchedPokemon, pokeName);
    // updateFetchedPokemon(data, pokeName);
}

/**
 * Fetches next pokemon.
 */
const NextPokemon = () =>
{
    if (currentID < maxPokemons)
    {
        currentID++;

        const url = 'https://pokeapi.co/api/v2/pokemon/' + currentID;

        getJSONobj(url, updateFetchedPokemon);
    }
}

/**
 * Fetches previous pokemon.
 */
const PrevPokemon = () =>
{
    if (currentID > 1)
    {
        currentID--;

        const url = 'https://pokeapi.co/api/v2/pokemon/' + currentID;

        getJSONobj(url, updateFetchedPokemon);
    }
}

/**
 * Places a sad pokemon and shows a not found message.
 * @param {1} pokeName Pokemon name that was not found.
 */
const notFoundPokemon = (pokeName) =>
{
    pImage.src = 'img/not-found.gif';
    pName.innerText = '\'' + pokeName + '\' not found';

    updateScreen(false);
}

/**
 * Places search screen.
 */
const searchPokemon = () =>
{
    pImage.src = 'img/search.gif';
    pName.innerText = 'Searching pokemon';

    updateScreen(false);
}

/**
  * Updates screen with retrived data
  * @param {1} data if false clears screen (used directly by notFoundPokemon() and searchPokemon());
  */
const updateScreen = (data) =>
{
    pEvolution1.innerHTML = '';
    pEvolution2.innerHTML = '';
    pEvolution3.innerHTML = '';

    if (data)
    {
        pImage.src = data['sprites']['other']['official-artwork']['front_default'];

        currentID = data['id'];
    
        pNumber.innerText = getID() + ' - ';
        pName.innerText = data['name'];
    
    
        /* Convert weight from dg to lb */
        weight = data['weight'] * 0.2205;
    
        /* Convert height from dm to ft-in */
        heightFt = data['height'] / 3.048;
        heightIn = (heightFt - toInt(heightFt)) * 12;

        pWeight.innerHTML = 'Weight: ' + toDec(weight, 2) + ' lb';
        pHeight.innerHTML = 'Height: ' + toInt(heightFt) + "\' " + round(heightIn) + "\"";
    
        updateAbilities(data.abilities);
    
        updateTypes(data.types);
    
        updateStats(data.stats);

        // update flavor
        getJSONobj(data.species.url, updateFlavor, '');
    }
    else
    {
        pHP.innerHTML = '';
        pAttack.innerHTML = '';
        pDefense.innerHTML = '';
        pSpecialAttack.innerHTML = '';
        pSpecialDefense.innerHTML = '';
        pSpeed.innerHTML = '';
    
        pWeight.innerHTML = '';
        pHeight.innerHTML = '';
        pAbilities.innerHTML = '';

        zeroStats();
    }
}

const updateFlavor = (data) =>
{
    if (!data)
    {
        console.log('updateFlavor() no data given');
        return;
    }

    let flavor = [];
    flavorIndex = 0;
    
    for (i = 0; i < data.flavor_text_entries.length; i++)
    {
        if (data.flavor_text_entries[i].language.name == "en")
        {
            // Filter duplicates

            found = false;

            for (o = 0; o < flavor.length; o++)
            {
                if (flavor[o].substr(0, 6).toLowerCase() == data.flavor_text_entries[i].flavor_text.substr(0, 6).toLowerCase())
                {
                    found = true;
                    break;
                }
            }

            if (found == false)
            {
                flavor[flavorIndex] = data.flavor_text_entries[i].flavor_text.replace('\x0c', ' ');
                flavorIndex++;
            }
        }
    }

    flavor.sort();

    pFlavor.innerHTML = '';

    for (i = 0; i < flavorIndex; i++)
    {
        pFlavor.innerHTML += '<p>' + flavor[i] + '</p>';
    }

    // Add evolution chain
    getJSONobj(data.evolution_chain.url, updateEvolution, '');
}

const updateEvolution = (data, str) =>
{
    getJSONobj('https://pokeapi.co/api/v2/pokemon/' + data.chain.species.name, getPokemonData, '1');

    if (data.chain.evolves_to.length > 0)
    {
        getJSONobj('https://pokeapi.co/api/v2/pokemon/' + data.chain.evolves_to[0].species.name, getPokemonData, '2');

        if (data.chain.evolves_to[0].evolves_to.length > 0)
        {
            getJSONobj('https://pokeapi.co/api/v2/pokemon/' + data.chain.evolves_to[0].evolves_to[0].species.name, getPokemonData, '3');
        }
    }
}

const getPokemonData = (data, str) =>
{
    imgURL = data['sprites']['other']['official-artwork']['front_default'];
    pokemonID = data['id'];
    pokemonName = data['name'];

    html = '<img src="' + imgURL + '" width="80px" alt="' + pokemonID + ' - ' + pokemonName + '"><p>' + pokemonID + ' - ' + pokemonName + '</p>';

    if (str == '1')
    {
        pEvolution1.innerHTML = html;
    }
    else if (str == '2')
    {
        pEvolution2.innerHTML = html;
    }
    else
    {
        pEvolution3.innerHTML = html;
    }
}

const updateAbilities = (abilities) =>
{

}

function zeroStats()
{
    pHP.innerHTML = getLevelBar("HP", 0, "HP");
    pAttack.innerHTML = getLevelBar("Attack", 0, "ATTK");
    pDefense.innerHTML = getLevelBar("Defense", 0, "DEF");
    pSpecialAttack.innerHTML = getLevelBar("Special Attack", 0, "SPL<br>ATTK");
    pSpecialDefense.innerHTML = getLevelBar("Special Defense", 0, "SPL<br>DEF");
    pSpeed.innerHTML = getLevelBar("Speed", 0, "SPEED");
}

const updateStats = (stats) =>
{
    console.log("Stats " + stats);

    stats.forEach(stat => {
        const statName = stat['stat']['name'];

        console.log("Statname " + statName);

        switch (statName)
        {
            case 'hp':
                pHP.innerHTML = getLevelBar("HP", stat['base_stat'], "HP");
                break;
            case 'attack':
                pAttack.innerHTML = getLevelBar("Attack", stat['base_stat'], "ATTK");

                break;
            case 'defense':
                pDefense.innerHTML = getLevelBar("Defense", stat['base_stat'], "DEF");

                break;
            case 'special-attack':
                pSpecialAttack.innerHTML = getLevelBar("Special Attack", stat['base_stat'], "SPL<br>ATTK");

                break;
            case 'special-defense':
                pSpecialDefense.innerHTML = getLevelBar("Special Defense", stat['base_stat'], "SPL<br>DEF");

                break;
            case 'speed':
                pSpeed.innerHTML = getLevelBar("Speed", stat['base_stat'], "SPEED");

                break;

            default:
                // pH.innerHTML = statName + " = " + stat['base_stat'];

        }
    })
}

const getLevelBar = (name, val, abbreviation) => {
    // maxVal = 250

    // First 100 will fill up to 70% of the available space.
    first100 = val;
    exceeded = 0;
    if (val > 100)
    {
        first100 = 100;

        // Values over 100 up to 250, will grow within the remaing 30% space.
        exceeded = 155 - val;
    }

    newVal = (75 - first100 / 100 * 75) + (25 - exceeded / 155 * 25);

    console.log('newVal: ' + newVal + ", first100: " + first100 + ", exceeded: " + exceeded);

    return "<div class='stats-col' title='" + name + ' = ' + val + "'>"
        + "<div class='level-text'>" + val + "</div>"
        + "<div class='level'>"
        + "<div class='level-value' style='height: " + newVal + "%;'></div>"
        + "</div>"
        + "<div class='level-text'>" + abbreviation + "</div>"
        + "</div>";
}

const updateAbiliies = (abilities) =>
{
    sInnerHTML = '';

    abilities.forEach(ability => {     
        if (ability['is_hidden'] != true)
        {
            // Add name
            sInnerHTML += ability['ability']['name'];

            getJSONobj(ability['ability']['url']);
        }
    });
}

const updateTypes = (types) =>
{
    val = '';

    types.forEach(type => {
        const typeName = type['type']['name'];

        switch (typeName)
        {
            case 'electric':
            case 'normal':
            case 'fire':
            case 'water':
            case 'ice':
            case 'rock':
            case 'flying':
            case 'grass':
            case 'psychic':
            case 'ghost':
            case 'bug':
            case 'poison':
            case 'ground':
            case 'dragon':
            case 'steel':
            case 'fighting':
                val += '<span class="type ' + typeName + '">' + typeName + '</span>';

                break;
            default:
                val += '<span class="type default">' + typeName + '</span>';
        }
    });

    pType.innerHTML = val;
}


/************************
 *  JavaScript Helpers  *
 ************************/

function isEmpty(strValue)
{
    // Test whether strValue is empty
    if (!strValue || strValue.trim() === "" || (strValue.trim()).length === 0)
    {
        return true;
    }

    return false;
}

function pad(num, size)
{
    num = num.toString();

    while (num.length < size)
    {
        num = "0" + num;
    }

    return num;
}

function toInt(val)
{
    return parseInt(val);
}

function toDec(val, decimalPlaces)
{
    return val.toFixed(decimalPlaces);
}

function round(val)
{
    return Math.round(val);
}

function getID()
{
    return '#' + pad(currentID, 3);
}