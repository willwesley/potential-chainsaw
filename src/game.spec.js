const Game = require('./game');

describe("Game", function() {
    let game;

    beforeEach(function() {
        game = new Game();
    })

    describe("Initial game state", function() {
        it("has an empty 3x3 board", function() {
            expect(game.state.board.length).toEqual(3);
            game.state.board.forEach(function(row) {
                expect(row.length).toEqual(3);
                row.forEach(function(cell) {
                    expect(cell).toEqual('-');
                });
            });
        });

        it("starts on turn 1 with X active and game in progress", function() {
            expect(game.state.activePlayer).toEqual('x');
            expect(game.state.turn).toEqual(1);
            expect(game.state.outcome).toEqual('In Progress');
        });
    });

    describe("Actions", function() {
        it("places the active player's marker on an unclaimed cell for turn", function() {
            game.place(0,0);

            expect(game.state.board[0][0]).toEqual('x');
            expect(game.state.activePlayer).toEqual('o');
            expect(game.state.turn).toEqual(2);
        });

        it("refuses to places marker on a claimed cell", function() {
            game.place(0,0);
            game.place(0,0);

            expect(game.state.board[0][0]).toEqual('x');
            expect(game.state.activePlayer).toEqual('o');
            expect(game.state.turn).toEqual(2);
        });

        it("alternates players each turn", function() {
            game.place(0,0);
            expect(game.state.board[0][0]).toEqual('x');
            expect(game.state.activePlayer).toEqual('o');
            expect(game.state.turn).toEqual(2);
            game.place(0,1);
            expect(game.state.board[1][0]).toEqual('o');
            expect(game.state.activePlayer).toEqual('x');
            expect(game.state.turn).toEqual(3);
            game.place(0,2);
            expect(game.state.board[2][0]).toEqual('x');
            expect(game.state.activePlayer).toEqual('o');
            expect(game.state.turn).toEqual(4);
        });
    });

    describe("Ending", function() {
        /*
        potential win states: all the same in a row, column, or on the diagonal
        we want to know if someone has won, who it was, and with which cells.
        */

        it("declares winner on first row", function() {
            game.place(0,0);
            game.place(0,1);
            game.place(1,0);
            game.place(1,1);
            game.place(2,0);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[0,0],[1,0],[2,0]]);
        });

        it("declares winner on second row", function() {
            game.place(0,1);
            game.place(0,2);
            game.place(1,1);
            game.place(1,2);
            game.place(2,1);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[0,1],[1,1],[2,1]]);
        });

        it("declares winner on third row", function() {
            game.place(0,2);
            game.place(0,0);
            game.place(1,2);
            game.place(1,0);
            game.place(2,2);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[0,2],[1,2],[2,2]]);
        });

        it("declares winner on first column", function() {
            game.place(0,0);
            game.place(1,0);
            game.place(0,1);
            game.place(1,1);
            game.place(0,2);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[0,0],[0,1],[0,2]]);
        });

        it("declares winner on second column", function() {
            game.place(1,0);
            game.place(2,0);
            game.place(1,1);
            game.place(2,1);
            game.place(1,2);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[1,0],[1,1],[1,2]]);
        });

        it("declares winner on third column", function() {
            game.place(2,0);
            game.place(0,0);
            game.place(2,1);
            game.place(0,1);
            game.place(2,2);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual(expect.arrayContaining([[2,0],[2,1],[2,2]]));
        });

        it("declares winner on first diagnal", function() {
            game.place(0,0);
            game.place(1,0);
            game.place(1,1);
            game.place(0,1);
            game.place(2,2);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[0,0],[1,1],[2,2]]);
        });

        it("declares winner on second diagnal", function() {
            game.place(0,2);
            game.place(1,0);
            game.place(1,1);
            game.place(0,1);
            game.place(2,0);

            expect(game.state.outcome).toEqual('X Wins');
            expect(game.state.winner).toEqual([[0,2],[1,1],[2,0]]);
        });

        it("stops play after win", function() {
            game.place(0,0);
            game.place(0,1);
            game.place(1,0);
            game.place(1,1);
            game.place(2,0);
            game.place(2,1);

            expect(game.state.turn).toEqual(5);
            expect(game.state.board[1][2]).toEqual('-');
        });

        it("O can win too", function() {
            game.place(0,0);
            game.place(0,1);
            game.place(1,0);
            game.place(1,1);
            game.place(2,2);
            game.place(2,1);

            expect(game.state.outcome).toEqual('O Wins');
            expect(game.state.winner).toEqual([[0,1],[1,1],[2,1]]);
        });

        it("cat's game at 9 turns with no winner", function() {
            //  XXO
            //  OOX
            //  XOX
            game.place(0,0);
            game.place(0,1);
            game.place(1,0);
            game.place(1,1);
            game.place(2,2);
            game.place(2,0);
            game.place(0,2);
            game.place(1,2);
            game.place(2,1);

            expect(game.state.outcome).toEqual("Cat's Game");
            expect(game.state.winner).toEqual(false);
        });


    });
});
