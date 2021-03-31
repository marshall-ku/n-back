import { app, resetApp } from "./app";
import Question from "./Question";

function List(list: (string | number)[], setter: Function) {
    const div = document.createElement("div");

    list.forEach((item) => {
        const button = document.createElement("button");

        button.innerText = `${item}`;
        button.addEventListener("click", () => {
            setter(item);
        });

        div.append(button);
    });

    return div;
}

export default function Difficulty() {
    let type: string | undefined;
    let difficulty: number | undefined;
    let count: number | undefined;
    let n: number | undefined;
    const setType = (string: string) => {
        type = string;
        typeList.remove();
        app.append(difficultyList);
    };
    const setDifficulty = (number: number) => {
        difficulty = number;
        difficultyList.remove();
        app.append(countList);
    };
    const setCount = (number: number) => {
        count = number;
        countList.remove();
        app.append(nList);
    };
    const setN = (number: number) => {
        n = number;
        Question(
            type as questionType,
            difficulty as number,
            count as number,
            n
        );
    };
    const typeList = List(
        ["숫자 비교", "덧셈", "뺄셈", "곱셈", "나눗셈"],
        setType
    );
    const difficultyList = List([1, 2, 3, 4, 5], setDifficulty);
    const countList = List([10, 20, 30, 40, 50], setCount);
    const nList = List([2, 3, 4, 5, 6, 7, 8], setN);

    resetApp();
    app.append(typeList);
}
