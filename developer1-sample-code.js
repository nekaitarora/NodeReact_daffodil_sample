/**
 * Created on 26-11-15.
 *
 * Test file for the Game Api.
 *
 * Usage:
 * cd m-api-server/api
 * mocha test/testGameApi.js
 *
 * to run all tests at once:
 * mocha test/*.js
 *
 *
*/
var ApiCallFactory = require('../ApiCallFactory');

// For the connection with Cassandra
var cassandra = require('cassandra-driver');
var Uuid = require('cassandra-driver').types.Uuid;
var async = require('async');
var _ = require('underscore');

// The test data to use
var testdata = require('./testData');

// get the test data
var games = testdata.game;
var game0 = games[0];
var game1 = games[1];

var keys = Object.keys(game0);

// For the test framework
var expect = require('expect.js');

//Connect to the cluster
var client = new cassandra.Client({contactPoints: [IP address of the machine], keyspace: 'apiconnectiontest'});

var apiCallFactory = new ApiCallFactory();

// create the instances
var createGame = apiCallFactory.createCall(
    {
        callType : 'createGame',
        connection: client
    }
);

var updateGame = apiCallFactory.createCall(
    {
        callType : 'updateGame',
        connection: client
    }
);

var deleteGame = apiCallFactory.createCall(
    {
        callType : 'deleteGame',
        connection: client
    }
);


var getGameById = apiCallFactory.createCall(
    {
        callType : 'getGameById',
        connection: client
    }
);

var getGamesByCategoryId = apiCallFactory.createCall(
    {
        callType : 'getGamesByCategoryId',
        connection: client
    }
);

var getGamesByFlagId = apiCallFactory.createCall(
    {
        callType : 'getGamesByFlagId',
        connection: client
    }
);

var getGamesByPlatformId = apiCallFactory.createCall(
    {
        callType : 'getGamesByPlatformId',
        connection: client
    }
);

var getGamesByRestrictedCountryId = apiCallFactory.createCall(
    {
        callType : 'getGamesByRestrictedCountryId',
        connection: client
    }
);

var getGamesByVendorGameId = apiCallFactory.createCall(
    {
        callType : 'getGamesByVendorGameId',
        connection: client
    }
);

// create an error by omitting the connection
var failCreateGame = apiCallFactory.createCall(
    {
        callType : 'createGame'
    }
);

// create an error by omitting the connection without having a callback
var failCreateGameWithoutConnection = apiCallFactory.createCall(
    {
        callType : 'createGame'
    }
);

describe('cassandra client',function() {
    it('should not be null',function(done) {
        expect(client).not.to.be(null);
        done();
    });
    it('should not be undefined',function(done) {
        expect(client).not.to.be(undefined);
        done();
    });
});

describe('games',function() {
    it('should not be null',function(done) {
        expect(games).not.to.be(null);
        done();
    });
    it('should not be undefined',function(done) {
        expect(games).not.to.be(undefined);
        done();
    });
});

describe('game0',function() {
    it('should not be null',function(done) {
        expect(game0).not.to.be(null);
        done();
    });
    it('should not be undefined',function(done) {
        expect(game0).not.to.be(undefined);
        done();
    });
});

describe('game1',function() {
    it('should not be null',function(done) {
        expect(game1).not.to.be(null);
        done();
    });
    it('should not be undefined',function(done) {
        expect(game1).not.to.be(undefined);
        done();
    });
});

// Create an error by omitting data
createGame.execute(null, failCreateGameExecuteCallback1);

function failCreateGameExecuteCallback1(err,result) {
    describe('failCreateGameExecuteCallback1 (null data)',function() {
        it('error should not be null', function() {
            expect(err).not.to.be(null);
        });
    });
}

// Create an error by omitting data.Game
createGame.execute({}, failCreateGameExecuteCallback2);

function failCreateGameExecuteCallback2(err,result) {
    describe('failCreateGameExecuteCallback 2 (blank data)',function() {
        it('error should not be null', function() {
            expect(err).not.to.be(null);
        });
    });
}

