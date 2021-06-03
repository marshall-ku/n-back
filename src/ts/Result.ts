import { app, resetApp } from "./app";
import Difficulty from "./Difficulty";

export default function Result(
    correctCount: number,
    count: number,
    startTime: number
) {
    const now = new Date().getTime();
    const containerElt = document.createElement("div");
    const title = document.createElement("h1");
    const timeTook = document.createElement("div");
    const correctRatio = document.createElement("div");
    const text1 = document.createTextNode("오답 : ");
    const span1 = document.createElement("span");
    const unit1 = document.createTextNode("개");
    const text2 = document.createTextNode("문제 : ");
    const span2 = document.createElement("span");
    const unit2 = document.createTextNode("개");
    const text3 = document.createTextNode("문제당 : ");
    const span3 = document.createElement("span");
    const unit3 = document.createTextNode("초");
    const restartContainer = document.createElement("div");
    const restartButton = document.createElement("button");
    const secondTook = (now - startTime) / 1000;

    // Title
    title.innerText = "끝났습니다!";

    // Result
    timeTook.innerText = `모든 문제를 푸는데 ${secondTook.toFixed(
        2
    )}초가 걸리셨네요.`;
    span1.innerText = `${count - correctCount}`;
    span2.innerText = `${count}`;
    span3.innerText = (secondTook / count).toFixed(2);
    correctRatio.append(
        text1,
        span1,
        unit1,
        text2,
        span2,
        unit2,
        text3,
        span3,
        unit3
    );

    // Restart Button
    restartButton.innerText = "다시 시작";
    restartButton.addEventListener("click", Difficulty);
    restartContainer.append(restartButton);

    containerElt.append(title, correctRatio, restartContainer);

    resetApp();
    app.append(containerElt);
}
