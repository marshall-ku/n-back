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

    div.classList.add("list");

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
        title.innerText = "난이도를 선택해주세요";
        app.append(difficultyList);
    };
    const setDifficulty = (number: number) => {
        difficulty = number;
        difficultyList.remove();
        title.innerText = "진행할 횟수를 선택해주세요";
        app.append(countList);
    };
    const setCount = (number: number) => {
        count = number;
        countList.remove();
        title.innerText = "_ - Back을 진행합니다";
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
    const title = document.createElement("h2");
    const difficultyList = List([1, 2, 3, 4, 5], setDifficulty);
    const countList = List([10, 20, 30, 40, 50], setCount);
    const nList = List([2, 3, 4, 5, 6, 7, 8], setN);

    title.innerText = "진행할 게임을 선택해주세요";
    resetApp();
    app.append(title);
    app.append(typeList);
}
