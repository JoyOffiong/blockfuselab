function targetedNumbers(integers, target) {
  const solutionArray = new Map();
  for (let i = 0; i < integers.length; i++) {
    let solution = target - integers[i];
    if (solutionArray.has(solution)) {
      return [solutionArray.get(solution), i];
    }

    solutionArray.set(integers[i], i);
  }
  return [];
}

const integers = [2, 7, 6, 9, 3];
const target = 8;
const solutions = targetedNumbers(integers, target);

console.log(solutions);
