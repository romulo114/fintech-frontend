export async function fetchModelSummary () {
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

export async function fetchAccounts () {
    return fetch('/api/accounts/account_summary')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}
export async function fetchModelDetail (id) {
    return fetch(`/api/assetModels/${id}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}