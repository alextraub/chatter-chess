import React, { useState, useEffect } from 'react';
import Amplify, {API, Auth} from 'aws-amplify';
import { Paper } from '@material-ui/core';
import {Button} from "reactstrap";
import awsconfig from '../../aws-exports';
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";
import './GameList.css';
const {v4 : uuidv4} = require('uuid');
Amplify.configure(awsconfig);

const GameList = () => {
    const uuidForDelete = uuidv4();

    const [games, setGames] = useState([]);

    // const [gameToBeDeleted, setGameToBeDeleted] = useState(uuidForDelete);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            console.log("about to list games");
            const gameData = await API.graphql({query: queries.listGames, variables: {owner: Auth.currentAuthenticatedUser().email}, authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS});
            console.log("game data retrieved");
            const gameList = gameData.data.listGames.items;
            console.log('game list', gameList);
            setGames(gameList);
        } catch (error) {
            console.log('error on fetching games', error);
        }
    };

    const addGame = async() => {
        try {
            const uuid = uuidv4();
            const pieces = [{player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "PAWN", captured: false},
                {player: "WHITE", type: "ROOK", captured: false},
                {player: "WHITE", type: "ROOK", captured: false},
                {player: "WHITE", type: "KNIGHT", captured: false},
                {player: "WHITE", type: "KNIGHT", captured: false},
                {player: "WHITE", type: "BISHOP", captured: false},
                {player: "WHITE", type: "BISHOP", captured: false},
                {player: "WHITE", type: "KING", captured: false},
                {player: "WHITE", type: "QUEEN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "PAWN", captured: false},
                {player: "BLACK", type: "ROOK", captured: false},
                {player: "BLACK", type: "ROOK", captured: false},
                {player: "BLACK", type: "KNIGHT", captured: false},
                {player: "BLACK", type: "KNIGHT", captured: false},
                {player: "BLACK", type: "BISHOP", captured: false},
                {player: "BLACK", type: "BISHOP", captured: false},
                {player: "BLACK", type: "KING", captured: false},
                {player: "BLACK", type: "QUEEN", captured: false}
            ];
            const checkStatusWhite = {
                status: false,
                mate: false
            };
            const checkStatusBlack = {
                status: false,
                mate: false
            };
            const game = {
                id: uuid,
                turn: 1,
                pieces: pieces,
                checkStatusWhite: checkStatusWhite,
                checkStatusBlack: checkStatusBlack,
            };
            const gameData = await API.graphql({query: mutations.createGame, variables: {input: game}, authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS});
            window.location.reload();
            console.log('Game', gameData);
        } catch (error) {
            console.log('error on creating game', error);
        }
    };

    const removeGame = async(game) => {
    	try {
            // console.log('generated uuid', uuidForDelete);
    	    // console.log('uuid', gameToBeDeleted);
    		console.log('About to remove game');
    		const gameToBeDeleted = {id: game.id, expectedVersion: game.version};
    		console.log('Removing Game', game);
    		await API.graphql({query: mutations.deleteGame, variables: {input: gameToBeDeleted}, authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS});
            window.location.reload();
    	} catch (error) {
    		console.log('error on deleting game', error);
    	}
    };

    return (
        <div className="gameList">
            <h1 style={{color: 'white'}}>Games</h1>
            <Button color="primary" onClick={() => {
                addGame();
            }}>Create New Game</Button>
            {games.map((game, idx) => {
                return (
                    <Paper variant="outlined" elevation={2} key={`game${idx}`}>
                        <div className="gameCard">
                            <div style={{float: 'left'}}>
                                <b><div className="gameInfo">Current Turn: {(game.turn % 2 === 0) ? 'Black' : 'White'}</div></b>
                            </div>
                            <div style={{float: 'left'}}>
                                <Button className="gameButton" color="success" onClick={() => {

                                }}>Play Game</Button>
                                <Button className="gameButton" color="danger" onClick={() => {
                                    // setGameToBeDeleted(game.id);
                                    removeGame(game);
                                }}>Forfeit Game</Button>
                            </div>
                        </div>
                    </Paper>
                );
            })}
        </div>
    )
};

export default GameList;