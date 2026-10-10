
const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const expression = display.value;

    if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
        display.value = "Invalid";
        return;
    }

    try {
        const result = Function('"use strict"; return (' + expression + ')')();

        display.value = Number.isFinite(result) ? result : "Error";
    } catch {
        display.value = "Error";
    }
}
