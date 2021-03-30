import { app, resetApp } from "./app";

function List(list: (string | number)[], setter: Function) {
    const ul = document.createElement("ul");

    list.forEach((item) => {
        const li = document.createElement("li");

        li.innerText = `${item}`;
        li.addEventListener("click", () => {
            setter(item);
        });

        ul.append(li);
    });

    return ul;
}

export default function Difficulty() {
    let type: string | undefined;
    let count: number | undefined;
    const setType = (string: string) => {
        type = string;
        typeList.remove();
        app.append(countList);
    };
    const setCount = (number: number) => {
        count = number;
    };
    const typeList = List(
        ["숫자 비교", "덧셈", "뺄셈", "곱셈", "나눗셈"],
        setType
    );
    const countList = List([10, 20, 30, 40, 50], setCount);

    resetApp();
    app.append(typeList);
}
