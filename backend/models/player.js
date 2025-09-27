const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    sessionID: String,
    name: String,
    color: String,
    playerScore: { type: Number, default: 0 },
    captures : {type: Number, default: 0},
    ready: { type: Boolean, default: false },
    nowMoving: { type: Boolean, default: false },
});

PlayerSchema.methods.changeReadyStatus = function () {
    this.ready = !this.ready;
};

PlayerSchema.methods.canMove = function (room, rolledNumber) {
    const playerPawns = room.getPlayerPawns(this.color);
    for (const pawn of playerPawns) {
        if (pawn.canMove(rolledNumber)) return true;
    }
    return false;
};

PlayerSchema.methods.updateTotalScore = function(room) {
    const playerPawns = room.getPlayerPawns(this.color);
    this.playerScore = 0;
    for (const pawn of playerPawns) {
        this.playerScore += pawn.pawnScore;
    }
}

PlayerSchema.methods.incrementCaptures = function() {
    this.captures += 1;
};

module.exports = PlayerSchema;
