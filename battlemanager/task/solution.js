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
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    const VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE); // OK?
            }
        },
        stringRangeLength: function(str, min, max) {
            if (str.length < min || str.length > max) { // ok
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
        },
        strSymbolsValidate: function(str) { //ok
            if ((/^[a-zA-Z]|\s*$/.test(str))) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        manaPositiveInteger: function(value) {
            if (typeof value !== 'number' || isNaN(value) || value < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        },
        effectIsFunction: function(value) {
            if (typeof value !== 'function' || value.length !== 1) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        }

    }

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            VALIDATION.isString(value);
            VALIDATION.stringRangeLength(value, 2, 20);
            VALIDATION.strSymbolsValidate(value);
            this._name = value;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(value) {
            VALIDATION.manaPositiveInteger(value);
            this._manaCost = value;
        }

        get effect() {
            return this._effect;
        }

        set effect(value) {
            VALIDATION.effectIsFunction(value); //ok?
            this._effect = value;
        }
    }

    class Battlemanager {
        constructor() {}

        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        }
    }


    // your implementation goes here

    return new Battlemanager();

}


let myBattlemanager = solve();
console.log(myBattlemanager.getSpell('Dory', 42, target => target.count -= 2));