// Test the absence of callback
var createResult = createGame.execute({game: game0});
describe('createResult (no callback)',function() {
    it('to be equal', function() {
        expect(createResult).to.be(false);
    });
});


// Create an error by omitting data.Game and callback
var failCreateResult = createGame.execute({});
describe('failCreateResult (no callback nor data)',function() {
    it('to be false', function() {
        expect(failCreateResult).to.be(false);
    });
});

// Test the call that was created without a connection
failCreateGameWithoutConnection.execute({game: game0}, failCreateGameWithoutConnectionCallback);

function failCreateGameWithoutConnectionCallback(err, result) {
    console.log(err)
    describe('failCreateGameWithoutConnectionCallback',function() {
        it('error should not be null', function() {
            expect(err).not.to.be(null);
        });
        it('error should be', function() {
            expect(err).to.be.eql('No connection given');
        });
    });
}

// Testing the execution calls
describe('create game execute', function() {
    it('should create game', function(done) {
        this.timeout(10000);
        createGame.execute({game: game0}, createGameExecuteCallback);

        function createGameExecuteCallback(err, result) {
            describe('createGameExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
            });
            done();
        }
    });
});
/**
*   immediateExecutionCreateGame
*   Test case for immediate execution of createing game
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('create game immediate execute', function() {
    it('should create game', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'createGame',
                connection: client,
                data: {game: game1}
            },
            immediateExecutionCreateGameCallback
        );

        function immediateExecutionCreateGameCallback(err, result) {
            describe('immediateExecutionCreateGameCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                done()
            });
        }
    });
});
/**
*   immediateExecutionCreateGame
*   Test case for immediate execution of createing game
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('create game immediate execute', function() {
    it('should create game', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'createGame',
                connection: client,
                data: {game: game1}
            },
            immediateExecutionCreateGameCallback
        );

        function immediateExecutionCreateGameCallback(err, result) {
            describe('immediateExecutionCreateGameCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                done()
            });
        }
    });
});

describe('update game execute', function() {
    it('should update game', function(done) {
        this.timeout(10000);

        var game2 = _.clone(game0);
        game2._rev = 2;

        updateGame.execute({game: game2}, updateGameExecuteCallback);

        function updateGameExecuteCallback(err, result) {
            describe('updateGameExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
            });
            done();
        }
    });
});
/**
*   immediateExecutionUpdateGame
*   Test case for immediate execution of updating game
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('update game immediate execute', function() {
    it('should update game', function(done) {
        this.timeout(10000);

        var game3 = _.clone(game1);
        game3._rev = 2;

        apiCallFactory.createCall(
            {
                callType: 'updateGame',
                connection: client,
                data: {game: game3}
            },
            immediateExecutionUpdateGameCallback
        );

        function immediateExecutionUpdateGameCallback(err, result) {
            describe('immediateExecutionUpdateGameCallback', function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                done();
            });
        }
    });
});

describe('get game by id execute', function() {
    it('should get game', function(done) {
        this.timeout(10000);
        getGameById.execute({_id: game0._id}, getGameByIdExecuteCallback);

        function getGameByIdExecuteCallback(err, returnedGame) {
            describe('getGameByIdExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGame should have same _id', function() {
                    expect(returnedGame._id).to.be( game0._id );
                });
                it('returnedGame should have all the keys defined', function() {
                    expect(returnedGame).to.only.have.keys( keys );
                });
                done();
            });
        }
    });
});
/**
*   immediateExecutionGetGameById
*   Test case for immediate execution of getting the detail of particular game by using id
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('get game by id immediate execute', function() {
    it('should get game', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'getGameById',
                connection: client,
                data: {_id: game1._id}
            },
            immediateExecutionGetGameByIdCallback
        );

        function immediateExecutionGetGameByIdCallback(err, returnedGame) {
            describe('immediateExecutionGetGameByIdCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGame should have same _id', function() {
                    expect(returnedGame._id).to.be( game1._id );
                });
                it('returnedGame should have all the keys defined', function() {
                    expect(returnedGame).to.only.have.keys( keys );
                });
                done();
            });
        }
    });
});

describe('get games by flag_id execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        getGamesByFlagId.execute({_flag_id: game0._flag_ids[0]}, getGamesByFlagIdExecuteCallback);

        function getGamesByFlagIdExecuteCallback(err, returnedGames) {
            describe('getGamesByFlagIdExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});
/**
*   immediateExecutionGetGamesByFlagId
*   Test case for immediate execution of fetches all the games that have flag id
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('get games by _flag_id immediate execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'getGamesByFlagId',
                connection: client,
                data: {_flag_id: game1._flag_ids[0]}
            },
            immediateExecutionGetGamesByFlagIdCallback
        );

        function immediateExecutionGetGamesByFlagIdCallback(err, returnedGames) {
            describe('immediateExecutionGetGamesByFlagIdCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});

describe('get games by _platform_id execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        getGamesByPlatformId.execute({_platform_id: game0._platform_ids[0]}, getGamesByPlatformIdExecuteCallback);

        function getGamesByPlatformIdExecuteCallback(err, returnedGames) {
            describe('getGamesByPlatformIdExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});
/**
*   immediateExecutionGetGamesByPlatformId
*   Test case for immediate execution of fetches all the games that are of same Platform
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('get games by _platform_id immediate execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'getGamesByPlatformId',
                connection: client,
                data: {_platform_id: game1._platform_ids[0]}
            },
            immediateExecutionGetGamesByPlatformIdCallback
        );

        function immediateExecutionGetGamesByPlatformIdCallback(err, returnedGames) {
            describe('immediateExecutionGetGamesByPlatformIdCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});

describe('get games by _category_id execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        getGamesByCategoryId.execute({_category_id: game0._category_id}, getGamesByCategoryIdExecuteCallback);

        function getGamesByCategoryIdExecuteCallback(err, returnedGames) {
            describe('getGamesByCategoryIdExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});
/**
*   immediateExecutionGetGamesByCategoryId
*   Test case for immediate execution of fetches all the games that are of same Category
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('get games by _category_id immediate execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'getGamesByCategoryId',
                connection: client,
                data: {_category_id: game1._category_id}
            },
            immediateExecutionGetGamesByCategoryIdCallback
        );

        function immediateExecutionGetGamesByCategoryIdCallback(err, returnedGames) {
            describe('immediateExecutionGetGamesByCategoryIdCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});

describe('get games by vendor_game_id execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        getGamesByVendorGameId.execute({vendor_game_id: game0.vendor_game_id}, getGamesByVendorGameIdExecuteCallback);

        function getGamesByVendorGameIdExecuteCallback(err, returnedGames) {
            describe('getGamesByVendorGameIdExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});
/**
*   immediateExecutionGetGamesByVendorGameId
*   Test case for immediate execution of fetches all the games that are of same Vendor
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('get games by vendor_game_id immediate execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'getGamesByVendorGameId',
                connection: client,
                data: {vendor_game_id: game1.vendor_game_id}
            },
            immediateExecutionGetGamesByVendorGameIdCallback
        );

        function immediateExecutionGetGamesByVendorGameIdCallback(err, returnedGames) {
            describe('immediateExecutionGetGamesByVendorGameIdCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});

describe('get games by _restricted_country_ids execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        getGamesByRestrictedCountryId.execute({_restricted_country_id: game0._restricted_country_ids[0]}, getGamesByRestrictedCountryIdExecuteCallback);

        function getGamesByRestrictedCountryIdExecuteCallback(err, returnedGames) {
            describe('getGamesByRestrictedCountryIdExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});
/**
*   immediateExecutionGetGamesByRestrictedCountryId
*   Test case for immediate execution of fetches all the games w.r.t Restricted Country
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('get games by _restricted_country_id immediate execute', function() {
    it('should get games', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'getGamesByRestrictedCountryId',
                connection: client,
                data: {_restricted_country_id: game1._restricted_country_ids[0]}
            },
            immediateExecutionGetGamesByRestrictedCountryIdCallback
        );

        function immediateExecutionGetGamesByRestrictedCountryIdCallback(err, returnedGames) {
            describe('immediateExecutionGetGamesByRestrictedCountryIdCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('returnedGames should not be emplty', function() {
                    expect(returnedGames).to.not.be.empty();
                });
                returnedGames.forEach(function(data){
                    it('a game should have all the keys defined', function() {
                        expect(data).to.only.have.keys( keys );
                    });
                });
                done();
            });
        }
    });
});

describe('delete game execute ', function() {
    it('should delete game', function(done) {
        this.timeout(10000);
        deleteGame.execute({_id: game0._id}, deleteGameExecuteCallback);

        function deleteGameExecuteCallback(err, result) {
            describe('deleteGameExecuteCallback',function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('result should be a string.', function() {
                    expect(typeof result === "string").to.be(true);
                });
                // avoid runtime errors
                if (typeof result === "string") {
                    it('result should contain the word deleted.', function() {
                        expect(result.indexOf('deleted') > -1).to.be(true);
                    });
                }
                done();
            });
        }
    });
});
/**
*   immediateExecutionDeleteGame
*   Test case for immediate execution of getting the detail of particular game by using id
*   we get game from the mock data which was declare in ./testData.js
*   schema is declare in m-modules repo under models/index.js
**/
describe('delete game immediate execute ', function() {
    it('should delete game', function(done) {
        this.timeout(10000);
        apiCallFactory.createCall(
            {
                callType: 'deleteGame',
                connection: client,
                data: {_id: game1._id}
            },
            immediateExecutionDeleteGameCallback
        );

        function immediateExecutionDeleteGameCallback(err, result) {
            describe('immediateExecutionDeleteGameCallback', function() {
                it('error should be null', function() {
                    expect(err).to.be(null);
                });
                it('result should be a string.', function() {
                    expect(typeof result === "string").to.be(true);
                });
                // avoid runtime errors
                if (typeof result === "string") {
                    it('result should contain the word deleted.', function() {
                        expect(result.indexOf('deleted') > -1).to.be(true);
                    });
                }
                done();
            });
        }
    });
});
























