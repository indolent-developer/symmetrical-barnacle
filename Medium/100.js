let numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let numbers2 = [-1, 2, 3, 4, 5, 6, 7, 8, 9];

let ops = ["t", "*", "/", "+", "-"];

let combinationCount = 0;
function findCombo(numbers, pos = 0, curArray = []) {
  curArray.push(numbers[pos]);
  pos++;

  let val = evalValue(curArray);
  //console.log(curArray.join(""), val);
  if (pos < 9) {
    ops.forEach((op) => {
      curArray.push(op);
      findCombo(numbers, pos, curArray);
      curArray.pop();
    });
  } else if (val == 100 && pos == 9) {
    // found print
    let str = curArray.map((n) => (n === "t" ? "" : n)).join("");
    console.log(str, eval(str));
    let val = evalValue(curArray);

    if (val !== 100) {
      let c = 0;
      val = evalValue(curArray);
    }
  }
  combinationCount++;
  curArray.pop(); // pos reset not needed as it was local variable
}

function reduce(arr, symbol) {
  let mulIndex = arr.indexOf(symbol);
  let newVals = [];

  if (mulIndex > 0) {
    let val = 0;
    switch (symbol) {
      case "+":
        val += arr[mulIndex - 1] + arr[mulIndex + 1];
        break;
      case "-":
        val += arr[mulIndex - 1] - arr[mulIndex + 1];
        break;
      case "*":
        val += arr[mulIndex - 1] * arr[mulIndex + 1];
        break;
      case "/":
        val += arr[mulIndex - 1] / arr[mulIndex + 1];
        break;
      case "t":
        val =
          arr[mulIndex - 1] > 0
            ? arr[mulIndex - 1] * 10 + arr[mulIndex + 1]
            : arr[mulIndex - 1] * 10 - arr[mulIndex + 1];
        break;
      default:
        console.log(element);
        throw new Error("Not expected");
    }

    for (let opIndex = 0; opIndex < arr.length; opIndex++) {
      const element = arr[opIndex];
      if (opIndex == mulIndex - 1) {
        newVals.push(val);
      }
      if (opIndex < mulIndex - 1 || opIndex > mulIndex + 1) {
        newVals.push(element);
      }
    }
    return newVals;
  } else {
    return arr;
  }
}
function evalValue(curArray) {
  let reduceArr = curArray;

  let highOps = ["t", "*", "/"];
  let seqOps = [];

  highOps.forEach(
    (op) => (seqOps = seqOps.concat(curArray.filter((cur) => cur === op)))
  );

  seqOps = seqOps.concat(curArray.filter((cur) => cur === "+" || cur === "-"));

  seqOps.forEach((op) => {
    reduceArr = reduce(reduceArr, op);
  });

  return reduceArr[0];
}

findCombo(numbers1);
findCombo(numbers2);
console.log(`Total combinations:${combinationCount}`);
