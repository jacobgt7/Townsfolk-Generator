export const getAppUser = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const addAppUser = (userObj) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
        .then(res => res.json())
}

export const getVillages = (townsfolkUserObject) => {
    return fetch(`http://localhost:8088/villages?userId=${townsfolkUserObject.id}`)
        .then(res => res.json())
}

export const getVillage = (villageId) => {
    return fetch(`http://localhost:8088/villages/${villageId}`)
        .then(res => res.json())
}

export const addVillage = (newVillageObj) => {
    return fetch(`http://localhost:8088/villages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newVillageObj)
    })
        .then(res => res.json())
}

export const replaceVillage = (villageObj) => {
    return fetch(`http://localhost:8088/villages/${villageObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(villageObj)
    }
    )
        .then(res => res.json())
}

export const deleteVillage = (villageId) => {
    return fetch(`http://localhost:8088/villages/${villageId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
}

export const getCharacters = (villageId) => {
    return fetch(`http://localhost:8088/characters?villageId=${villageId}&_expand=gender`)
        .then(res => res.json())
}

export const getCharacter = (characterId) => {
    return fetch(`http://localhost:8088/characters/${characterId}?_expand=gender`)
        .then(res => res.json())
}

export const addCharacter = (newCharacterObj) => {
    return fetch(`http://localhost:8088/characters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCharacterObj)
    }
    )
        .then(res => res.json())
}

export const replaceCharacter = (characterId, characterObj) => {
    return fetch(`http://localhost:8088/characters/${characterId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(characterObj)
    }
    )
        .then(res => res.json())
}

export const deleteCharacter = (characterObj) => {
    return fetch(`http://localhost:8088/characters/${characterObj.id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
}

export const getGenders = () => {
    return fetch(`http://localhost:8088/genders`)
        .then(res => res.json())
}

export const getRandomUser = (API) => {
    return fetch(API)
        .then(res => res.json())
}