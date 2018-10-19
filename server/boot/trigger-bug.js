'use strict';

module.exports = function triggerBug(server) {
  server.models.Player.create({username: 'Player 1', password: 'hohoho', email: 'player1@ready.com'})
    .then(playerIns => { playerIns.toys.create([{}, {}, {}]) })
    .then(() => {
      // Then in another operation
      server.models.Player.findOne()
        .then(playerIns => {
          playerIns.toys()
            // Intends to get all the toys here but `playerIns.toys()` returns undefined
            .then(toys => console.log('the toys', toys))
        }) 
    })
};
