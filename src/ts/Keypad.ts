export function OXKeyPad(checkAnswer: (answer: boolean) => void) {
    const keyPad = document.createElement("div");
    const oButton = document.createElement("button");
    const xButton = document.createElement("button");

    oButton.innerText = "O";
    xButton.innerText = "X";

    keyPad.append(oButton);
    keyPad.append(xButton);

    oButton.addEventListener("click", () => {
        checkAnswer(true);
    });
    xButton.addEventListener("click", () => {
        checkAnswer(false);
    });

    keyPad.classList.add("keypad", "keypad--ox");

    return keyPad;
}

export function NumberKeyPad(checkAnswer: (answer: number) => void) {
    const keyPad = document.createElement("form");
    const input = document.createElement("input");
    const wrapper = document.createElement("div");
    const buttons = [
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
    ];
    const touchable = "ontouchstart" in window;

    input.readOnly = touchable;
    input.autofocus = !touchable;
    input.type = "number";
    input.classList.add("keypad__input");

    buttons.forEach((button, i) => {
        if (i <= 8) {
            button.innerText = `${i + 1}`;
            button.addEventListener("click", () => {
                input.value += `${i + 1}`;
            });
        } else if (i === 9) {
            button.innerText = "del";
            button.addEventListener("click", () => {
                input.value = input.value.substr(0, input.value.length - 1);
            });
        } else if (i === 10) {
            button.innerText = "0";
            button.addEventListener("click", () => {
                input.value += "0";
            });
        } else {
            button.innerText = "OK";
        }

        button.classList.add("keypad__key");
        button.type = `${i !== 11 ? "button" : "submit"}`;

        wrapper.append(button);
    });

    keyPad.addEventListener("submit", (e) => {
        e.preventDefault();
        checkAnswer(+input.value);
        input.value = "";
    });

    wrapper.classList.add("keypad__keys");
    keyPad.classList.add("keypad", "keypad--numbers");

    keyPad.append(input, wrapper);

    return keyPad;
}
