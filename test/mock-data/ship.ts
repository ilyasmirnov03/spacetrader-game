import { ShipModel } from '../../src/models/ship.model';

export const Ship: ShipModel = {
    "symbol": "TEST-SHIP",
    "nav": {
        "systemSymbol": "X1-HH96",
        "waypointSymbol": "X1-HH96-B7",
        "route": {
            "departure": {
                "symbol": "X1-HH96-B9",
                "type": "ASTEROID",
                "systemSymbol": "X1-HH96",
                "x": 50,
                "y": 348
            },
            "origin": {
                "symbol": "X1-HH96-B9",
                "type": "ASTEROID",
                "systemSymbol": "X1-HH96",
                "x": 50,
                "y": 348
            },
            "destination": {
                "symbol": "X1-HH96-B7",
                "type": "ASTEROID_BASE",
                "systemSymbol": "X1-HH96",
                "x": 55,
                "y": 343
            },
            "arrival": "2023-12-12T16:09:25.025Z",
            "departureTime": "2023-12-12T16:08:12.025Z"
        },
        "status": "IN_TRANSIT",
        "flightMode": "DRIFT"
    },
    "crew": {
        "current": 57,
        "capacity": 80,
        "required": 57,
        "rotation": "STRICT",
        "morale": 100,
        "wages": 0
    },
    "fuel": {
        "current": 385,
        "capacity": 400,
        "consumed": {
            "amount": 1,
            "timestamp": "2023-12-12T16:08:12.038Z"
        }
    },
    "cooldown": {
        "shipSymbol": "TEST-SHIP",
        "totalSeconds": 80,
        "remainingSeconds": 15,
        "expiration": "2023-12-12T16:09:18.487Z"
    },
    "frame": {
        "symbol": "FRAME_FRIGATE",
        "name": "Frigate",
        "description": "A medium-sized, multi-purpose spacecraft, often used for combat, transport, or support operations.",
        "moduleSlots": 8,
        "mountingPoints": 5,
        "fuelCapacity": 400,
        "condition": 100,
        "requirements": {
            "power": 8,
            "crew": 25
        }
    },
    "reactor": {
        "symbol": "REACTOR_FISSION_I",
        "name": "Fission Reactor I",
        "description": "A basic fission power reactor, used to generate electricity from nuclear fission reactions.",
        "condition": 100,
        "powerOutput": 31,
        "requirements": {
            "power": 0,
            "crew": 8
        }
    },
    "engine": {
        "symbol": "ENGINE_ION_DRIVE_II",
        "name": "Ion Drive II",
        "description": "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration, with improved efficiency and performance.",
        "condition": 100,
        "speed": 30,
        "requirements": {
            "power": 6,
            "crew": 8
        }
    },
    "modules": [
        {
            "symbol": "MODULE_CARGO_HOLD_II",
            "name": "Expanded Cargo Hold",
            "description": "An expanded cargo hold module that provides more efficient storage space for a ship's cargo.",
            "capacity": 40,
            "requirements": {
                "crew": 2,
                "power": 2,
                "slots": 2
            }
        },
        {
            "symbol": "MODULE_CREW_QUARTERS_I",
            "name": "Crew Quarters",
            "description": "A module that provides living space and amenities for the crew.",
            "capacity": 40,
            "requirements": {
                "crew": 2,
                "power": 1,
                "slots": 1
            }
        },
        {
            "symbol": "MODULE_CREW_QUARTERS_I",
            "name": "Crew Quarters",
            "description": "A module that provides living space and amenities for the crew.",
            "capacity": 40,
            "requirements": {
                "crew": 2,
                "power": 1,
                "slots": 1
            }
        },
        {
            "symbol": "MODULE_MINERAL_PROCESSOR_I",
            "name": "Mineral Processor",
            "description": "Crushes and processes extracted minerals and ores into their component parts, filters out impurities, and containerizes them into raw storage units.",
            "requirements": {
                "crew": 0,
                "power": 1,
                "slots": 2
            }
        },
        {
            "symbol": "MODULE_GAS_PROCESSOR_I",
            "name": "Gas Processor",
            "description": "Filters and processes extracted gases into their component parts, filters out impurities, and containerizes them into raw storage units.",
            "requirements": {
                "crew": 0,
                "power": 1,
                "slots": 2
            }
        }
    ],
    "mounts": [
        {
            "symbol": "MOUNT_SENSOR_ARRAY_II",
            "name": "Sensor Array II",
            "description": "An advanced sensor array that improves a ship's ability to detect and track other objects in space with greater accuracy and range.",
            "strength": 4,
            "requirements": {
                "crew": 2,
                "power": 2
            }
        },
        {
            "symbol": "MOUNT_GAS_SIPHON_II",
            "name": "Gas Siphon II",
            "description": "An advanced gas siphon that can extract gas from gas giants and other gas-rich bodies more efficiently and at a higher rate.",
            "strength": 20,
            "requirements": {
                "crew": 2,
                "power": 2
            }
        },
        {
            "symbol": "MOUNT_MINING_LASER_II",
            "name": "Mining Laser II",
            "description": "An advanced mining laser that is more efficient and effective at extracting valuable minerals from asteroids and other space objects.",
            "strength": 5,
            "requirements": {
                "crew": 2,
                "power": 2
            }
        },
        {
            "symbol": "MOUNT_SURVEYOR_II",
            "name": "Surveyor II",
            "description": "An advanced survey probe that can be used to gather information about a mineral deposit with greater accuracy.",
            "strength": 2,
            "deposits": [
                "QUARTZ_SAND",
                "SILICON_CRYSTALS",
                "PRECIOUS_STONES",
                "ICE_WATER",
                "AMMONIA_ICE",
                "IRON_ORE",
                "COPPER_ORE",
                "SILVER_ORE",
                "ALUMINUM_ORE",
                "GOLD_ORE",
                "PLATINUM_ORE",
                "DIAMONDS",
                "URANITE_ORE"
            ],
            "requirements": {
                "crew": 4,
                "power": 3
            }
        }
    ],
    "registration": {
        "name": "TEST-SHIP",
        "factionSymbol": "COSMIC",
        "role": "COMMAND"
    },
    "cargo": {
        "capacity": 40,
        "units": 40,
        "inventory": [
            {
                "symbol": "ICE_WATER",
                "name": "Fresh Water",
                "description": "High-quality fresh water, essential for life support and hydroponic agriculture.",
                "units": 4
            },
            {
                "symbol": "SILICON_CRYSTALS",
                "name": "Silicon Crystals",
                "description": "High-quality silicon crystals used in the production of advanced electronic components and solar panels.",
                "units": 11
            },
            {
                "symbol": "IRON_ORE",
                "name": "Iron Ore",
                "description": "A common and valuable ore used in the production of steel and other alloys.",
                "units": 13
            },
            {
                "symbol": "QUARTZ_SAND",
                "name": "Quartz Sand",
                "description": "High-purity quartz sand used in the production of glass and ceramics.",
                "units": 6
            },
            {
                "symbol": "AMMONIA_ICE",
                "name": "Ammonia Ice",
                "description": "A valuable substance used in the production of fertilizers and other chemical products.",
                "units": 6
            }
        ]
    }
}