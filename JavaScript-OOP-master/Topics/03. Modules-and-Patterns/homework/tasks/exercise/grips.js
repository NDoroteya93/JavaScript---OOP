'use strict';

const cityObj = {
    name: 'Cape Town',
    population: 987007,
    website: 'capetown.gov.za',
};

const { name, population, website } = cityObj;

// Output Cape Town 987007 capetown.gov.za

// Using destructuring, only a single variable declaration is needed to define all top level variables in the city object.
console.log(name, population, website);

// destructure array in ES6

const cityArr = ['Sofia', 493058, 'sofia.bg'];

const [nameArr, populationArr, websiteArr] = cityArr;

// Output Sofia 493058 sofia.bg
console.log(nameArr, populationArr, websiteArr);

// Rename Key in object

// BAD

const city2 = {
    x: 'Sofia',
    y: 78676,
    z: 'sofia.bg',
};

const { x, y, z } = city2;
const cityAndCountry = `${x}, Bulgaria`;

// Output -->  Sofia, Bulgaria
console.log(cityAndCountry);

// renamed

const {
    x: name2,
    y: population2,
    z: website2,
} = city2;

const area = `${name2}, Bulgaria`;

console.log(area);

////////////////////////// Destructuring Deeply Nested Values //////////////////////////

const city3 = {
    name: 'Sofia',
    population: 98974,
    website: 'sofia.bg',
    weather: {
        temperature: {
            celcius: 19,
            fahrenheit: 66,
        },
        windSpeed: {
            kph: 27,
            mph: 17,
        },
        humidity: '77%',
    }
};

const { weather: { temperature } } = city3;

// Output { celcius: 19, fahrenheit: 66 }
console.log(temperature);

////////////////////////// Setting Defaults Throught Destructuring //////////////////////////

const city4 = {
    name4: 'Cape Town',
    population4: 85735,
    website4: 'capetown.gov.za',
};

const {
    name4,
    population4,
    website4 = 'No website Available',
    country = 'South Africa',
} = city4;

const cityAndCountry4 = `${name4}, ${country}`;

// Output capetown.gov.za
console.log(website4);

// Output Cape Town, South Africa
console.log(cityAndCountry4);

/////////////////////////// Destructuring within Function Parameters //////////////////////////

const cityPopulation4 = ({ name } = {}, website) => {
    console.log(`You can visit ${name}'s website at ${website}`);
};

// Output --->You can visit Cape Town's website at capetown.gov.za
cityPopulation4({ name: 'Cape Town' }, 'capetown.gov.za');


////////////////////////// Destructuring default parameters //////////////////////////

const cityPopulation5 = ({ name = 'Unknown', population = 0 } = {}) => {
    console.log(`The city of ${name} has a population of ${population} people.`);
};

// Output ===> The city of Cape Town has a population of 97978 people.
cityPopulation5({ name: 'Cape Town', population: 97978 });

// Output ====> The city of Unknown has a population of 0 people.
cityPopulation5();

////////////////////////// Type Error //////////////////////////

// const cityPopulation = ({ name = 'Unknown', population = 0 }) => {
//     console.log(`The city of ${name} has a population of ${population} people.`);
// };

// cityPopulation({ name: 'Cape Town', population: 987007 });
// Output: "The city of Cape Town has a population of 987007 people."

// cityPopulation()
// -> Uncaught TypeError: Cannot match against 'undefined' or 'null'.