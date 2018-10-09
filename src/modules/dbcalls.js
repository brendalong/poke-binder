const remoteURL = "https://bell-pokemon.firebaseio.com/";

export default Object.create(null, {
    getAll: {
        value: function (dataTable) {
            return fetch(`${remoteURL}/${dataTable}`)
            .then(e => e.json())
        }
    },
    saveCard: {
        value: function () {
            return fetch(`${remoteURL}/animals`).then(e => e.json())
        }
    }
})