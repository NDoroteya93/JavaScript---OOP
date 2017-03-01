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
        personalDataValue: function(object) {
            if (typeof object !== 'object' || !(object.hasOwnProperty('weight')) || !(object.hasOwnProperty('fatPercentage')) || !(object.hasOwnProperty('endurance')) || !(object.hasOwnProperty('strength'))) {
                throw new Error('Invalid personal data object!');
            }
            this.validateIntegerNumber(object.weight);
            this.validateIntegerNumber(object.fatPercentage);
            this.validateIntegerNumber(object.endurance);
            this.validateIntegerNumber(object.strength);

            if (object.weight < 0 || object.endurance < 0 || object.strength < 0) {
                throw new Error('Invalid personal data!');
            }

            if (object.fatPercentage < 0 || object.fatPercentage > 40) {
                throw new Error('Invalid fat Percentage!')
            }
        },
        createExerciseObject: function(object) {
            if (object.hasOwnProperty('numberOfSets') || object.hasOwnProperty('primaryMuscleGroup') || object.hasOwnProperty('secondaryMuscleGroup ') || object.hasOwnProperty('bestWeight')) {
                try {
                    this.validateNameLengthInclusive(object.name, 1, 30);
                    this.validateDescription(object.description, 160);
                    this.validateRestToTwoMinutes(object.rest, 120);
                    this.isString(object.trainingPartner);
                    this.isLatinLetters(object.trainingPartner);
                    this.validatePersonalRating(object.personalRating);
                    this.validateImprovementsStats(object.improvementStats);
                    this.valiidateNumberOfSets(object.numberOfSets, 10);
                    this.validateMuscleGroup(object.primaryMuscleGroup, 50);
                    this.validateMuscleGroup(object.secondaryMuscleGroup, 75);
                    this.bestWeightValidation(object.bestWeight, 100);
                } catch (e) {
                    throw new Error('Invalid object for create exercise!')
                }
            } else if (object.hasOwnProperty('difficulty ') || object.hasOwnProperty('type')) {
                try {
                    this.validateNameLengthInclusive(object.name, 1, 30);
                    this.validateDescription(object.description, 160);
                    this.validateRestToTwoMinutes(object.rest, 120);
                    this.isString(object.trainingPartner);
                    this.isLatinLetters(object.trainingPartner);
                    this.validatePersonalRating(object.personalRating);
                    this.validateImprovementsStats(object.improvementStats);
                    this.difficultyPoledancing(object.difficulty);
                    this.typePoleDancing(object.type);
                } catch (e) {
                    throw new Error('Invalid object for create exercise!')
                }
            } else {
                throw new Error('Invalid Object for exercise!');
            }
        },
        exerciseIsAdded: function(name) {
            if (name !== -1) {
                throw new Error('Exercise with the same name already exist!');
            }
        },
        dayOfWeekValidate: function(day) {
            this.isString(day);
            if (day.toLowerCase() !== 'monday' && day !== 'tuesday' && day.toLowerCase() !== 'wednesday' && day.toLowerCase() !== 'thursday' && day.toLowerCase() !== 'friday' && day.toLowerCase() !== 'saturday' && day.toLowerCase() !== 'sunday') {
                throw new Error('Invalid day of the week!');
            }
        },
        validateInstanceOfObject: function(value) {
            if (!(value instanceof GymExercise) || !(value instanceof PoleDancing)) {
                throw new Error('Invalid instance of object!');
            }
        },
        searchExercicePropValidation: function(object) {
            if (typeof object !== 'object') {
                throw new Error('Invalid object');
            }
            if (object.hasOwnProperty('difficulty') && object.hasOwnProperty('primaryMuscleGroup')) {
                throw new Error('Invalid combination of properties!');
            }
        },
        valiteListProperty: function(prop) {
            if (prop === 'name') {
                throw new Error('Property can not be name!');
            }
        }
    }

    // Your classes
    class Exercise {
        constructor(name, description, rest, trainingPartner, personalRating, improvementStats) {
            this.name = name;
            this.description = description;
            this.rest = rest;
            this.trainingPartner = trainingPartner;
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

        createExercise(object) {
            VALIDATION.createExerciseObject(object);
            if (object.hasOwnProperty('numberOfSets') || object.hasOwnProperty('primaryMuscleGroup') || object.hasOwnProperty('secondaryMuscleGroup ') || object.hasOwnProperty('bestWeight')) {
                const { name, description, rest, trainingPartner, personalRating, improvementStats, numberOfSets, primaryMuscleGroup, secondaryMuscleGroup, bestWeight } = object;
                return new GymExercise(name, description, rest, trainingPartner, personalRating, improvementStats, numberOfSets, primaryMuscleGroup, secondaryMuscleGroup, bestWeight);
            }
            const { name, description, rest, trainingPartner, personalRating, improvementStats, difficulty, type } = object;

            return new PoleDancing(name, description, rest, trainingPartner, personalRating, improvementStats, difficulty, type);

        }

        addExerciseToDatabase(exercise) {
            if (Array.isArray(exercise)) {
                for (let i = 0; i < exercise.length; i++) {

                    try {
                        VALIDATION.createExerciseObject(exercise[i]);
                        let isAdded = this.exerciseDatabase.findIndex(x => x.name === exercise[i].name);
                        VALIDATION.exerciseIsAdded(isAdded);
                        this.exerciseDatabase.push(exercise[i])
                    } catch (e) {}
                }

                return this;
            }

            VALIDATION.createExerciseObject(exercise);
            let isAdded = this.exerciseDatabase.findIndex(x => x.name === exercise.name);
            VALIDATION.exerciseIsAdded(isAdded);
            this.exerciseDatabase.push(exercise);

            return this;
        }
        addExercisetoSchedule(day, exercise) {
                VALIDATION.dayOfWeekValidate(day);
                let self = this;
                if (Array.isArray(exercise)) {
                    exercise.forEach(function(x) {
                        VALIDATION.createExerciseObject(x);
                        self.schedule.forEach(function(y) {
                            if (y.day === day) {
                                y.dailyExercises.push(x);
                            }
                        });
                    });

                    return this;
                }
                VALIDATION.createExerciseObject(exercise);

                this.schedule.forEach(function(x) {
                    if (x.day === day) {
                        x.dailyExercises.push(exercise);
                    }
                });

                return this;
            }
            // dobre ti si bgcoder-a
        updateExercise(exercise) {
            VALIDATION.validateInstanceOfObject(exercise);
            let findName = this.exerciseDatabase.findIndex(x => x.name === exercise.name);
            if (findName === -1) {
                this.exerciseDatabase.push(exercise);
            }
            this.exerciseDatabase[findName] = exercise;

            return this;
        }

        getAllExercise() {
            return this.exerciseDatabase
                .slice()
                .sort(function(a, b) {
                    let temp = b.personalRating - a.personalRating;
                    if (temp === 0) {
                        return b.improvementStats['performanceGain'] - a.improvementStats['performanceGain']
                    }
                    return temp;
                });
        }

        searchExercise(object) {
            // da qsno 
            VALIDATION.searchExercicePropValidation(object);
            let self = this;

            return this.exerciseDatabase
                .filter(function(x) {
                    return (!object.hasOwnProperty('trainingPartner') || object.trainingPartner === x.trainingPartner) &&
                        (!object.hasOwnProperty('rest') || object.rest === x.rest) &&
                        (!object.hasOwnProperty('caloriesBurn') || object.caloriesBurn === x.improvementStats.caloriesBurn) &&
                        (!object.hasOwnProperty('primaryMuscleGroup') || object.primaryMuscleGroup === x.primaryMuscleGroup) &&
                        (!object.hasOwnProperty('difficulty') || object.difficulty === x.difficulty);
                });

        }

        listExercise(count, property) {
            try {
                VALIDATION.validateIntegerNumber(count);
            } catch (e) {
                count = 10;
            } // a _improvementStats

            VALIDATION.valiteListProperty(property); // 

            let checkProp = this.exerciseDatabase.some(x => x.hasOwnProperty('difficulty') || x.hasOwnProperty('type'));
            if (checkProp) {

                return this.exerciseDatabase
                    .slice()
                    .sort(function(a, b) {
                        if (a[property] > b[property]) {
                            return 1;
                        }

                        if (a[property] < b[property]) {
                            return -1;
                        }
                        return 0;
                    }) // da
                    .slice(0, count);
            }
            if (property === 'description' || property === 'trainingPartner' || property === 'primaryMuscleGroup' || property === 'secondaryMuscleGroup') {

                return this.exerciseDatabase
                    .slice()
                    .sort(function(a, b) {
                        if (a[property] > b[property]) {
                            return 1;
                        }

                        if (a[property] < b[property]) {
                            return -1;
                        }
                        return 0;
                    }) // da
                    .slice(0, count);
            }

            if (property === 'caloriesBurn' || property === 'performanceGain') {
                return this.exerciseDatabase
                    .slice()
                    .sort((a, b) => a.improvementStats[property] - b.improvementStats[property]) //damn
                    .slice(0, count);
            }
            return this.exerciseDatabase
                .slice()
                .sort((a, b) => a[property] - b[property])
                .slice(0, count);
        }


    }



    return {
        createTrainingPlanner(personalData) {
            return new TrainingPlanner(personalData);
        }
    };
}

