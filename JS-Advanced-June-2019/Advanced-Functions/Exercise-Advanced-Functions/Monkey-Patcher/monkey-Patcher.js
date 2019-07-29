function monkeyPatcher(command) {
    if (command === 'upvote') {
        this.upvotes++;

    } else if (command === 'downvote') {
        this.downvotes++;

    } else if (command === 'score') {

        let [upvotes, downvotes] = [this.upvotes, this.downvotes];
        let balance = upvotes - downvotes;
        let totalVotes = upvotes + downvotes;
        let rating = 'new';

        if (balance >= 0 && totalVotes > 100) {
            rating = 'controversial';
        }

        if (upvotes / totalVotes * 100 > 66) {
            rating = 'hot';
        }

        if (balance < 0) {
            rating = 'unpopular';
        }

        if (totalVotes < 10) {
            rating = 'new';
        }

        if (totalVotes > 50) {
            let greaterValue = Math.max(upvotes, downvotes);
            upvotes += Math.ceil(greaterValue * 0.25);
            downvotes += Math.ceil(greaterValue * 0.25);
        }

        return [upvotes, downvotes, balance, rating];
    }
}
