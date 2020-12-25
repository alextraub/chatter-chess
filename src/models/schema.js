export const schema = {
    "models": {
        "Game": {
            "name": "Game",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "turn": {
                    "name": "turn",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "pieces": {
                    "name": "pieces",
                    "isArray": true,
                    "type": {
                        "nonModel": "Piece"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "check": {
                    "name": "check",
                    "isArray": false,
                    "type": {
                        "nonModel": "Check"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Games",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "allow": "private",
                                "provider": "iam",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "Player": {
            "name": "Player",
            "values": [
                "WHITE",
                "BLACK"
            ]
        },
        "PieceType": {
            "name": "PieceType",
            "values": [
                "PAWN",
                "ROOK",
                "KNIGHT",
                "BISHOP",
                "QUEEN",
                "KING",
                "GENERIC"
            ]
        }
    },
    "nonModels": {
        "Position": {
            "name": "Position",
            "fields": {
                "row": {
                    "name": "row",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "col": {
                    "name": "col",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Piece": {
            "name": "Piece",
            "fields": {
                "player": {
                    "name": "player",
                    "isArray": false,
                    "type": {
                        "enum": "Player"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "PieceType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "captured": {
                    "name": "captured",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "position": {
                    "name": "position",
                    "isArray": false,
                    "type": {
                        "nonModel": "Position"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "CheckStatus": {
            "name": "CheckStatus",
            "fields": {
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "mate": {
                    "name": "mate",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Check": {
            "name": "Check",
            "fields": {
                "WHITE": {
                    "name": "WHITE",
                    "isArray": false,
                    "type": {
                        "nonModel": "CheckStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "BLACK": {
                    "name": "BLACK",
                    "isArray": false,
                    "type": {
                        "nonModel": "CheckStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "ff20830d50e08170a34b4d369b590579"
};