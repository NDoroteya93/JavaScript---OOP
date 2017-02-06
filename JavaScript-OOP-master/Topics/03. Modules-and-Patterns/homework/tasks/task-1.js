/* Task Description */
/*
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */
'use strict';

function solve() {

    let Course = {
        init: function(title, presentations) {
            let self = this, // get other function in object
                presentation,
                homeworkID = 0;
            if (!presentations || !title) {
                throw new Error('Missing presentation!');
            }

            // Check if title is empty
            if (!title || 0 === title.length) {
                throw new Error('Missing title!');
            }

            // Check if title is not a string
            if (typeof title !== 'string') {
                throw new Error('Invalid title');
            }

            // Check for white space start-end
            if (/(^[\s]+|[\s]+$)/.test(title) || /^\s/.test(title) || /\s$/.test(title)) {
                throw new Error();
            }
            // Check for consecutive spaces
            if (/\s\s+/.test(title)) {
                throw new Error();
            }

            // Check if element is less than 1
            if (title.length < 1) {
                throw new Error();
            }

            if (presentations === '' || presentations === null || presentations.length === 0) {
                throw new Error();
            }

            self.title = title;

            self.students = [];
            self.allPresentation = [];

            presentations.forEach(function(title) {
                homeworkID = self.allPresentation.length + 1;
                if (!title || 0 === title.length) {
                    throw new Error();
                } else if (/\s\s+/.test(title)) {
                    throw new Error();
                } else {

                    presentation = {
                        title: title,
                        id: homeworkID
                    };
                    self.allPresentation.push(presentation);
                }
            });

            return this;

        },
        addStudent: function(name) {
            let student = {},
                fullName = name.split(' '),
                firstname = fullName[0],
                lastname = fullName[1],
                self = this,
                studentID = self.students.length + 1;

            if (!(/[A-Z][a-z]{0,19}(\s|,)[A-Z][a-z]{0,19}/.test(name))) {
                throw new Error();
            }
            if (typeof name !== 'string') {
                throw new Error();
            }

            if (fullName.length > 2) {
                throw new Error();
            }

            student = {
                firstname: firstname,
                lastname: lastname,
                score: 0,
                finalScore: 0,
                id: studentID
            }

            self.students.push(student);

            return studentID;

        },
        getAllStudents: function() {
            return this.students;
        },
        submitHomework: function(studentID, homeworkID) {
            let isValidStudentId = false,
                isValidHomeworkId = false,
                self = this;
            for (let i = 0; i < self.allPresentation.length; i += 1) {
                if (this.allPresentation[i].id === homeworkID) {
                    isValidHomeworkId = true;
                    break;
                }
            }
            for (let i = 0; i < self.students.length; i += 1) {
                if (this.students[i].id === studentID) {
                    if (this.students[i].homework === 'undefined') {
                        this.students[i].homework = 1;
                    } else {
                        this.students[i].homework = 1;
                    }
                    isValidStudentId = true;

                    break;
                }
            }
            if (!isValidStudentId) {
                throw new Error();
            }
            if (!isValidHomeworkId) {
                throw new Error();
            }
            if (studentID === '' || homeworkID === '') {
                throw new Error();
            }

            if (typeof studentID !== 'number' || typeof homeworkID !== 'number') {
                throw new Error();
            }


        },
        pushExamResults: function(results) {
            let isValidStudentId = false;

            // Check if result is empty
            if (results.length === 0) {
                throw new Error();
            }

            // check if studentId is duplicate
            let valueArr = results.map(function(item) { return item.StudentID });
            let isDuplicate = valueArr.some(function(item, idx) {
                return valueArr.indexOf(item) != idx
            });

            if (isDuplicate) {
                throw new Error();
            }
            if (results === '' || results === 'undefined') {
                throw new Error();
            }

            // check if Id is valid
            for (let i = 0; i < results.length; i += 1) {
                if (results[i].score === 'undefined') {
                    throw new Error();
                }
                if (typeof results[i].score !== 'number') {
                    throw new Error();
                }

                if (typeof results[i].StudentID !== 'number') {
                    throw new Error();
                }
                for (let j = 0; j < this.students.length; j += 1) {
                    if (this.students[j].id === results[i].StudentID) {
                        this.students[j].score = results[i].score;
                        isValidStudentId = true;
                    }
                }
                if (!isValidStudentId) {
                    throw new Error();
                } else {
                    isValidStudentId = false;
                }
            }
        },
        getTopStudents: function() {
            function finalScore(score, allHomeworks) {
                let submittedHomework = allHomeworks / this.presentations.length;
                let result = score * 3 + submittedHomework;
                return result;
            }

            for (let i = 0; this.students.length; i += 1) {
                this.students[i].finalScore = finalScore(this.students[i].score, this.students[i].homework.length);
            }

            this.students.sort(function(a, b) { return (a.finalScore > b.finalScore) ? 1 : ((b.finalScore > a.finalScore) ? -1 : 0); });
            if (this.students.length < 10) {
                return this.students;
            } else {
                return this.students.slice(0, 10)
            }

        }

    };

    return Course;
}


module.exports = solve;