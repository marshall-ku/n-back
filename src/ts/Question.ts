import { app, resetApp } from "./app";
import { OXKeyPad, NumberKeyPad } from "./Keypad";
import Result from "./Result";

function randomNumber(max: number) {
    return Math.round(Math.random() * (max - 1)) + 1;
}

function comparison(difficulty: number) {
    return [Math.round(Math.random() * (difficulty * 9) + 1)];
}

function addition(difficulty: number) {
    const rand = () => randomNumber(Math.pow(10, difficulty));
    const first = rand();
    const second = rand();

    return [first, second, first + second];
}

function subtraction(difficulty: number) {
    const rand = () => randomNumber(Math.pow(10, difficulty));
    let randNumbers = [rand(), rand()];

    if (randNumbers[0] < randNumbers[1]) {
        randNumbers = [randNumbers[1], randNumbers[0]];
    }

    randNumbers.push(randNumbers[0] - randNumbers[1]);

    return randNumbers;
}

function multiplication(difficulty: number) {
    const rand = () => randomNumber(difficulty * 10);
    const first = rand();
    const second = rand();

    return [first, second, first * second];
}

function division(difficulty: number) {
    const rand = () => randomNumber(difficulty * 10);
    const first = rand();
    const second = rand();

    return [first * second, first, second];
}

export default function Question(
    type: questionType,
    difficulty: number,
    count: number,
    n: number
) {
    const questionTypeList = ["숫자 비교", "덧셈", "뺄셈", "곱셈", "나눗셈"];
    const typeIndex = questionTypeList.indexOf(type);
    const numGenerator = [
        comparison,
        addition,
        subtraction,
        multiplication,
        division,
    ][typeIndex];
    const symbol = ["", "+", "-", "×", "÷"][typeIndex];
    const colors = ["blue", "red", "green"];

    let startTime: number;

    const checkSame = (answer: boolean) => {
        const correction = answer === (answers[index - n] === answers[index]);

        if (correction) {
            correctCount += 1;
        }

        if (++index === count + n) {
            Result(correctCount, count, startTime);
        } else {
            displayQuestion();
        }
    };
    const checkAnswer = (answer: number) => {
        const correction = answer === answers[index - n];

        if (correction) {
            correctCount += 1;
        }

        if (++index === count + n) {
            Result(correctCount, count, startTime);
        } else {
            displayQuestion();
        }
    };

    const containerElt = document.createElement("div");
    const displayElt = document.createElement("div");
    const keypadElt =
        typeIndex === 0 ? OXKeyPad(checkSame) : NumberKeyPad(checkAnswer);

    const answers: number[] = [];
    let correctCount = 0;
    let index = 0;

    const initializeQuestion = () => {
        let j = 0;
        displayQuestion();
        const preStart = setInterval(() => {
            index += 1;

            displayQuestion();
            if (++j === n) {
                clearInterval(preStart);
                containerElt.classList.add("initialized");
                keypadElt.querySelector("input")?.focus();
                startTime = new Date().getTime();
            }
        }, 3000);
    };
    const displayQuestion = () => {
        const numbers = numGenerator(difficulty);

        // Append Answer
        if (numbers.length === 1) {
            answers.push(numbers[0]);
        } else {
            answers.push(numbers[2]);
        }

        // Display Question
        displayString(numbers);
    };
    const displayString = (arr: number[]) => {
        const isComparison = arr.length === 1;

        displayElt.style.color = colors[index % 3];
        if (!isComparison && index >= count) {
            return (displayElt.innerText = "");
        }
        displayElt.innerText = `${
            isComparison ? arr[0] : `${arr[0]}${symbol}${arr[1]}`
        }`;
    };

    resetApp();

    containerElt.classList.add("question");
    displayElt.classList.add("question__display");

    containerElt.append(displayElt);
    containerElt.append(keypadElt);
    app.append(containerElt);

    initializeQuestion();
}
