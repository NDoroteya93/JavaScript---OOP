'use strict';

function solve() {

    'use strict';
    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
        INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
    };

    ///////////////////////////////////// Get Unique Id /////////////////////////////////////
    const getNextId = (function() {
        let id = 0;

        return function() {
            id += 1;
            return id;
        }
    })();


    ///////////////////////////////////// Validation  /////////////////////////////////////
    const VALIDATOR = {

        validationLength: function(n, min, max) {
            if (n < min || n > max) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
        },

        validationString: function(str) {
            if (typeof str !== 'string') {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }
        },

        validateInvalidSymbols: function(str) {
            if (!(/^[a-zA-Z|\s]*$/.test(str))) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },

        validateMana: function(count, min) {
            if (typeof count !== 'number' || count < min || Number.isNaN(count)) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        },

        validateEffect: function(func) {
            if (typeof func !== 'function' || func.length !== 1) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        },

        validateAlignment: function(str) {
            this.validationString(str);
            if (str !== 'good' && str !== 'neutral' && str !== 'evil') {
                throw new Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }
        },
        validateDamage: function(n, max, error) {
            if (typeof n !== 'number' && n < 0 || n > max) {
                throw new Error(error)
            }
        },
        validateCount: function(n) {
            if (typeof n !== 'number' && n < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }
        }
    }



    // your implementation goes here
    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }

        set name(x) {
            VALIDATOR.validationString(x);
            VALIDATOR.validationLength(x.length, 2, 20);
            VALIDATOR.validateInvalidSymbols(x);
            this._name = x;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(newMana) {
            VALIDATOR.validateMana(newMana, 1);
            this._manaCost = newMana;
        }

        get effect() {
            return this._effect;
        }

        set effect(newEffect) {
            VALIDATOR.validateEffect(newEffect);
            this._effect = newEffect;
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }
        set name(newName) {
            VALIDATOR.validationString(newName);
            VALIDATOR.validationLength(newName.length, 2, 20);
            VALIDATOR.validateInvalidSymbols(newName);
            this._name = newName;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(newAlignment) {
            VALIDATOR.validateAlignment(newAlignment);
            this._alignment = newAlignment;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, count, speed, damage, health) {
            super(name, alignment);
            this._id = getNextId();
            this.health = health;
            this.damage = damage;
            this.count = count;
            this.speed = speed;
        }

        get id() {
            return this._id;
        }

        get damage() {
            return this._damage;
        }

        set damage(newDamage) {
            VALIDATOR.validateDamage(newDamage, 100, ERROR_MESSAGES.INVALID_DAMAGE);
            this._damage = newDamage;
        }

        get health() {
            return this._health;
        }

        set health(newHealth) {
            VALIDATOR.validateDamage(newHealth, 200, ERROR_MESSAGES.INVALID_HEALTH);
            return this._health = newHealth;
        }

        get count() {
            return this._count;
        }

        set count(newCount) {
            this._count = newCount;
        }

        get speed() {
            return this._speed;
        }

        set speed(newSpeed) {
            VALIDATOR.validateDamage(newSpeed, 100, ERROR_MESSAGES.INVALID_SPEED);
            this._speed = newSpeed;
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana, spellbook, army) {
            super(name, alignment);
            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }

        get mana() {
            return this._mana;
        }

        set mana(newMana) {

            VALIDATOR.validateMana(newMana, 0);
            this._mana = newMana;
        }

        get spellbook() {
            return this._spellbook;
        }

        set spellbook(newSpeelbook) {
            this._spellbook = newSpeelbook;
        }

        get army() {
            return this._army;
        }

        set army(newArmy) {
            this._army = newArmy;
        }

    }
    Array.prototype.filterByProperty = function(query, propName) {
        if (!query.hasOwnProperty(propName)) {
            return this;
        }
        // propName is string and it`s not possible to access with query.propName
        const value = query[propName];
        return this.filter(prop => prop[propName] === value);

    }

    function compare(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }
    const battlemanagerData = {
        commanders: [],
        armyUnitsObj: {},
        armyUnits: [],
    }

    const battlemanager = {

        getCommander: function(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        },

        getArmyUnit: function(options) {
            const { name, alignment, speed, count, damage, health } = options;
            let init = new ArmyUnit(name, alignment, count, speed, damage, health);
            battlemanagerData.armyUnitsObj[init.id] = init;
            battlemanagerData.armyUnits.push(init);
            return init;
        },
        getSpell: function(name, manaCost, effect) {
            return new Spell(name, manaCost, effect)
        },
        addCommanders: function(...commanders) {
            battlemanagerData.commanders.push(...commanders);
            return this;
        },
        addArmyUnitTo: function(commanderName, armyUnit) {
            battlemanagerData.commanders
                .find(function(commander) {
                    if (commander.name === commanderName) {
                        commander.army.push(armyUnit);
                    }
                })


            return this;
        },
        addSpellsTo: function(commanderName, ...spells) {
            // spells.forEach(spell => {
            //     if (typeof spell !== 'object') {
            //         throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
            //     }
            // })

            try {
                battlemanagerData.commanders
                    .find(commander => commander.name === commanderName)
                    .spellbook.push(...(spells.map(spell => new Spell(spell.name, spell.manaCost, spell.effect))));
            } catch (e) {
                throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
            }

            return this;
        },
        findCommanders: function(query) {

            const { name, alignment } = query;

            return battlemanagerData.commanders
                .slice()
                .filterByProperty(query, 'name')
                .filterByProperty(query, 'alignment')
                .sort(compare);

        },
        findArmyUnitById: function(id) {
            return battlemanagerData.armyUnitsObj[id];
        },
        findArmyUnits: function(query) {
            let newArr = battlemanagerData.armyUnits
                .filterByProperty(query, 'id')
                .filterByProperty(query, 'name')
                .filterByProperty(query, 'alignment')
                .sort(function(a, b) {
                    let cmd = b.speed - a.speed;
                    if (cmd === 0) {
                        return a.name.localeCompare(b.name);
                    }
                    return cmd;
                });

            return newArr;
        },
        spellcast: function(casterName, spellName, targetUnitId) {
            let findCommander = battlemanagerData.commanders
                .find(c => c.name === casterName);

            if (typeof findCommander === 'undefined') {
                throw new Error(`Can't cast with non-existant commander ${casterName}!`)
            }
            const spell = findCommander.spellbook
                .find(s => s.name === spellName);


            if (spell === undefined) {
                throw new Error(`${casterName} doesn't know ${spellName}`)
            }

            if (findCommander.mana < spell.manaCost) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }

            findCommander.mana -= spell.manaCost;

            let id = battlemanagerData.armyUnitsObj[targetUnitId];

            if (id === undefined) {
                throw new Error(ERROR_MESSAGES.TARGET_NOT_FOUND);
            }

            spell.effect(id);

            return this;

        },
        battle: function(attacker, defender) {

            if (typeof attacker !== 'object' || typeof defender !== 'object') {
                throw new Error(ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
            }

            if (typeof attacker.count === 'undefined' || typeof attacker.health === 'undefined' || typeof attacker.damage === 'undefined') {
                throw new Error(ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
            }

            if (typeof defender.count === 'undefined' || typeof defender.health === 'undefined' || typeof defender.damage === 'undefined') {
                throw new Error(ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
            }
            let totalDamage = attacker.damage * attacker.count;
            let totalHealth = defender.health * defender.count;
            totalHealth -= totalDamage;
            defender.count = Math.ceil(totalHealth / defender.health);
            if (defender.count < 0) {
                defender.count = 0;
            }

            return this;
        },
    };

    return battlemanager;
}

function compareUnits(first, second) {
    if (second.speed - first.speed)
        return second.speed - first.speed

    return compareNames(first.name, second.name)
}


function compareNames(first, second) {
    return Number(first > second) - 0.5
}

const MANAGER = solve();
const tinkyWinky = MANAGER.getCommander('Tinky Winky', 'good', 66),
    billGates = MANAGER.getCommander('Bill Gates', 'evil', 66)

MANAGER.addCommanders(tinkyWinky, billGates)

const armyUnits = {
    dwarfs: MANAGER.getArmyUnit({ name: 'Dwarfs', speed: 20, damage: 33, health: 44, alignment: 'good', count: 50 }),
    codeMonkeys: MANAGER.getArmyUnit({ name: 'Code Monkeys', speed: 20, damage: 5, health: 5, alignment: 'good', count: 300 }),
    students: MANAGER.getArmyUnit({ name: 'Students', speed: 20, damage: 25, health: 33, alignment: 'good', count: 100 }),
    mages1: MANAGER.getArmyUnit({ name: 'Mages One', speed: 15, damage: 60, health: 25, alignment: 'good', count: 5 }),
    mages2: MANAGER.getArmyUnit({ name: 'Mages Two', speed: 15, damage: 60, health: 25, alignment: 'good', count: 50 }),
    mages3: MANAGER.getArmyUnit({ name: 'Mages Three', speed: 15, damage: 60, health: 25, alignment: 'good', count: 3 }),
}

MANAGER
    .addArmyUnitTo('Tinky Winky', armyUnits.dwarfs)
    .addArmyUnitTo('Bill Gates', armyUnits.codeMonkeys)
    .addArmyUnitTo('Bill Gates', armyUnits.students)
    .addArmyUnitTo('Bill Gates', armyUnits.mages1)
    .addArmyUnitTo('Tinky Winky', armyUnits.mages2)
    .addArmyUnitTo('Bill Gates', armyUnits.mages3)

const allUnits = MANAGER.findArmyUnits({})


console.log(allUnits);


module.exports = solve;