export class Utils {
    public static setRandomPlayer() {
        const player = ['X', 'O']
        return player[Math.round(Math.random())]
    }

    public static createEmptyBoard(boardSize: number) {
        return new Array(boardSize)
            .fill(null)
            .map(() => new Array(boardSize).fill(null))
    }
}
