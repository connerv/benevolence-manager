
var question1 = {
    qid: 0,
    type: 'SA',
    question: 'What do you do for a living?',
    input: '', //default answer for this question type
}

var question2 = {
    qid: 200,
    type: 'LA',
    question: 'Tell us your conversion story.',
    input: '',
}

var question3 = {
    qid: 162,
    type: 'OP',
    question: "What's your favorite color?",
    options: ['red', 'blue', 'green', 'lavender', 'orange'],
    input: null,
}

var question4 = {
    qid: 5,
    type: 'DT',
    question: 'When would you like to meet?',
    input: new Date(),
}

var question5 = {
    qid: 123461,
    type: 'DA',
    question: 'What day would you like to meet?',
    input: new Date(),
}

var question6 = {
    qid: 19389,
    type: 'TI',
    question: 'What time would you like to meet?',
    input: new Date(),
}

export const questions = [question1, question2, question3, question4, question5, question6]