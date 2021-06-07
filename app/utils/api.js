export async function fetchModelSummary() {
    return fetch('/api/assetModels')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}

// export async function fetchPortfolios () {
//     return fetch('/api/portfolios')
//         .then((res) => res.json())
//         .then((data) => {
//             return data
//         })
// }

export async function fetchAccounts() {
    return fetch('/api/accounts/account_summary')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function fetchModelDetail(id) {
    return fetch(`/api/assetModels/${id}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function postModelPositions(id, body) {
    return fetch(`/api/assetModels/${id}/modelPositions`,
        {'method': 'POST', 'body': body}).then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function postModelDetails(id, body) {
    return fetch(`/api/assetModels/${id}`,
        {'method': 'POST', 'body': body}).then((res) => res.json())
        .then((data) => {
            return data
        })
}