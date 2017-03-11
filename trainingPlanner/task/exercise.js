'use strict';

// let queryProperties = Object.keys(query);
// queryProperties.forEach(x => VALIDATION.validateListProperty(x));
// VALIDATION.validatePropertyCombination(query);

// let result = [];

// this.schedule.forEach(function(day) {

//     let successDay = day.dailyExercises.some(function(exercise) {

//         return queryProperties.every(function(property) {

//             if (property === 'caloriesBurn' || property === 'performanceGain') {
//                 return query[property] === exercise.improvementStats[property];
//             }

//             return query[property] === exercise[`_${property}`];

//         });

//     });

//     if (successDay) {
//         result.push(day.day);
//     }

// });

// return result.filter((day, index, array) => day !== array[index - 1]);

// class Name {
//     constructor(name) {
//         this.name = name;
//     }


//     get name() {
//             return this._name;
//         }
//         // REAL READ-ONLY PROPERTY
//     set name(newName) {
//         Object.defineProperty(this, `_name`, {
//             value: newName,
//             writable: false,
//             enumerable: false
//         });
//     }
// }


var arr = [{
        day: 'monday',
        dailyExercises: [{
                name: 'Dory',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 21,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 99,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Dory',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 49,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
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
            },
            {
                name: 'Pesho',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 69,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            }
        ]
    },
    {
        day: 'tuesday',
        dailyExercises: [{
                name: 'Dory1',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 3,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 4,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Dory1',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 9,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho1',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 2,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Pesho1',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 1,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            }
        ]
    },
    {
        day: 'wednesday',
        dailyExercises: [{
                name: 'Dory2',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 11,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 10,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Dory2',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 9,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho2',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 8,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Pesho2',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 7,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            }
        ]
    },
    {
        day: 'thursday',
        dailyExercises: [{
                name: 'Dory',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 21,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho3',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 99,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Dory3',
                description: 'mega qkiq sport',
                rest: 10,
                trainingPartner: 'Tedi',
                personalRating: 15,
                improvementStats: { caloriesBurn: 700, performanceGain: 1 },
                difficulty: 'dorylevel',
                type: 'strength'
            },
            {
                name: 'Pesho3',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 14,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            },
            {
                name: 'Pesho3',
                description: 'train like a beast!',
                rest: 60,
                trainingPartner: 'Gosho',
                personalRating: 13,
                improvementStats: { caloriesBurn: 400, performanceGain: 1 },
                numberOfSets: 3,
                primaryMuscleGroup: 'chest',
                secondaryMuscleGroup: 'back',
                bestWeight: 40
            }
        ]
    },
    { day: 'friday', dailyExercises: [] },
    { day: 'saturday', dailyExercises: [] },
    { day: 'sunday', dailyExercises: [] }
]

// let sum1 = arr.forEach(function(item) {
//     if (item.dailyExercises.length !== 0) {
//         return item.dailyExercises.reduce(function(a, b) {
//             let sum = a + b.personalRating;
//             return sum;
//         }, 0);
//     }
// })


let sort = arr.sort(function(a, b) {
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
    let sortItem = sumA + sumB;

    return sortItem;
})

console.log(sort);