// // Testing the execution calls
// createGame.execute({game: game}, createGameExecuteCallback);

// function createGameExecuteCallback(err,result) {
//     describe('createGameExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//     });
// }

// deleteGame.execute({_id: game._id}, deleteGameExecuteCallback);

// function deleteGameExecuteCallback(err,result) {
//     describe('deleteGameExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//     });
// }

// updateGame.execute({game: game}, updateGameExecuteCallback);

// function updateGameExecuteCallback(err,result) {
//     describe('updateGameExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//     });
// }

// getGameById.execute({_id: game._id}, getGameByIdExecuteCallback);

// function getGameByIdExecuteCallback(err,returnedGame) {
//     describe('getGameByIdExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//     });
//     describe('getGameByIdExecuteCallback',function() {
//         it('found game._id should be correct', function() {
//             expect(game._id).to.be.equal(returnedGame._id);
//         });
//     });
// }

// // test the return object when there is no callback
// var foundGameById = getGameById.execute({_id: game._id});
// describe('getGameById.execute with no callback',function() {
//     it('foundGame game._id to be false', function() {
//         expect(foundGameById).to.be(false);
//     });
// });

// getGamesByCategoryId.execute({_category_id: game._category_id}, getGamesByCategoryIdExecuteCallback);

