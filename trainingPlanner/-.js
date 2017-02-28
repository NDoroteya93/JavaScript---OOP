'use strict';

let queryProperties = Object.keys(query);
queryProperties.forEach(x => VALIDATION.validateListProperty(x));
VALIDATION.validatePropertyCombination(query);

let result = [];

this.schedule.forEach(function(day) {

    let successDay = day.dailyExercises.some(function(exercise) {

        return queryProperties.every(function(property) {

            if (property === 'caloriesBurn' || property === 'performanceGain') {
                return query[property] === exercise.improvementStats[property];
            }

            return query[property] === exercise[`_${property}`];

        });

    });

    if (successDay) {
        result.push(day.day);
    }

});

return result.filter((day, index, array) => day !== array[index - 1]);

class Name {
    constructor(name) {
        this.name = name;
    }


    get name() {
            return this._name;
        }
        // REAL READ-ONLY PROPERTY
    set name(newName) {
        Object.defineProperty(this, `_name`, {
            value: newName,
            writable: false,
            enumerable: false
        });
    }
}