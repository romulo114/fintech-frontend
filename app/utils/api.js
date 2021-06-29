export async function getCollection(url) {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}


export async function getItem(url, id) {
    return fetch(`${url}${id}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function postCollection(url, body) {
    return fetch(`${url}`,
        {'method': 'POST', 'body': body}).then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function postItem(url, body) {
    return fetch(`${url}`,
        {'method': 'POST', 'body': body}).then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function deleteItem(url) {
    return fetch(`${url}`,
        {'method': 'DELETE', 'body': {}}).then((res) => res.json())
        .then((data) => {
            return data
        })
}