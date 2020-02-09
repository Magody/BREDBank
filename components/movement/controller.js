

function getMovements() {
    return new Promise((resolve, reject) => {
        resolve(store.list())
    });
}

module.exports = {
    getMovements
}