// function getGamesByCategoryIdExecuteCallback(err,returnedGames) {
//     describe('getGamesByCategoryIdExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         returnedGames.forEach(function(data){
//             it('game._category_id  should have all the keys defined', function() {
//                 expect(data).to.only.have.keys(keys);
//             });
//         })
//     });
// }

// // test the return object when there is no callback
// var foundGamesByCategoryId = getGamesByCategoryId.execute({_category_id: game._category_id});
// describe('getGamesByCategoryId.execute (no calback)',function() {
//     it('foundGamesByCategoryId to be false', function() {
//         expect(foundGamesByCategoryId).to.be(false);
//     });
// });

// getGamesByFlagId.execute({_flag_id: game._flag_ids[0]}, getGamesByFlagIdExecuteCallback);

// function getGamesByFlagIdExecuteCallback(err,returnedGames) {
//     describe('getGamesByFlagIdExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         returnedGames.forEach(function(data) {
//             it('a found game should have all the keys defined', function() {
//                 expect(data).to.only.have.keys(keys);
//             });
//         });
//     });
//  }

// // test the return object when there is no callback
// var foundGamesByFlagId = getGamesByFlagId.execute({_flag_id: game._flag_ids[0]});
// describe('getGamesByFlagId.execute (no calback)',function() {
//      it('foundGamesByFlagId to be false', function() {
//         expect(foundGamesByFlagId).to.be(false);
//      });
// });

