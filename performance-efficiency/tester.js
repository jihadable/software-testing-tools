let data = [];
for (let i = 0; i < 1000000; i++) {
    data.push(Math.random());
}

let sum = data.reduce((acc, val) => acc + val, 0);
console.log(sum);
