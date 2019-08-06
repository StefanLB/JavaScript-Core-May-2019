function playingCards() {
    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }

        set face(face) {
            if (!checkFace(face)) {
                throw new Error(`Invalid card: ${face}${suit}`);
            }

            this._face = checkFace(face);
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (!checkSuit(suit)) {
                throw new Error(`Invalid card: ${face}${suit}`);
            }

            this._suit = checkSuit(suit);
        }

        toString() {
            return this._face + this._suit;
        }
    }

    function checkFace(face) {
        const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        return faces[faces.indexOf(face)];
    };

    function checkSuit(suit) {
        const suits = { 'S': '\u2660', 'H': '\u2665', 'D': '\u2666', 'C': '\u2663' };
        return suits[suit];
    };

    const [face, suit] = arguments;
    return new Card(face, suit);
}