// getGamesByPlatformId.execute({_platform_id: game._platform_ids[0]}, getGamesByPlatformIdExecuteCallback);

// function getGamesByPlatformIdExecuteCallback(err,returnedGames) {
//     describe('getGamesByPlatformIdExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('returnedGames should not be undefined', function() {
//             expect(returnedGames).not.to.be(undefined);
//         });
//         // avoid runtime errors
//         if (returnedGames) {
//             returnedGames.forEach(function (data) {
//                 it('Comparing the length of _platform_ids', function () {
//                     expect(game._platform_ids).to.not.be.empty();
//                 });
//                 it('a returned game should have all the keys defined', function () {
//                     expect(data).to.only.have.keys(keys);
//                 });
//             });
//         }
//     });
// }

// // test the return object when there is no callback
// var foundGamesByPlatformId = getGamesByPlatformId.execute({_platform_ids: game._platform_ids});
// describe('foundGamesByPlatformId',function() {
//     it('should not be undefined', function() {
//         expect(foundGamesByPlatformId).to.not.be(undefined);
//     });

//     // avoid runtime errors
//     if (foundGamesByPlatformId) {
//         foundGamesByPlatformId.forEach(function (index) {
//             it('Compairing the length of _platform_ids', function () {
//                 expect(game._platform_ids).to.not.be.empty();
//             });
//             it('a returned game should have all the keys defined', function () {
//                 expect(game).to.only.have.keys(keys);
//             });
//         });
//     }
// });

// getGamesByRestrictedCountryId.execute({_restricted_country_id: game._restricted_country_ids[0]}, getGamesByRestrictedCountryIdExecuteCallback);

// function getGamesByRestrictedCountryIdExecuteCallback(err,returnedGames) {
//     describe('getGamesByRestrictedCountryIdExecuteCallback', function () {
//         it('error should be null', function () {
//             expect(err).to.be(null);
//         });
//         returnedGames.forEach(function (data, index) {
//             it('Comparing the length of _restricted_country_ids', function () {
//                 expect(data._restricted_country_ids).to.not.be.empty();
//             });
//             it('a returned game should have all the keys defined ', function () {
//                 expect(data).to.only.have.keys(keys);
//             });
//         });
//     });
//  }

// // test the return object when there is no callback
// var foundGamesByRestrictedCountryId = getGamesByRestrictedCountryId.execute({_restricted_country_id: game._restricted_country_ids[0]});
// describe('foundGamesByRestrictedCountryId (no callback)',function() {

//     it('should not be undefined', function() {
//         expect(foundGamesByRestrictedCountryId).to.not.be(undefined);
//     });
//     // Avoid runtime errors
//     if (foundGamesByRestrictedCountryId) {
//         foundGamesByRestrictedCountryId.forEach(function(game){
//             it('foundGames should have the same keys', function() {
//                 expect(game).to.only.have.keys(keys);
//             });
//         })
//     }
// });

// getGamesByVendorGameId.execute({vendor_game_id: game.vendor_game_id}, getGamesByVendorGameIdExecuteCallback);

// function getGamesByVendorGameIdExecuteCallback(err,returnedGames) {
//     describe('getGamesByVendorGameIdExecuteCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         returnedGames.forEach(function(data){
//             it('a found game should have the same keys', function() {
//                 expect(data).to.only.have.keys(keys);
//             });
//         })
//     });
// }

