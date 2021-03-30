export const app = <HTMLElement>document.getElementById("app");

export function resetApp() {
    while (app.firstChild) app.firstChild.remove();
}

function init() {}

init();
