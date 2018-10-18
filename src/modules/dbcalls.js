const dbRemote = "https://poke-binder.firebaseio.com";

export default Object.create(null, {
    getAll: {
        value: function (dataTable) {
            return fetch(`${dbRemote}/${dataTable}`).then(e => e.json())
        }
    },
    saveCard: {
        value: function () {
            return fetch(`$nothingYet`)
        }
    },
    getOneDetails: {
        value: function(whichOne) {
            return fetch(`${dbRemote}/allPokemon.json/?orderBy="slug"&equalTo="${whichOne}"`).then(e => e.json())
        }
    },
    getCards: {
        value: function(nameString) {
              let url = `https://api.pokemontcg.io/v1/cards?name=${nameString}`;
              return fetch(url).then(e => e.json());
        }
    }
})