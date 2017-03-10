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
            if (value >= max || value <= 0) {
                throw new Error('Invalid Rest Time! Nobody can rest for more 2 minutes!');
            }
        },
        validatePersonalRating: function(value, max) {
            this.validateIntegerNumber(value);
            if (value > max || value < 0) {
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
                this.validatePersonalRating(obj.personalRating, 10);
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
            if (object.hasOwnProperty('numberOfSets') || object.hasOwnProperty('primaryMuscleGroup') || object.hasOwnProperty('secondaryMuscleGroup ') || object.hasOwnProperty('bestWeight') || object.hasOwnProperty('_numberOfSets') || object.hasOwnProperty('_primaryMuscleGroup') || object.hasOwnProperty('_secondaryMuscleGroup ') || object.hasOwnProperty('_bestWeight')) {
                try {
                    this.validateNameLengthInclusive(object.name, 1, 30);
                    this.validateDescription(object.description, 160);
                    this.validateRestToTwoMinutes(object.rest, 120);
                    this.isString(object.trainingPartner);
                    this.isLatinLetters(object.trainingPartner);
                    this.validatePersonalRating(object.personalRating, 10);
                    this.validateImprovementsStats(object.improvementStats);
                    this.valiidateNumberOfSets(object.numberOfSets, 10);
                    this.validateMuscleGroup(object.primaryMuscleGroup, 50);
                    this.validateMuscleGroup(object.secondaryMuscleGroup, 75);
                    this.bestWeightValidation(object.bestWeight, 100);
                } catch (e) {
                    throw new Error('Invalid object for create exercise!')
                }
            } else if (object.hasOwnProperty('difficulty ') || object.hasOwnProperty('type') || object.hasOwnProperty('_difficulty ') || object.hasOwnProperty('_type')) {
                try {
                    this.validateNameLengthInclusive(object.name, 1, 30);
                    this.validateDescription(object.description, 160);
                    this.validateRestToTwoMinutes(object.rest, 120);
                    this.isString(object.trainingPartner);
                    this.isLatinLetters(object.trainingPartner);
                    this.validatePersonalRating(object.personalRating, 10);
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
            if (day !== 'monday' && day !== 'tuesday' && day !== 'wednesday' && day !== 'thursday' && day !== 'friday' && day !== 'saturday' && day !== 'sunday') {
                throw new Error('Invalid day of the week!');
            }
        },
        validateInstanceOfObject: function(value) {
            // if (typeof value === 'object') {
            if (value instanceof PoleDancing === false && value instanceof GymExercise === false) {
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

            if (prop !== 'description' && prop !== 'rest' && prop !== 'trainingPartner' && prop !== 'personalRating' && prop !== 'caloriesBurn' && prop !== 'performanceGain' && prop !== 'numberOfSets' && prop !== 'primaryMuscleGroup' && prop !== 'secondaryMuscleGroup' && prop !== 'bestWeight' &&
                prop !== 'difficulty' && prop !== 'type') {
                throw new Error('Invalid List property!');
            }
        },
        getProgramValidation: function(obj, prop) {
            this.valiteListProperty(prop);

            if (prop === 'description' || prop === 'rest' || prop === 'trainingPartner' || prop === 'personalRating' || prop === 'performanceGain' || prop === 'caloriesBurn' || prop === 'numberOfSets' || prop === 'primaryMuscleGroup' || prop === 'secondaryMuscleGroup' || prop === 'bestWeight' ||
                prop === 'difficulty' || prop === 'type') {

                if (prop === 'description') {
                    this.validateDescription(obj[prop], 160);
                }

                if (prop === 'rest') {
                    this.validateRestToTwoMinutes(obj[prop], 120);
                }

                if (prop === 'trainingPartner') {
                    this.isString(obj[prop]);
                    this.isLatinLetters(obj[prop]);
                }

                if (prop === 'personalRating') {
                    this.validatePersonalRating(obj[prop], 10);
                }

                if (prop === 'caloriesBurn' || prop === 'performanceGain') {
                    if (prop < 0) {
                        throw new Error('Must be positive Integer!');
                    }
                }
                if (prop === 'numberOfSets') {
                    this.valiidateNumberOfSets(obj[prop], 10);
                }

                if (prop === 'primaryMuscleGroup') {
                    this.validateMuscleGroup(obj[prop], 50);
                }
                if (prop === 'secondaryMuscleGroup') {
                    this.validateMuscleGroup(obj[prop], 75);

                }

                if (prop === 'bestWeight') {
                    this.bestWeightValidation(obj[prop], 100);
                }

                if (prop === 'difficulty') {
                    this.difficultyPoledancing(obj[prop]);
                }


                if (prop === 'type') {
                    this.typePoleDancing(obj[prop]);
                }
            } else {
                throw new Error('Invalid exercise property!');
            }
        },
        validatePropCombination: function(query) {
            if ((query.hasOwnProperty('numberOfSets') || query.hasOwnProperty('primaryMuscleGroup') || query.hasOwnProperty('secondaryMuscleGroup') || query.hasOwnProperty('bestWeight')) && (query.hasOwnProperty('difficulty') || query.hasOwnProperty('type'))) {
                throw new Error('Invalid property combination');
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
            VALIDATION.validatePersonalRating(value, 10);
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

            if (object.hasOwnProperty('trainingPartner') && object.trainingPartner !== this.trainingPartner) {
                throw new Error('training partner can not change!');
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

        getAllExercises() {
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

        searchExercises(object) {
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

        listExercises(count, property) {
            try {
                VALIDATION.validateIntegerNumber(count);
            } catch (e) {
                count = 10;
            }

            VALIDATION.valiteListProperty(property); //

            let checkProp = this.exerciseDatabase.some(x => x.hasOwnProperty('difficulty') || x.hasOwnProperty('type'));
            if (property === 'difficulty' || property === 'type') {

                return this.exerciseDatabase
                    .filter(function(item) { return item.hasOwnProperty(property) })
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
                    .filter(item => item.hasOwnProperty(property))
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
                let sum = this.exerciseDatabase
                    .slice()
                    .sort((a, b) => a.improvementStats[property] - b.improvementStats[property]) //damn
                    .slice(0, count);

                return sum;
            }
            return this.exerciseDatabase
                .slice()
                .sort((a, b) => a[property] - b[property])
                .slice(0, count);
        }

        getProgram(query) {
            if (typeof query === 'object') {
                let getKeys = Object.keys(query);
                getKeys.forEach(x => VALIDATION.getProgramValidation(query, x));
                VALIDATION.validatePropCombination(query);

                let result = [];
                this.schedule.forEach(function(x) {
                    let dayOfWeek = x.dailyExercises.some(function(exercise) {
                        return getKeys.every(function(prop) {
                            if (prop === 'caloriesBurn' || prop === 'performanceGain') {
                                return query[prop] === exercise.improvementStats[prop];
                            }

                            return query[prop] === exercise[`_${prop}`];
                        });
                    })

                    if (dayOfWeek) {
                        result.push(x.day);
                    }
                });

                return result.filter((day, index, array) => day !== array[index - 1]);


            }
            VALIDATION.dayOfWeekValidate(query);
            return this.schedule
                .find(x => x.day === query)
                .dailyExercises;

        }

        getWeeklySchedule() {
            let sort = this.schedule
                .slice()
                .sort(function(a, b) {
                    let arrayA = a.dailyExercises;
                    let arrayB = b.dailyExercises;


                    let sumA = arrayA.reduce(function(prev, cur) {
                        let sum = prev + cur.personalRating;
                        return sum;
                    }, 0);

                    let sumB = arrayB.reduce(function(prev, cur) {
                        let sum = prev + cur.personalRating;
                        return sum;
                    }, 0);
                    let sortItem = sumA - sumB;

                    return sortItem;

                });

            return sort;
        }

        train(day) {
            VALIDATION.dayOfWeekValidate(day);

            let getDay = this.schedule.find(x => x.day === day);
            let totalCaloriesBurn = 0;
            let totalPerformanceGain = 0;
            getDay.dailyExercises.forEach(function(exercice) {
                totalCaloriesBurn += exercice.improvementStats.caloriesBurn;
                totalPerformanceGain += exercice.improvementStats.performanceGain;
            });

            this.personalData.weight = this.personalData.weight - (this.personalData.weight / totalCaloriesBurn);
            this.personalData.fatPercentage = this.personalData.fatPercentage - (this.personalData.fatPercentage / totalCaloriesBurn);
            this.personalData.endurance = this.personalData.endurance + (totalPerformanceGain / 100);
            this.personalData.strength = this.personalData.strength + (totalPerformanceGain / 100);

            return this.personalData;

        }
        trainWeeks(count) {
            VALIDATION.validateIntegerNumber(count);
            if (count < 0) {
                throw new Error('Invalid days count!');
            }
            let totalCaloriesBurn = 0;
            let totalPerformanceGain = 0;
            this.schedule.forEach(function(day) {
                day.dailyExercises.forEach(function(exercice) {
                    totalCaloriesBurn += exercice.improvementStats.caloriesBurn;
                    totalPerformanceGain += exercice.improvementStats.performanceGain;
                })
            });

            let newPersonalData = this.personalData;

            newPersonalData.weight = newPersonalData.weight - (newPersonalData.weight / totalCaloriesBurn);
            newPersonalData.fatPercentage = newPersonalData.fatPercentage - (newPersonalData.fatPercentage / totalCaloriesBurn);
            newPersonalData.endurance = newPersonalData.endurance + (totalPerformanceGain / 100);
            newPersonalData.strength = newPersonalData.strength + (totalPerformanceGain / 50);

            return newPersonalData;

        }

    }
    return {
        createTrainingPlanner(personalData) {
            return new TrainingPlanner(personalData);
        }
    }
}


// Submit the code above this line in bgcoder.com
module.exports = solve;

let result = solve();
const validTrainingPlannerObject = { weight: 20, fatPercentage: 10, endurance: 30, strength: 40 };
const validGym = { name: 'Valid Name Gym', description: 'Valid Description', rest: 60, trainingPartner: 'Gosho', personalRating: 5, improvementStats: { caloriesBurn: 50, performanceGain: 80 }, numberOfSets: 5, primaryMuscleGroup: 'Chest', secondaryMuscleGroup: 'Triceps', bestWeight: 75 };
const validPoleDance = { name: 'Valid Name Pole Dance', description: 'Valid Description', rest: 60, trainingPartner: 'Gosho', personalRating: 5, improvementStats: { caloriesBurn: 50, performanceGain: 50 }, difficulty: 'dorylevel', type: 'dance' };
const myTrainingPlanner = result.createTrainingPlanner(validTrainingPlannerObject);
const newGymExercise = myTrainingPlanner.createExercise({ name: 'Valid Name Gym', description: 'Valid Description', rest: 20, trainingPartner: 'Gosho', personalRating: 5, improvementStats: { caloriesBurn: 50, performanceGain: 50 }, numberOfSets: 5, primaryMuscleGroup: 'Chest', secondaryMuscleGroup: 'Triceps', bestWeight: 75 });
const validGymTwo = { name: 'Valid Name Gym New', description: 'Valid Description', rest: 10, trainingPartner: 'dory', personalRating: 5, improvementStats: { caloriesBurn: 5, performanceGain: 80 }, numberOfSets: 5, primaryMuscleGroup: 'Chest', secondaryMuscleGroup: 'Triceps', bestWeight: 75 };
const validPoleDanceTwo = { name: 'Valid Name Pole Dance New', description: 'Valid Description', rest: 20, trainingPartner: 'dory', personalRating: 5, improvementStats: { caloriesBurn: 6, performanceGain: 50 }, difficulty: 'easy', type: 'dance' };

// const gymExercise = myTrainingPlanner.createExercise(validGym);

// myTrainingPlanner.addExercisetoSchedule('monday', [gymExercise, gymExercise]);

// let product = myTrainingPlanner.train('monday');


// console.log(product);
// console.log(product.weight); //(19.404);
// console.log(product.fatPercentage); //(9.702);
// console.log(product.endurance); //(32.4);
// console.log(product.strength); //(42.4);


// const gymExercise = myTrainingPlanner.createExercise(validGym);

// myTrainingPlanner.addExercisetoSchedule('monday', gymExercise);
// myTrainingPlanner.addExercisetoSchedule('tuesday', [gymExercise, gymExercise]);
// myTrainingPlanner.addExercisetoSchedule('wednesday', [gymExercise, gymExercise, gymExercise]);
// myTrainingPlanner.addExercisetoSchedule('thursday', [gymExercise, gymExercise]);
// myTrainingPlanner.addExercisetoSchedule('friday', [gymExercise, gymExercise, gymExercise]);
// myTrainingPlanner.addExercisetoSchedule('saturday', [gymExercise]);
// myTrainingPlanner.addExercisetoSchedule('sunday', [gymExercise, gymExercise]);

// let product = myTrainingPlanner.trainWeeks(undefined);

// console.log(product); //exist;
// console.log(product.weight); //(16.405398104565627);
// console.log(product.fatPercentage); //(8.202699052282814);
// console.log(product.endurance); //(54.79999999999999);
// console.log(product.strength); //(64.79999999999998);


// // let exercise = trainingPlanner.createExercise('Dory', 'description', 30, 'Kalinchetoy1', 10, { caloriesBurn: 400, performanceGain: 1 });

// let poledance = {
//     name: 'Dory',
//     description: 'mega qkiq sport',
//     rest: 10,
//     trainingPartner: 'Tedi',
//     personalRating: 9,
//     improvementStats: { caloriesBurn: 700, performanceGain: 19 },
//     difficulty: 'dorylevel',
//     type: 'strength'
// };

// let gym = {
//     name: 'Pesho',
//     description: 'train like a beast!',
//     rest: 60,
//     trainingPartner: 'Gosho',
//     personalRating: 9,
//     improvementStats: { caloriesBurn: 400, performanceGain: 17 },
//     numberOfSets: 3,
//     primaryMuscleGroup: 'chest',
//     secondaryMuscleGroup: 'back',
//     bestWeight: 40
// }

// let poledance2 = {
//     name: 'Dory',
//     description: 'mega qkiq sport',
//     rest: 10,
//     trainingPartner: 'Tedi',
//     personalRating: 96,
//     improvementStats: { caloriesBurn: 700, performanceGain: 11 },
//     difficulty: 'dorylevel',
//     type: 'strength'
// };

// let gym2 = {
//     name: 'PeshoTwo',
//     description: 'train like a beast!',
//     rest: 60,
//     trainingPartner: 'Gosho',
//     personalRating: 69,
//     improvementStats: { caloriesBurn: 400, performanceGain: 45 },
//     numberOfSets: 3,
//     primaryMuscleGroup: 'chest',
//     secondaryMuscleGroup: 'back',
//     bestWeight: 40
// }



// let arr = [poledance, gym, poledance, gym, gym];

// let arr2 = [{
//         name: 'DoryTwo',
//         description: 'mega qkiq sport',
//         rest: 10,
//         trainingPartner: 'Tedi',
//         personalRating: 11,
//         improvementStats: { caloriesBurn: 700, performanceGain: 1 },
//         difficulty: 'dorylevel',
//         type: 'strength'
//     },
//     {
//         name: 'Pesho',
//         description: 'train like a beast!',
//         rest: 60,
//         trainingPartner: 'Gosho',
//         personalRating: 10,
//         improvementStats: { caloriesBurn: 400, performanceGain: 1 },
//         numberOfSets: 3,
//         primaryMuscleGroup: 'chest',
//         secondaryMuscleGroup: 'back',
//         bestWeight: 40
//     },
//     {
//         name: 'DoryTwo',
//         description: 'mega qkiq sport',
//         rest: 10,
//         trainingPartner: 'Tedi',
//         personalRating: 9,
//         improvementStats: { caloriesBurn: 700, performanceGain: 1 },
//         difficulty: 'dorylevel',
//         type: 'strength'
//     },
//     {
//         name: 'Peshotwo',
//         description: 'train like a beast!',
//         rest: 60,
//         trainingPartner: 'Gosho',
//         personalRating: 8,
//         improvementStats: { caloriesBurn: 400, performanceGain: 1 },
//         numberOfSets: 3,
//         primaryMuscleGroup: 'chest',
//         secondaryMuscleGroup: 'back',
//         bestWeight: 40
//     },
//     {
//         name: 'PeshoTwo',
//         description: 'train like a beast!',
//         rest: 60,
//         trainingPartner: 'Gosho',
//         personalRating: 7,
//         improvementStats: { caloriesBurn: 400, performanceGain: 1 },
//         numberOfSets: 3,
//         primaryMuscleGroup: 'chest',
//         secondaryMuscleGroup: 'back',
//         bestWeight: 40
//     }
// ];

// let arr3 = [{
//         name: 'Dory',
//         description: 'mega qkiq sport',
//         rest: 10,
//         trainingPartner: 'Tedi',
//         personalRating: 21,
//         improvementStats: { caloriesBurn: 700, performanceGain: 1 },
//         difficulty: 'dorylevel',
//         type: 'strength'
//     },
//     {
//         name: 'PeshoTwo',
//         description: 'train like a beast!',
//         rest: 60,
//         trainingPartner: 'Gosho',
//         personalRating: 99,
//         improvementStats: { caloriesBurn: 400, performanceGain: 1 },
//         numberOfSets: 3,
//         primaryMuscleGroup: 'chest',
//         secondaryMuscleGroup: 'back',
//         bestWeight: 40
//     },
//     {
//         name: 'DoryThree',
//         description: 'mega qkiq sport',
//         rest: 10,
//         trainingPartner: 'Tedi',
//         personalRating: 15,
//         improvementStats: { caloriesBurn: 700, performanceGain: 1 },
//         difficulty: 'dorylevel',
//         type: 'strength'
//     },
//     {
//         name: 'PeshoThree',
//         description: 'train like a beast!',
//         rest: 60,
//         trainingPartner: 'Gosho',
//         personalRating: 14,
//         improvementStats: { caloriesBurn: 400, performanceGain: 1 },
//         numberOfSets: 3,
//         primaryMuscleGroup: 'chest',
//         secondaryMuscleGroup: 'back',
//         bestWeight: 40
//     },
//     {
//         name: 'PeshoThree',
//         description: 'train like a beast!',
//         rest: 60,
//         trainingPartner: 'Gosho',
//         personalRating: 13,
//         improvementStats: { caloriesBurn: 400, performanceGain: 1 },
//         numberOfSets: 3,
//         primaryMuscleGroup: 'chest',
//         secondaryMuscleGroup: 'back',
//         bestWeight: 40
//     }
// ];
// // let arr2 = [poledance2, gym2];
// let data = { weight: 40, fatPercentage: 14, endurance: 10, strength: 50 };
// let planner = trainingPlanner.createTrainingPlanner(data);
// // planner.addExerciseToDatabase(arr);
// planner.addExercisetoSchedule('monday', arr);
// planner.addExercisetoSchedule('thursday', arr2);
// planner.addExercisetoSchedule('sunday', arr3);
// // planner.addExercisetoSchedule('sunday', arr2);
// // console.log(planner.schedule[0].dailyExercises)
// planner.addExerciseToDatabase(gym);
// planner.addExerciseToDatabase(poledance);
// // console.log(planner.listExercise(11, 'difficulty'));
// // console.log(planner.getProgram({ secondaryMuscleGroup: 'back', bestWeight: 40 }));
// // console.log(planner.schedule[0].dailyExercises);

// console.log(planner.getWeeklySchedule());
// console.log(planner.schedule[0].dailyExercises);
// console.log(planner.train('thu'));


// let gym = trainingPlanner.createGymExercise('Doroteya', 'description', 30, 'Pesho', 5, { caloriesBurn: 200, performanceGain: 5 }, 9, 'Gluteus max', 'Quadriceps max', 99);
// let poleDancing = trainingPlanner.createPoleDancing('Dory', 'mega qkiq sport', 5, 'Tedi', 9, { caloriesBurn: 300, performanceGain: 10 }, 'dorylevel', 'strength');
// console.log(poleDancing.update(updateExercise));
// console.log(exercise.update(updateExercise));