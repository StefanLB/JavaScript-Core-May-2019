const memeService = (function () {

    const getMyMemes = function (userId) {
        return requester.get('appdata', `memes?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`, 'Kinvey');
    };

    const getAllMemes = function () {
        return requester.get('appdata', 'memes?query={}&sort={"_kmd.ect": -1}', 'Kinvey');
    };

    const createMeme = function (meme) {
        return requester.post('appdata', 'memes', 'Kinvey', meme);
    };

    const getMeme = function (memeId) {
        return requester.get('appdata', `memes/${memeId}`, 'Kinvey');
    };

    const editMeme = function (memeId, meme) {
        return requester.put('appdata', `memes/${memeId}`, 'Kinvey', meme);
    };

    const deleteMeme = function (memeId) {
        return requester.del('appdata', `memes/${memeId}`, 'Kinvey');
    };

    return {
        getMyMemes,
        getAllMemes,
        createMeme,
        getMeme,
        editMeme,
        deleteMeme
    };
})();
