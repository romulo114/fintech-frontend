export async function fetchModels () {
    return fetch('/api/model/model_summary')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function fetchPortfolios () {
    return fetch('/api/portfolios')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}

export async function fetchAccounts () {
    return fetch('/api/accounts/account_summary')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}