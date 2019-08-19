const SoftUniFy = require('./softunify');
const assert = require('chai').assert;

describe('SoftUniFy class tests', () => {

    let softunify;
    beforeEach('get clean instance of class', () => {
        softunify = new SoftUniFy();
    });

    describe('constructor method tests', () => {
        it('should be an object', () => {
            assert.isObject(softunify.allSongs);
        });
        it('should be an empty object', () => {
            assert.isEmpty(softunify.allSongs);
        });
    });

    describe('downloadSong method tests', () => {
        it('should add single song', () => {
            softunify.downloadSong('deadmau5', 'strobe', 'some lyrics');

            assert.deepEqual(softunify.allSongs,
                { 'deadmau5': { 'rate': 0, 'votes': 0, 'songs': ['strobe - some lyrics'] } });
        });
        it('should add multiple songs', () => {
            softunify.downloadSong('deadmau5', 'polaris', 'there is no lyrics');
            softunify.downloadSong('deadmau5', 'some chords', 'lyrics lyrics');
            softunify.downloadSong('deadmau5', 'the veldt', 'song text here');

            assert.deepEqual(softunify.allSongs,
                { deadmau5: { rate: 0, votes: 0, songs: ['polaris - there is no lyrics', 'some chords - lyrics lyrics', 'the veldt - song text here'] } });
        });
    });

    describe('playSong method tests', () => {
        it('should return message when song is missing', () => {
            softunify.downloadSong('deadmau5', 'polaris', 'there is no lyrics');
            softunify.downloadSong('deadmau5', 'some chords', 'lyrics lyrics');
            softunify.downloadSong('deadmau5', 'the veldt', 'song text here');

            let song = '4ware';
            let result = softunify.playSong(song);

            assert.equal(result,
                `You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`);
        });
        it('should return song when it is in list', () => {
            softunify.downloadSong('deadmau5', 'polaris', 'there is no lyrics');
            softunify.downloadSong('deadmau5', 'some chords', 'lyrics lyrics');
            softunify.downloadSong('deadmau5', 'the veldt', 'song text here');

            let song = 'some chords';
            let result = softunify.playSong(song);

            assert.equal(result, 'deadmau5:\nsome chords - lyrics lyrics\n');
        });
    });

    describe('songsList method tests', () => {
        it('should return message when songs list is empty', () => {
            assert.equal(softunify.songsList, 'Your song list is empty');
        });
        it('should return all songs when list is not empty', () => {
            softunify.downloadSong('deadmau5', 'polaris', 'there is no lyrics');
            softunify.downloadSong('deadmau5', 'some chords', 'lyrics lyrics');
            softunify.downloadSong('deadmau5', 'the veldt', 'song text here');
            console.log(softunify.songsList);

            let result = softunify.songsList;
            assert.equal(result, 'polaris - there is no lyrics\nsome chords - lyrics lyrics\nthe veldt - song text here');
        });
    });

    describe('rateArtist method tests', () => {
        it('should return message when artist is missing', () => {
            let artist = 'paul kalkbrenner';
            let result = softunify.rateArtist(artist);
            assert.equal(result, `The ${artist} is not on your artist list.`);
        });
        it('should return rated when artist exists', () => {
            softunify.downloadSong('deadmau5', 'polaris', 'there is no lyrics');
            let artist = 'deadmau5';
            let result = softunify.rateArtist(artist, 50);
            assert.equal(result, 50);
        });
    });
});
