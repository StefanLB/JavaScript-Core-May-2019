let cards = (function () {
    const validateFace = function (face) {
        return ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"].indexOf(face);
    }

    const Suits = { SPADES: '♠', HEARTS: '♥', DIAMONDS: '♦', CLUBS: '♣' };

    const validateSuit = function (suit) {
        return Object.values(Suits).includes(suit);
    };

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }

        set face(face) {
            if (validateFace(face) === -1) {
                throw new Error('invalid face');
            }

            this._face = face;
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (validateSuit(suit) === false) {
                throw new Error('invalid suit');
            }

            this._suit = suit;
        }
    }

    return { Suits, Card };
})();
