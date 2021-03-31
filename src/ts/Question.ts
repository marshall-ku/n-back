function Comparison() {}

function Addition() {}

function Subtraction() {}

function Multiplication() {}

function Division() {}

export default function Question(type: questionType, count: number, n: number) {
    const questionTypeList = ["숫자 비교", "덧셈", "뺄셈", "곱셈", "나눗셈"];
    const components = [
        Comparison,
        Addition,
        Subtraction,
        Multiplication,
        Division,
    ];

    console.log(components[questionTypeList.indexOf(type)]);
}
