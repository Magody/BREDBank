
function getClient (clientIdentification) {
    return new Promise((resolve, reject) => {
        resolve(store.list(clientIdentification))
    });
}

module.exports = {
    getClient,
};