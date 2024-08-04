const questions = [
    {
        question: 'In what years was JavaScript created?',
        answer: ['2001', '1996', '1995', '1990'],
        correct: 3,
    },
    {
        question: 'What is language JavaScript?',
        answer: ['Interpreted', 'Mixed', 'Compiled'],
        correct: 1,
    },
    {
        question: 'What is the difference between JavaScript and Java?',
        answer: ['Java is a more powerful language that is suitable for building large and complex applications', 'It is the same language', 'Nothing'],
        correct: 1,
    },
    {
        question: 'What is year was TypeScript created?',
        answer: ['2010', '1999', '2012', '2006'],
        correct: 3,
    },
    {
        question: 'How do you like my second project? :)',
        answer: ['excellent!', 'good', 'average', 'porly'],
        correct: 1,
    },
]

let questionIndex = 0;
let score = 0;

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

clearQuestion()
showQuestion()
submitBtn.onclick = searchBtn

function clearQuestion() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}
function showQuestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
    headerContainer.innerHTML = title;

    let answerNumber = 1;
    if (questionIndex !== 1)
    for (questionText of questions[questionIndex]['answer']) {
        const listTemplate = `
            <li>
                <label>
                    <input value="%number%" type="radio" class="answer" name="answer">
                    <span>%answer%</span>
                </label>
            </li>`
        const answerHTML = listTemplate.replace('%answer%', questionText).replace('%number%', answerNumber)
        listContainer.innerHTML += answerHTML
        answerNumber++
    }
    else if (questionIndex === 1) {
        for (questionText of questions[questionIndex]['answer']) {
        const listTemplate = `
            <li>
                <label>
                    <input value="%number%" type="checkbox" class="answer" name="answer">
                    <span>%answer%</span>
                </label>
            </li>`
        const answerHTML = listTemplate.replace('%answer%', questionText).replace('%number%', answerNumber)
        listContainer.innerHTML += answerHTML
        answerNumber++
        }
    }
}
function searchBtn() {
    const checkboxBtn = document.querySelector('input[type="checkbox"]:checked')
    const activeBtn = document.querySelector('input[type="radio"]:checked')
    if (activeBtn) {
        const answerNumbActive = parseInt(activeBtn.value)
        if (answerNumbActive === questions[questionIndex]['correct']) {
            score++
        }
    } else if (checkboxBtn) {
        const checkboxNumbActive = parseInt(checkboxBtn.value)
        if (checkboxNumbActive === questions[questionIndex]['correct']) {
            score++
        }
    }


    if (questionIndex !== questions.length - 1) {
        questionIndex++
        clearQuestion()
        showQuestion()
    } else {
        clearQuestion()
        showResult()
    }
}
function showResult() {
    listContainer.remove()
    
    const resultTemplate = `
    <h4 class="result-message">Congratulations on passing the test!</h4>
    <h4 class="cool-message">%text%</h4>
    <h4 class="result-numb">Your result: %result%</h4>`

    let resultMessage;
    const result = `${score} out of ${questions.length}`
    if (score === questions.length) {
        resultMessage = resultTemplate.replace('%text%', 'Very good! Thanks :)').replace('%result%', result)
    }
    else if ((score * 100) / questions.length >= 50) {
        resultMessage = resultTemplate.replace('%text%', 'Not bad').replace('%result%', result)
    } else {
        resultMessage = resultTemplate.replace('%text%', 'You need to traning').replace('%result%', result)
    }
    headerContainer.innerHTML = resultMessage
    submitBtn.innerText = 'start again'
    submitBtn.onclick = () => history.go()
}
