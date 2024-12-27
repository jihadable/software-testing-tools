function example(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

function highComplexity(a, b, c) {
    if (a > b) {
        if (b > c) {
            return a + b + c;
        } else if (a > c) {
            return a * b * c;
        } else {
            return a - b - c;
        }
    } else if (b > c) {
        if (a > c) {
            return a / b / c;
        } else {
            return a + b - c;
        }
    } else {
        return a * b - c;
    }
}

function lowComplexity() {
    console.log("Line 1");
    console.log("Line 2");
    console.log("Line 3");
    console.log("Line 4");
    console.log("Line 5");
    console.log("Line 6");
    console.log("Line 7");
    console.log("Line 8");
    console.log("Line 9");
    console.log("Line 10");
    console.log("Line 11");
    console.log("Line 12");
    console.log("Line 13");
    console.log("Line 14");
    console.log("Line 15");
    console.log("Line 16");
    console.log("Line 17");
    console.log("Line 18");
    console.log("Line 19");
    console.log("Line 20");
}
