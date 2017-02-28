'use strict';

function solve() {


    const VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error('Invalid string!')
            }
        },

        validateInegerNumber: function(num) {
            if (typeof num !== 'number' || isNaN(num) || num !== parseInt(num, 10)) {
                throw new Error('Not valid integer Number!');
            }
        },
        isLatinLetters: function(str) {
            if (!(/^[a-zA-Z|\s]*$/.test(str))) {
                throw new Error('Symbols must be allowes latin letters and whitespaces!');
            }
        },
        validateNameLengthInclusive: function(str, min, max) {
            this.isString(str);
            this.isLatinLetters(str);
            if (str.length < min || str.length > max) {
                throw new Error('Invalid string length!');
            }
        },
        validateDescription: function(str, max) {
            this.isString(str);
            if (str.length === 0 || str === '' || str.length >= max) {
                throw new Error('Invalid description length!');
            }
        },
        validateRestToTwoMinutes: function(value, max) {
            this.validateInegerNumber(value);
            if (value >= max || value < 0) {
                throw new Error('Invalid Rest Time! Nobody can rest for more 2 minutes!');
            }
        },
        validatePersonalRating: function(value, max) {
            this.validateInegerNumber(value);
            if (value > max) {
                throw new Error(`Rating must be less than ${max}!`);
            }
        },
        validateImprovementsStats: function(obj) {
            if (typeof obj !== 'object' || !(obj.hasOwnProperty('caloriesBurn')) || !(obj.hasOwnProperty('performanceGain'))) {
                throw new Error('Invalid Object!');
            }
            for (const key in obj) {
                VALIDATION.validateInegerNumber(obj[key]);
                if (obj[key] < 0) {
                    throw new Error('Must be positive Integer!');
                }
            }
        },
        validateUpdateObject: function(obj) {
            if (typeof obj !== 'object' || !(obj.hasOwnProperty('name'))) {
                throw new Error('Invalid object for update!');
            }

            if (obj.hasOwnProperty('description')) {
                this.validateDescription(obj.description, 160);
            }

            if (obj.hasOwnProperty('rest')) {
                this.validateRestToTwoMinutes(obj.rest, 120);
            }

            if (obj.hasOwnProperty('trainingPartner')) {
                this.isString(obj.trainingPartner);
                this.isLatinLetters(obj.trainingPartner);
            }

            if (obj.hasOwnProperty('personalRating')) {
                this.validatePersonalRating(obj.personalRating);
            }

            if (obj.hasOwnProperty('improvementStats')) {
                this.validateImprovementsStats(obj.improvementStats);
            }
        }
    }

    // Your classes
    class Exercise {
        constructor(name, description, rest, trainingPartner, personalRating, improvementStats) {
            this.name = name;
            this.description = description;
            this.rest = rest;
            this._trainingPartner = trainingPartner;
            this.personalRating = personalRating;
            this.improvementStats = improvementStats;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            VALIDATION.validateNameLengthInclusive(value, 1, 30);
            this._name = value;
        }

        get description() {
            return this._description;
        }

        set description(value) {
            VALIDATION.validateDescription(value, 160);
            this._description = value;
        }

        get rest() {
            return this._rest;
        }

        set rest(value) {
            VALIDATION.validateRestToTwoMinutes(value, 120);
            this._rest = value;
        }

        get trainingPartner() {
            return this._trainingPartner;
        }

        // REAL READ-ONLY PROPERTY
        set trainingPartner(value) {
            VALIDATION.isString(value);
            VALIDATION.isLatinLetters(value);
            Object.defineProperty(this, `_trainingPartner`, {
                value: value,
                writable: false,
                enumerable: false
            });
        }

        get personalRating() {
            return this._personalRating;
        }

        set personalRating(value) {
            VALIDATION.validatePersonalRating(value);
            this._personalRating = value;
        }

        get improvementStats() {
            return this._improvementStats;
        }

        set improvementStats(obj) {
            VALIDATION.validateImprovementsStats(obj);
            this._improvementStats = obj;
        }

        update(object) {
            VALIDATION.validateUpdateObject(object);
            this.name = object.name;
            if (object.hasOwnProperty('description')) {
                this.description = object.description;
            }

            if (object.hasOwnProperty('rest')) {
                this.rest = object.rest;
            }

            if (object.hasOwnProperty('trainingPartner')) {
                throw new Error('Can not change partner!');
            }

            if (object.hasOwnProperty('personalRating')) {
                this.personalRating = object.personalRating;
            }

            if (object.hasOwnProperty('improvementStats')) {
                this.improvementStats = object.improvementStats;
            }

            return this;
        }
    }

    return {
        createExercise(name, description, rest, trainingPartner, personalRating, improvementStats) {
            return new Exercise(name, description, rest, trainingPartner, personalRating, improvementStats);
        },
        createTrainingPlanner(personalData) {
            // return new instance of Training Planner
        }
    };
}

// Submit the code above this line in bgcoder.com
module.exports = solve;

let trainingPlanner = solve();

let exercise = trainingPlanner.createExercise('Dory', 'description', 30, 'Kalinchetoy1', 10, { caloriesBurn: 400, performanceGain: 1 });

let updateExercise = { name: 'Georgi', description: 'description', rest: 60, trainingPartner: 'Stoyan' }
console.log(exercise);