function Game() {
    this.state = {
        board: [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ],
        activePlayer: 'x',
        turn: 1,
        outcome: 'In Progress',
    }
    this.possibleWins = [
        ...[0,1,2].map(i => [[i,0], [i,1], [i,2]]),
        ...[0,1,2].map(i => [[0,i], [1,i], [2,i]]),
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]],
    ]
    
    this.place = function(column, row) {
        if(this.canPlace(column, row)) {
            this.state.board[row][column] = this.state.activePlayer;
            this.state.winner = this.winner();
            if(this.state.winner) {
                this.state.outcome = this.state.activePlayer.toUpperCase() + " Wins";
            } else {
                this.switchPlayers();
                this.state.turn++;
            }
            if(this.state.turn > 9) {
                this.state.outcome = "Cats Game";
            }
        }
    }

    this.canPlace = function(column, row) {
        return this.state.outcome == 'In Progress'
            && this.state.board[row][column] == '-';
    }

    this.switchPlayers = function() {
        if(this.state.activePlayer == 'o') {
            this.state.activePlayer = 'x';
        } else {
            this.state.activePlayer = 'o';
        }
    }

    this.winner = function() {
        for(let possiblity of this.possibleWins) {
            if(this.setEqual(...possiblity)) {
                return possiblity
            }
        }
        return false
    }

    this.setEqual = function(a,b,c) {
        const match = this.state.board[a[1]][a[0]];
        return match != '-'
            && match == this.state.board[b[1]][b[0]]
            && match == this.state.board[c[1]][c[0]];
    }
}

module.exports = Game;
