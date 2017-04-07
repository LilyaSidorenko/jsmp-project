let getIntById = function(id) {
    return parseInt(document.getElementById(id).value, 10);
};

let calculate = function() {
    let sum = getIntById('x') + getIntById('y');
    document.getElementById('result').innerHTML = isNaN(sum) ? 0 : sum;
};

let getSum = function() {
    document.getElementById('add').addEventListener('click', calculate);
};

