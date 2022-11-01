import { addCharacter, getRandomProfession, getRandomUser, getCharacters } from "../ApiManager"

export const RandomCharacter = ({ genders, setShowCharacterForm, villageId, setCharacters }) => {

    const handleRandomCharacterButton = async (event) => {
        event.preventDefault()

        const randomGenderId = Math.ceil(Math.random() * 2)
        const genderName = genders.find(gender => gender.id === randomGenderId).name

        const randomImgURL = `https://avatars.dicebear.com/api/${genderName.toLowerCase()}/${Math.random()}.svg`

        let randomProfession = ""
        let randomName = ""

        await getRandomProfession()
            .then((professionObj) => {
                randomProfession = professionObj.name
            })

        await getRandomUser(`https://randomuser.me/api/?gender=${genderName.toLowerCase()}&nat=US`)
            .then((randomUserData) => {
                const firstName = randomUserData.results[0].name.first
                const lastName = randomUserData.results[0].name.last
                randomName = firstName + " " + lastName
            })

        addCharacter({
            name: randomName,
            genderId: randomGenderId,
            imgURL: randomImgURL,
            profession: randomProfession,
            background: "",
            villageId: parseInt(villageId)
        })
            .then(() => {
                getCharacters(villageId)
                    .then(charactersArray => {
                        setCharacters(charactersArray)
                        setShowCharacterForm(false)
                    })
            })
    }


    return <button onClick={handleRandomCharacterButton} >Generate Random</button>
}