// // test the return object when there is no callback
// var foundGamesByVendorGameId = getGamesByVendorGameId.execute({vendor_game_id: game.vendor_game_id});
// describe('getGamesByVendorGameId',function() {
//     it('should not be undefined', function() {
//         expect(foundGamesByRestrictedCountryId).to.not.be(undefined);
//     });
//     // Avoid runtime errors
//     if (foundGamesByVendorGameId) {
//         foundGamesByVendorGameId.forEach(function (data) {
//             it('foundGames should have the same keys', function () {
//                 expect(data).to.only.have.keys(keys);
//             });
//         });
//     }
// });

// /**
// *   immediateExecutionCreateGame
// *   Test case for immediate execution of createing game
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionCreateGame = apiCallFactory.createCall(
//     {
//         callType: 'createGame',
//         connection: client,
//         data: {game: game}
//     },
//     immediateExecutionCreateGameCallback
// );


// function immediateExecutionCreateGameCallback(err, result) {
//     describe('immediateExecutionCreateGameCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should have all the keys defined', function() {
//             expect(result).to.only.have.keys( keys );
//         });
//     });
// }

// /**
// *   immediateExecutionUpdateGame
// *   Test case for immediate execution of updating game
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionUpdateGame = apiCallFactory.createCall(
//     {
//         callType: 'updateGame',
//         connection: client,
//         data: {game: game}
//     },
//     immediateExecutionUpdateGameCallback
// );


// function immediateExecutionUpdateGameCallback(err, result) {
//     describe('immediateExecutionUpdateGameCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should have all the keys defined', function() {
//             expect(result).to.only.have.keys( keys );
//         });
//     });
// }

// /**
// *   immediateExecutionDeleteGame
// *   Test case for immediate execution of deleting a game
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionDeleteGame = apiCallFactory.createCall(
//     {
//         callType: 'deleteGame',
//         connection: client,
//         data: {_id: game._id}
//     },
//     immediateExecutionDeleteGameCallback
// );


// function immediateExecutionDeleteGameCallback(err, result) {
//     describe('immediateExecutionDeleteGameCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should be a string.', function() {
//             expect(typeof result === "string").to.be(true);
//         });
//         // avoid runtime errors
//         if (typeof result === "string") {
//             it('result should contain the word deleted.', function() {
//                 expect(result.indexOf('deleted') > -1).to.be(true);
//             });
//         }
//     });
// }

// /**
// *   immediateExecutionDeleteGame
// *   Test case for immediate execution of getting the detail of particular game by using id
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionGetGameById = apiCallFactory.createCall(
//     {
//         callType: 'getGameById',
//         connection: client,
//         data: {_id: game._id}
//     },
//     immediateExecutionGetGameByIdCallback
// );


// function immediateExecutionGetGameByIdCallback(err, result) {
//     describe('immediateExecutionGetGameByIdCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should have all the keys defined', function() {
//             expect(result).to.only.have.keys( keys );
//         });
//     });
// }


// /**
// *   immediateExecutionGetGamesByCategoryId
// *   Test case for immediate execution of getting the detail of particular game by using Category id
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionGetGamesByCategoryId = apiCallFactory.createCall(
//     {
//         callType: 'getGamesByCategoryId',
//         connection: client,
//         data: {_category_id: game._category_id}
//     },
//     immediateExecutionGetGamesByCategoryIdCallback
// );


// function immediateExecutionGetGamesByCategoryIdCallback(err, result) {
//     describe('immediateExecutionGetGamesByCategoryIdCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should not be null', function() {
//             expect(result).not.to.be(null);
//         });
//         it('result should not be undefined', function() {
//             expect(result).not.to.be(undefined);
//         });
//         // Avoid runtime errors
//         if (result) {
//             result.forEach(function(data){
//                 it('a game should have all the keys defined', function() {
//                     expect(data).to.only.have.keys( keys );
//                 });
//             })
//         }

//     });
// }

// /**
// *   immediateExecutionGetGamesByFlagId
// *   Test case for immediate execution of getting the detail of particular game by using flag id
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionGetGamesByFlagId = apiCallFactory.createCall(
//     {
//         callType: 'getGamesByFlagId',
//         connection: client,
//         data: {_flag_id: game._flag_ids[0]}
//     },
//     immediateExecutionGetGamesByFlagIdCallback
// );


// function immediateExecutionGetGamesByFlagIdCallback(err, result) {
//     describe('immediateExecutionGetGamesByFlagIdCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should not be null', function() {
//             expect(result).not.to.be(null);
//         });
//         it('result should not be undefined', function() {
//             expect(result).not.to.be(undefined);
//         });
//         // Avoid runtime errors
//         if (result) {
//             result.forEach(function(data){
//                 it('a game should have all the keys defined', function() {
//                     expect(data).to.only.have.keys( keys );
//                 });
//             })
//         }
//     });
// }

// /**
// *   immediateExecutionGetGamesByPlatformId
// *   Test case for immediate execution of getting the detail of particular game by using platform id
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionGetGamesByPlatformId = apiCallFactory.createCall(
//     {
//         callType: 'getGamesByPlatformId',
//         connection: client,
//         data: {_platform_id: game._platform_ids[0]}
//     },
//     immediateExecutionGetGamesByPlatformIdCallback
// );


// function immediateExecutionGetGamesByPlatformIdCallback(err, result) {
//     describe('immediateExecutionGetGamesByPlatformIdCallback',function() {

//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should not be null', function() {
//             expect(result).not.to.be(null);
//         });
//         it('result should not be undefined', function() {
//             expect(result).not.to.be(undefined);
//         });
//         // Avoid runtime errors
//         if (result) {
//             result.forEach(function(data){
//                 it('a game should have all the keys defined', function() {
//                     expect(data).to.only.have.keys( keys );
//                 });
//             })
//         }

//     });

// }

// /**
// *   immediateExecutionGetGamesByPlatformId
// *   Test case for immediate execution of getting the detail of particular game by using platform id
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index  .js
// **/
// var immediateExecutionGetGamesByRestrictedCountryId = apiCallFactory.createCall(
//     {
//         callType: 'getGamesByRestrictedCountryId',
//         connection: client,
//         data: {_restricted_country_id: game._restricted_country_ids[0]}
//     },
//     immediateExecutionGetGamesByRestrictedCountryIdCallback
// );


// function immediateExecutionGetGamesByRestrictedCountryIdCallback(err, result) {
//     describe('immediateExecutionGetGamesByRestrictedCountryIdCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should not be null', function() {
//             expect(result).not.to.be(null);
//         });
//         it('result should not be undefined', function() {
//             expect(result).not.to.be(undefined);
//         });
//         // Avoid runtime errors
//         if (result) {
//             result.forEach(function(data){
//                 it('result should have all the keys defined', function() {
//                     expect(data).to.only.have.keys( keys );
//                 });
//             })
//         }
//     });
// }

// /**
// *   immediateExecutionGetGamesByVendorGameId
// *   Test case for immediate execution of getting the detail of particular game by using game vendor id
// *   we get game from the mock data which was declare in ./testData.js
// *   schema is declare in m-modules repo under models/index.js
// **/
// var immediateExecutionGetGamesByVendorGameId = apiCallFactory.createCall(
//     {
//         callType: 'getGamesByVendorGameId',
//         connection: client,
//         data: {vendor_game_id: game.vendor_game_id}
//     },
//     immediateExecutionGetGamesByVendorGameIdCallback
// );


// function immediateExecutionGetGamesByVendorGameIdCallback(err, result) {
//     describe('immediateExecutionGetGamesByVendorGameIdCallback',function() {
//         it('error should be null', function() {
//             expect(err).to.be(null);
//         });
//         it('result should not be null', function() {
//             expect(result).not.to.be(null);
//         });
//         it('result should not be undefined', function() {
//             expect(result).not.to.be(undefined);
//         });
//         // Avoid runtime errors
//         if (result) {
//             result.forEach(function(data){
//                 it('a game should have all the keys defined', function() {
//                     expect(data).to.only.have.keys( keys );
//                 });
//             })
//         }
//     });
// }