// Submit the code above this line in bgcoder.com
module.exports = solve;

let trainingPlanner = solve();

// let exercise = trainingPlanner.createExercise('Dory', 'description', 30, 'Kalinchetoy1', 10, { caloriesBurn: 400, performanceGain: 1 });

let poledance = {
    name: 'Dory',
    description: 'mega qkiq sport',
    rest: 10,
    trainingPartner: 'Tedi',
    personalRating: 9,
    improvementStats: { caloriesBurn: 700, performanceGain: 1 },
    difficulty: 'dorylevel',
    type: 'strength'
};

let gym = {
    name: 'Pesho',
    description: 'train like a beast!',
    rest: 60,
    trainingPartner: 'Gosho',
    personalRating: 9,
    improvementStats: { caloriesBurn: 400, performanceGain: 1 },
    numberOfSets: 3,
    primaryMuscleGroup: 'chest',
    secondaryMuscleGroup: 'back',
    bestWeight: 40
}


let arr = [poledance, gym, poledance, gym, gym];
let data = { weight: 40, fatPercentage: 14, endurance: 10, strength: 50 };
let planner = trainingPlanner.createTrainingPlanner(data);
// planner.addExerciseToDatabase(arr);
planner.addExercisetoSchedule('monday', arr);
planner.addExerciseToDatabase(gym);
planner.addExerciseToDatabase(poledance)
console.log(planner.listExercise('difficulty'));
// console.log(planner.addExerciseToDatabase(gym));

// let gym = trainingPlanner.createGymExercise('Doroteya', 'description', 30, 'Pesho', 5, { caloriesBurn: 200, performanceGain: 5 }, 9, 'Gluteus max', 'Quadriceps max', 99);
// let poleDancing = trainingPlanner.createPoleDancing('Dory', 'mega qkiq sport', 5, 'Tedi', 9, { caloriesBurn: 300, performanceGain: 10 }, 'dorylevel', 'strength');
// console.log(poleDancing.update(updateExercise));
// console.log(exercise.update(updateExercise));