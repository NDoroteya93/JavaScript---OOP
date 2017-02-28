'use strict';

function solve() {


    const VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error('Invalid string!')
            }
        },

        validateIntegerNumber: function(num) {
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
            this.validateIntegerNumber(value);
            if (value >= max || value < 0) {
                throw new Error('Invalid Rest Time! Nobody can rest for more 2 minutes!');
            }
        },
        validatePersonalRating: function(value, max) {
            this.validateIntegerNumber(value);
            if (value > max) {
                throw new Error(`Rating must be less than ${max}!`);
            }
        },
        validateImprovementsStats: function(obj) {
            if (typeof obj !== 'object' || !(obj.hasOwnProperty('caloriesBurn')) || !(obj.hasOwnProperty('performanceGain'))) {
                throw new Error('Invalid Object!');
            }
            for (const key in obj) {
                VALIDATION.validateIntegerNumber(obj[key]);
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
        },
        valiidateNumberOfSets: function(value, max) {
            this.validateIntegerNumber(value);
            if (value >= max || value < 0) {
                throw new Error('Number of set must be positive integer!');
            }
        },
        validateMuscleGroup: function(str, max) {
            this.isString(str);
            this.isLatinLetters(str);
            if (str.length === 0 || str.length === '' || str.length > max) {
                throw new Error('Invalid muscle group!');
            }
        },
        bestWeightValidation: function(val, max) {
            this.validateIntegerNumber(val);
            if (val > max || val < 0) {
                throw new Error('Best weight must be positive integer!')
            }
        },
        gymUpdateValidation: function(obj, oldNumOfSets) {
            if (obj.hasOwnProperty('numberOfSets')) {
                this.valiidateNumberOfSets(obj.numberOfSets, 10);
            }
            if (obj.hasOwnProperty('primaryMuscleGroup')) {
                this.validateMuscleGroup(obj.primaryMuscleGroup, 50);
            }

            if (obj.hasOwnProperty('secondaryMuscleGroup')) {
                this.validateMuscleGroup(obj.secondaryMuscleGroup, 75);
            }

            if (obj.hasOwnProperty('bestWeight')) {
                this.bestWeightValidation(obj.bestWeight, 100);
                if (obj.bestWeight < oldNumOfSets) {
                    throw new Error('Train harder, you weakling!');
                }
            }

        },
        difficultyPoledancing: function(value) {
            this.isString(value);
            if (value !== 'easy' && value !== 'intermediate' && value !== 'advanced' && value !== 'expert' && value !== 'dorylevel') {
                throw new Error('Invalid pole dance level!');
            }
        },
        typePoleDancing: function(value) {
            this.isString(value);
            if (value !== 'dance' && value !== 'strength') {
                throw new Error('Invalid pole dance type training!');
            }
        },
        personalDataValue: function(obj) {
            if (typeof obj !== 'object' || !(obj.hasOwnProperty('weight')) || !(obj.hasOwnProperty('fatPercentage')) || !(obj.hasOwnProperty('endurance')) || !(obj.hasOwnProperty('strength'))) {
                throw new Error('Invalid personal data object!');
            }
            this.validateIntegerNumber(object.bestWeight);
            this.validateIntegerNumber(object.fatPercentage);
            this.validateIntegerNumber(object.endurance);
            this.validateIntegerNumber(object.strength);

            if (object.bestWeight < 0 || object.endurance < 0 || object.strength < 0) {
                throw new Error('Invalid personal data!');
            }

            if (object.fatPercentage < 0 || object.fatPercentage > 40) {
                throw new Error('Invalid fat Percentage!')
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
                writable: false
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



            if (object.hasOwnProperty('personalRating')) {
                this.personalRating = object.personalRating;
            }

            if (object.hasOwnProperty('improvementStats')) {
                this.improvementStats = object.improvementStats;
            }

            return this;
        }
    }

    class GymExercise extends Exercise {
        constructor(name, description, rest, trainingPlanner, personalRating, improvementStats, numberOfSets, primaryMuscleGroup, secondaryMuscleGroup, bestWeight) {
            super(name, description, rest, trainingPlanner, personalRating, improvementStats);
            this.numberOfSets = numberOfSets;
            this.primaryMuscleGroup = primaryMuscleGroup;
            this.secondaryMuscleGroup = secondaryMuscleGroup;
            this.bestWeight = bestWeight;
        }

        get numberOfSets() {
            return this._numberOfSets;
        }

        set numberOfSets(value) {
            VALIDATION.valiidateNumberOfSets(value, 10);
            this._numberOfSets = value;
        }

        get primaryMuscleGroup() {
            return this._primaryMuscleGroup;
        }

        set primaryMuscleGroup(value) {
            VALIDATION.validateMuscleGroup(value, 50);
            this._primaryMuscleGroup = value;
        }

        get secondaryMuscleGroup() {
            return this._secondaryMuscleGroup;
        }

        set secondaryMuscleGroup(value) {
            VALIDATION.validateMuscleGroup(value, 75);
            this._secondaryMuscleGroup = value;
        }

        get bestWeight() {
            return this._bestWeight;
        }

        set bestWeight(value) {
            VALIDATION.bestWeightValidation(value, 100);
            this._bestWeight = value;
        }

        update(object) {
            super.update(object);
            VALIDATION.gymUpdateValidation(object, this.bestWeight);

            if (object.hasOwnProperty('numberOfSets')) {
                this.numberOfSets = object.numberOfSets;
            }

            if (object.hasOwnProperty('primaryMuscleGroup')) {
                this.primaryMuscleGroup = object.primaryMuscleGroup;
            }

            if (object.hasOwnProperty('secondaryMuscleGroup')) {
                this.secondaryMuscleGroup = object.secondaryMuscleGroup;
            }

            if (object.hasOwnProperty('bestWeight')) {
                this.bestWeight = object.bestWeight;
            }
            return this;
        }
    }

    class PoleDancing extends Exercise {
        constructor(name, description, rest, trainingPartner, personalRating, improvementStats, difficulty, type) {
            super(name, description, rest, trainingPartner, personalRating, improvementStats);
            this.difficulty = difficulty;
            this.type = type;
        }

        get difficulty() {
            return this._difficulty;
        }

        set difficulty(value) {
            VALIDATION.difficultyPoledancing(value);
            this._difficulty = value;
        }

        get type() {
            return this._type;
        }

        set type(value) {
            VALIDATION.typePoleDancing(value);
            this._type = value;
        }
        update(object) {
            super.update(object);
            if (object.hasOwnProperty('difficulty')) {
                VALIDATION.difficultyPoledancing(object.difficulty);
                this.difficulty = object.difficulty;
            }

            if (object.hasOwnProperty('type')) {
                VALIDATION.typePoleDancing(object.type);
                this.type = object.type;
            }

            return this;
        }

    }

    class TrainingPlanner {
        constructor(personalData) {
            this.personalData = personalData;
            this._exerciseDatabase = [];
            this._schedule = [
                { day: 'monday', dailyExercises: [] },
                { day: 'tuesday', dailyExercises: [] },
                { day: 'wednesday', dailyExercises: [] },
                { day: 'thursday', dailyExercises: [] },
                { day: 'friday', dailyExercises: [] },
                { day: 'saturday', dailyExercises: [] },
                { day: 'sunday', dailyExercises: [] }
            ];
        }

        get personalData() {
            return this._personalData;
        }

        set personalData(value) {
            VALIDATION.personalDataValue(value);
            this._personalData = value;
        }

        get exerciseDatabase() {
            return this._exerciseDatabase;
        }

        get schedule() {
            return this._schedule;
        }
    }


    return {
        createTrainingPlanner(personalData) {
            // return new instance of Training Planner
        }
    };
}

// Submit the code above this line in bgcoder.com
module.exports = solve;

let trainingPlanner = solve();

// let exercise = trainingPlanner.createExercise('Dory', 'description', 30, 'Kalinchetoy1', 10, { caloriesBurn: 400, performanceGain: 1 });

let updateExercise = {
    name: 'Georgi',
    description: 'new description',
    rest: 60,
    personalRating: 9,
    improvementStats: { caloriesBurn: 700, performanceGain: 1 },
    difficulty: 'easy',
    type: 'dance'
};

// let gym = trainingPlanner.createGymExercise('Doroteya', 'description', 30, 'Pesho', 5, { caloriesBurn: 200, performanceGain: 5 }, 9, 'Gluteus max', 'Quadriceps max', 99);
// let poleDancing = trainingPlanner.createPoleDancing('Dory', 'mega qkiq sport', 5, 'Tedi', 9, { caloriesBurn: 300, performanceGain: 10 }, 'dorylevel', 'strength');
// console.log(poleDancing.update(updateExercise));
// console.log(exercise.update(updateExercise));