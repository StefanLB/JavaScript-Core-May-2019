const FilmStudio = require('./film-Studio');
const assert = require('chai').assert;

describe('FilmStudio class tests', () => {

    let filmStudio;
    beforeEach('get clean instance of class', () => {
        filmStudio = new FilmStudio('SU-Studio');
    });

    describe('functions exist tests', () => {
        it('should has following functions', () => {
            assert.isTrue(FilmStudio.prototype.hasOwnProperty('constructor'));
            assert.isTrue(FilmStudio.prototype.hasOwnProperty('casting'));
            assert.isTrue(FilmStudio.prototype.hasOwnProperty('makeMovie'));
            assert.isTrue(FilmStudio.prototype.hasOwnProperty('lookForProducer'));
        });
    });

    describe('properties exist tests', () => {
        it('should has following properties', () => {
            assert.equal(filmStudio.name, 'SU-Studio');
            assert.equal(JSON.stringify(filmStudio.films), '[]');
        });
    });

    describe('makeMovie function tests', () => {
        it('should throw an error for invalid arguments count', () => {
            const err = () => filmStudio.makeMovie('Tomb Raider');
            assert.throws(err, 'Invalid arguments count');
        });

        it('should throw an error for invalid first argument', () => {
            const err = () => filmStudio.makeMovie(6, ['Lara Croft']);
            assert.throws(err, 'Invalid arguments');
        });

        it('should throw an error for invalid second argument', () => {
            const err = () => filmStudio.makeMovie('Tomb Raider', 6);
            assert.throws(err, 'Invalid arguments');
        });

        it('should create a movie', () => {
            assert.equal(JSON.stringify(filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy'])),
                '{"filmName":"The Avengers","filmRoles":[{"role":"Iron-Man","actor":false},{"role":"Thor","actor":false},{"role":"Hulk","actor":false},{"role":"Arrow guy","actor":false}]}');
        });

        it('should create a sequel movie', () => {
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            assert.equal(JSON.stringify(filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy', 'Ant-man'])),
                '{"filmName":"The Avengers 2","filmRoles":[{"role":"Iron-Man","actor":false},{"role":"Hulk","actor":false},{"role":"Arrow guy","actor":false},{"role":"Ant-man","actor":false}]}');
        });
    });

    describe('casting function tests', () => {
        it('should return output for not existing movie', () => {
            assert.equal(filmStudio.casting('Mihalev', 'Iron-Man'),
                'There are no films yet in SU-Studio.');
        });

        it('should return output for not existing role', () => {
            filmStudio.makeMovie('The New Avengers', ['Thor', 'Hulk', 'Arrow guy', 'Black Panther']);
            assert.equal(filmStudio.casting('Mihalev', 'Iron-Man'),
                'Mihalev, we cannot find a Iron-Man role...');
        });

        it('should return output for hired actor', () => {
            filmStudio.makeMovie('The New Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy', 'Black Panther']);
            assert.equal(filmStudio.casting('Mihalev', 'Iron-Man'),
                'You got the job! Mr. Mihalev you are next Iron-Man in the The New Avengers. Congratz!');
        });
    });

    describe('lookForProducer function tests', () => {
        it('should throw an error for not existing movie', () => {
            const err = () => filmStudio.lookForProducer('The Avengers');
            assert.throws(err, 'The Avengers do not exist yet, but we need the money...');
        });

        it('should return output for existing movie', () => {
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            assert.equal(filmStudio.lookForProducer('The Avengers'),
                'Film name: The Avengers\nCast:\nfalse as Iron-Man\nfalse as Thor\nfalse as Hulk\nfalse as Arrow guy\n');
        });
    });
});
