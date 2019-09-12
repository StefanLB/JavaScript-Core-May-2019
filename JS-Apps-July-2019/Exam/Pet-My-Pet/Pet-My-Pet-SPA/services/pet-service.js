const petService = (function () {

    const createPet = function (pet) {
        return requester.post('appdata', 'pets', 'Kinvey', pet);
    };

    const getAllPets = function (category) {
        const query = category !== 'all' ? `{"category":"${category}"}` : '{}';
        return requester.get('appdata', `pets?query=${query}&sort={"likes": -1}`, 'Kinvey');
    };

    const getMyPets = function (userId) {
        return requester.get('appdata', `pets?query={"_acl.creator":"${userId}"}`, 'Kinvey');
    };

    const getPet = function (petId) {
        return requester.get('appdata', `pets/${petId}`, 'Kinvey');
    };

    const deletePet = function (petId) {
        return requester.del('appdata', `pets/${petId}`, 'Kinvey');
    };

    const editPet = function (petId, pet) {
        return requester.put('appdata', `pets/${petId}`, 'Kinvey', pet);
    };

    return {
        createPet,
        getAllPets,
        getMyPets,
        getPet,
        deletePet,
        editPet
    }
})();
