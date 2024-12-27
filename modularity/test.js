import moduleD from './moduleD';
import moduleE from './moduleE';

export function myFunction() {
    moduleD();
    moduleE();
}

function moduleA() {
    console.log("A");
}

function moduleB() {
    moduleA();
}

function moduleC() {
    moduleA();
    moduleB();
}

moduleC();