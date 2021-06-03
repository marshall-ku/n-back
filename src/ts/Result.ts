import { app, resetApp } from "./app";
import Difficulty from "./Difficulty";

export default function Result(
    correctCount: number,
    count: number,
    startTime: number
) {
    const secondTook = (new Date().getTime() - startTime) / 1000;
    const containerElt = document.createElement("div");
    const title = document.createElement("h1");
    const timeTook = document.createElement("div");
    const correctRatio = document.createElement("div");
    const restartContainer = document.createElement("div");
    const restartButton = document.createElement("button");

    const createResultElt = (
        text: string,
        content: string,
        unit: string
    ): HTMLSpanElement => {
        const resultElt = document.createElement("span");
        const textElt = document.createTextNode(text);
        const contentElt = document.createElement("b");
        const unitElt = document.createTextNode(unit);

        contentElt.innerText = content;

        resultElt.append(textElt, contentElt, unitElt);

        return resultElt;
    };

    const result1 = createResultElt("오답 : ", `${count - correctCount}`, "개");
    const result2 = createResultElt("문제 : ", `${count}`, "개");
    const result3 = createResultElt(
        "문제당 : ",
        (secondTook / count).toFixed(2),
        "초"
    );

    // Title
    title.innerText = "끝났습니다!";

    // Result
    timeTook.innerText = `모든 문제를 푸는데 ${secondTook.toFixed(
        2
    )}초가 걸리셨네요.`;
    correctRatio.append(result1, result2, result3);

    // Restart Button
    restartButton.innerText = "다시 시작";
    restartButton.addEventListener("click", Difficulty);
    restartContainer.append(restartButton);

    containerElt.classList.add("result");

    containerElt.append(title, correctRatio, restartContainer);

    resetApp();
    app.append(containerElt);
}
