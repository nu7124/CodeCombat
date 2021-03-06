/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Problem, CompletedProblem} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: 'Arya Stark', email: 'Arya@email.com', password: '123', rank: 3, points: 350, isAdmin: false, battleWin: 20, battleLoss: 15, profileImage: 'https://firebasestorage.googleapis.com/v0/b/stackathon-17f9d.appspot.com/o/arya.jpg?alt=media&token=19789414-d3ac-44cb-b915-5440f105591c'}),
    User.create({name: 'Samurai Jack', email: 'Jack@email.com', password: '123', rank: 3, points: 225, isAdmin: false, battleWin: 15, battleLoss: 10, profileImage: 'http://img.sharetv.com/shows/characters/thumbnails/samurai_jack.samurai_jack.jpg'}),
    User.create({name: 'Jonathan', email: 'Jonathan@email.com', password: '123', rank: 1, points: 70, isAdmin: false, battleWin: 10, battleLoss: 5})
  ])
//CHANGE REST OF TESTSPECS TO MATCH BOTTOM ONES
  const problems = await Promise.all([
    Problem.create({
      title: 'Sum',
      level: 1,
      description: 'Return the sum of two numbers',
      solution: 'function sum(a,b){ return a + b }',
      testSpecs: [
        'assert.equal(sum(1,2), 3)',
        'assert.equal(sum(4,2), 6)'
      ],
      authorId: 1,
      signature: 'sum(a, b)',
      rating: 2
    }),
    Problem.create({
      title: 'Difference',
      level: 1,
      description: 'Return the difference of two numbers',
      solution: 'function diff(a,b){ return a - b} ',
      testSpecs: ['assert.equal(diff(1,2), -1)', 'assert.equal(diff(5,2), 3)'], authorId: 2,
      signature: 'diff(a, b)',
      rating: 2
    }),
  Problem.create({
    title: 'Temperature Converter',
    level: 1,
    description: 'Write a converter function that accepts a temperature in Fahrenheit and returns the temperature in Celsius. For your reference, here is the equation for converting Fahrenheit to Celsius: T(°C) = (T(°F) - 32) × 5/9',
    solution: `function converter(temp) {
      return (temp - 32) * 5/9;
    }`,
    signature: 'converter(temp)',
    testSpecs: [
      'assert.equal(converter(77), 25)',
      'assert.equal(converter(-5), -20.555555555555557)',
      'assert.equal(converter(32), 0)'
    ],
    authorId: 1
  }),
  Problem.create({
    title: 'Fizz Buzz',
    level: 2,
    description: 'Write a function that accepts a single number as an argument. Return "Fizz" for any numbers that are divisible by 3, "Buzz" for any numbers that are divisible by 5, and "FizzBuzz" for any numbers divisible by both 3 and 5. Else, return false',
    solution: `function fizzBuzz(num){
      if (num%15 === 0) {
        return "FizzBuzz";
      } else if (num%5 === 0) {
        return "Buzz";
      } else if (num%3 === 0) {
        return "Fizz";
      } else {
        return false;
      }
    }`,
    testSpecs: [
      'assert.equal(fizzBuzz(15), "FizzBuzz")',
      'assert.equal(fizzBuzz(3), "Fizz")',
      'assert.equal(fizzBuzz(5), "Buzz")',
      'assert.equal(fizzBuzz(12), "Fizz")'
    ],
    authorId: 1,
    signature: 'fizzBuzz(num)',
    rating: 4
  }),
  Problem.create({
    title: 'Exponentiate',
    level: 2,
    description: 'Write a function exponentiate that accepts a number and a power to raise that number to. For the present, assume the power argument will always be a positive integer value.',
    solution: `function exponentiate(base, power) {
      var expResult = 1;

      for (var i = 0; i < power; i++) {
        expResult *= base;
      }

      return expResult;
    }`,
    testSpecs: [
      'assert.equal(exponentiate(1,1), 1)',
      'assert.equal(exponentiate(3,3), 27)',
      'assert.equal(exponentiate(6,7), 279936)'
    ],
    authorId: 1,
    signature: 'exponentiate(base, power)',
    rating: 4.5
  }),
  Problem.create({
    title: 'isPrime',
    level: 2,
    description: 'Create the function isPrime(num) which will take the num parameter being passed and return true if the parameter is a prime number, otherwise return false. Note: A prime number is any number that can only be evenly divided by 1 or itself',
    solution: `function isPrime(num){
      for(var i = 2; i < num; i++){
        if (num % i === 0){
          return false;
        }
      }
      return num > 1;
    }`,
    signature: 'isPrime(num)',
    testSpecs: [
      'assert.equal(isPrime(5), true)',
      'assert.equal(isPrime(10), false)',
      'assert.equal(isPrime(17), true)'
    ],
    authorId: 1,
    rating: 4
  }),
  Problem.create({
    title: 'Bactrian Case',
    level: 3,
    description: 'write a function bactrianCase that accepts a single string as an argument. The function should log out that string with every other letter capitalized.',
    solution: `function bactrianCase(str) {
      var newString = '';

      for(var i = 0; i<str.length; i++) {
        if (i % 2 === 0) {
          newString += str[i].toUpperCase();
        } else {
          newString += str[i];
        }
      }

      return newString;
    }`,
    testSpecs: [
      'assert.equal(bactrianCase("hello"),"HeLlO")',
      'assert.equal(bactrianCase("stephanie"),"StEpHaNiE")',
      'assert.equal(bactrianCase("fullstack"), "FuLlStAcK")'
    ],
    authorId: 1,
    signature: 'bactrianCase(str)',
    rating: 4
  }),
  Problem.create({
    title: 'Underscore to CamelCase',
    level: 3,
    description: 'Write a function to convert a variable name from under_score format to camelCase.Make sure you support an unlimited number of underscores in the input! You will not have to worry about white space in your input, only alphanumeric characters and underscore',
    solution: `function underToCamel(underName) {
      var camelCaseOutput = '';
      var foundUnder = false;
      for (var i = 0; i < underName.length; i++) {
        if (underName[i] === '_') {
          foundUnder = true;
        } else {
          if (foundUnder) {
            camelCaseOutput += underName[i].toUpperCase();
            foundUnder = false;
          } else {
            camelCaseOutput += underName[i];
          }
        }
      }
      return camelCaseOutput;
    }`,
    signature: 'underToCamel(underName)',
    testSpecs: [
      'assert.equal(underToCamel("first_name"), "firstName")',
      'assert.equal(underToCamel("my_income_tax_from_2015"), "myIncomeTaxFrom2015")',
      'assert.equal(underToCamel("i_love_javascript"), "iLoveJavascript")'
    ],
    authorId: 1
  }),
  Problem.create({
    title: 'Frequency Analysis',
    level: 3,
    description: 'Write a function that takes a string of text and returns an object containing the count for each character in the string.Note: The input string  will only contain lowercase letters. There will not be any whitespace, capital letters, numbers, or special characters.',
    solution: `function frequencyAnalysis(str) {
      var countObj = {};

      for (var i=0; i<str.length; i++) {
        if (countObj[str[i]]) {
          countObj[str[i]]++;
        } else {
          countObj[str[i]] = 1;
        }
      }

      return countObj;
    }`,
    signature: 'frequencyAnalysis(str)',
    testSpecs: [
      'assert.deepEqual(frequencyAnalysis("abca"), {a: 2, b: 1, c: 1})',
      'assert.deepEqual(frequencyAnalysis(""), {})',
      'assert.deepEqual(frequencyAnalysis("xxyyyz"), { x: 2, y: 3, z: 1 })'
    ],
    authorId: 1,
    rating: 3.8
  }),
  Problem.create({
    title: 'Flatten Arrays',
    level: 4,
    description: 'Write a function, flatten, that accepts a two-dimensional array as its argument and returns a flattened one-dimensional copy of the array.The argument array will never be more than 2 levels deep. Remember to return a copy, meaning you should not modify the original 2D array passed in!',
    solution: `function flatten(arr) {
      var flatArray = [];
      for (var i=0; i<arr.length; i++) {
        if (typeof arr[i] === 'object') {
          for (var j=0; j<arr[i].length; j++) {
            flatArray.push(arr[i][j]);
          }
        } else {
          flatArray.push(arr[i]);
        }
      }
      return flatArray;
    }

    // USING Array.isArray():
    function flatten(arr) {
      var flatArray = [];
      for (var i=0; i<arr.length; i++) {
        if (Array.isArray(arr[i])) {
          for (var j=0; j<arr[i].length; j++) {
            flatArray.push(arr[i][j]);
          }
        } else {
          flatArray.push(arr[i]);
        }
      }
      return flatArray;
    }`,
    signature: 'flatten(arr)',
    testSpecs: [
      'assert.deepEqual(flatten([1,[2,3],4]), [1,2,3,4])',
      'assert.deepEqual(flatten([2, [3, 4, 11, 13]]), [ 2, 3, 4, 11, 13 ])',
      'assert.deepEqual(flatten([11, [0], 19, 7]), [ 11, 0, 19, 7 ])'
    ],
    authorId: 1,
    rating: 5
  }),
  Problem.create({
    title: 'Proper Noun Filter',
    level: 4,
    description: "Write a function, properNounFilter, that determines whether the string argument is a proper noun. A word is considered a proper noun if only the first letter is capitalized. If the argument is a proper noun, properNounFilter should return true. It should return false if the word isn't a proper noun, if the word is mixed case, or if it is all caps.",
    solution: `function properNounFilter(word) {
      var charCode;

      if(word.charCodeAt(0) > 90) return false;

      for(var i = 1; i < word.length; i++){
        charCode = word.charCodeAt(i);
        if(charCode >= 65 && charCode < 90) return false;
      }
      return true;
    }`,
    signature: 'properNounFilter(word)',
    testSpecs: [
      'assert.equal(properNounFilter("coffee"), false)',
      'assert.equal(properNounFilter("Einstein"), true)',
      'assert.equal(properNounFilter("ApoLLo"), false)'
    ],
    authorId: 1,
    rating: 4
  }),
  Problem.create({
    title: 'Most Vowels',
    level: 5,
    description: 'Write a function that accepts a string and returns the word from that string with the most vowels. If there are no words with strings, return the empty string.',
    solution: `function mostVowels(str) {
      var vowels = "aeiou";
      var wordsArr = str.split(" ");
      var leadWord = "";
      var mostVowels = 0;

      for (var i=0; i<wordsArr.length; i++) {
        var word = wordsArr[i];
        var vowelCount = 0;
        for (var j=0; j<word.length; j++) {
          if (vowels.indexOf(word[j]) !== -1) {
            vowelCount += 1;
          }
        }
        if (vowelCount > mostVowels) {
          mostVowels = vowelCount;
          leadWord = word;
        }
      }

      return leadWord;
    }`,
    testSpecs: [
      'assert.equal(mostVowels("I am a keeper with some real rhythms"), "keeper")',
      'assert.equal(mostVowels("Tenacious Tony Trains Today, Tomorrow Till The Time Ticks"), "Tenacious")',
      'assert.equal(mostVowels("I love Javascript"), "Javascript")',
    ],
    authorId: 1,
    signature: 'mostVowels(str)',
    rating: 4.7
    }
  ),
  Problem.create(
    {
      title: `String Permutations`,
      level: 6,
      description: `Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length
                    as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words
                    The array that is returned should only contain unique values and its elements should be in alphabetical order.`,
      solution: `function stringPermutations (str) {
                    var results = [ ];
                    var letters = str.split('');
                    results.push([letters.shift()]); //add first letter (as an array) to results
                    while (letters.length) {
                      var curLetter = letters.shift();
                      var tmpResults = [ ];
                      results.forEach(function (curResult) {
                        for (let i = 0; i<= curResult.length; i++) {
                          var tmp = curResult.slice(); //make copy so we can modify it
                          //insert the letter at the current position
                          tmp.splice(i,0,curLetter);
                          tmpResults.push(tmp);
                        }
                      });
                      results = tmpResults; //overwrite the previous results
                    }
                    return results
                      .map(function (letterArr) {
                        return letterArr.join('');
                      })
                      .filter(function (el, index, self) {
                        return self.indexOf(el) === index; //filter out non-unique words
                      })
                      .sort();
                }`,
      testSpecs: [
                  `assert.deepEqual(stringPermutations('one'), [ 'eno', 'eon', 'neo', 'noe', 'oen', 'one' ])`,
                  `assert.deepEqual(stringPermutations('app'), [ 'app','pap','ppa'])`,
                  `assert.deepEqual(stringPermutations('nn'), [ 'nn' ])`
                ],
      authorId: 1,
      signature: `stringPermutations (str)`,
      rating: 5
      }
    ),
//-----------------------------NEW PROBLEMS-------------------------------------
Problem.create(
  {
    title: `String Search`,
    level: 6,
    description: `You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).`,
    solution: `function indexOf (needle, haystack) {
                  for (let hIdx = 0; hIdx <= haystack.length - needle.length; hIdx++) {
                    for (let nIdx = 0; nIdx < needle.length; nIdx++) {
                      if (haystack[hIdx + nIdx] !== needle[nIdx]) break;
                      if (nIdx + 1 === needle.length) return hIdx;
                    }
                  }
                    return -1;
                }`,
    testSpecs: [
                `assert.equal(indexOf('or', 'hello world'), 7)`,
                `assert.equal(indexOf('hello world', 'or'), -1)`,
                `assert.equal(indexOf('howdy', 'hello world'), -1)`
               ],
    authorId: 1,
    signature: `indexOf(needle, haystack)`,
    rating: 5
  }
),
Problem.create(
  {
    title: `Subset Sum`,
    level: 7,
    description: `Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the                array may only be used once. Return false if the numbers cannot be used to add to the target sum.`,
    solution: `function subsetSum(target, arr){
                  let sums = [0];
                  for (let i = 0; i < arr.length; i++){
                    let sumsCopy = [...sums]; // create a new array to iterate through; iterating through the array that we're mutating will lead to some weird behavior
                    for (let j = 0; j < sumsCopy.length; j++){
                      let newSum = sumsCopy[j] + arr[i];
                      if (newSum === target) return true;
                      else if (newSum < target) sums.push(newSum);
                    }
                  }
                  return false;
               }`,
    testSpecs: [
                `assert.deepEqual(subsetSum(2, [1,10,5,3]), false)`,
                `assert.deepEqual(subsetSum(10, [1,10,5,3]), true)`,
                `assert.deepEqual(subsetSum(9, [1,10,5,3]), true)`
               ],
    authorId: 1,
    signature: `subsetSum(target, arr)`,
    rating: 4.8
  }
),
Problem.create(
  {
    title: `Longest Increasing Subsequence`,
    level: 7,
    description: `Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the
                   array. For example in [3, 10, 4, 5] the longest increasing subsequence is [3, 4, 5].`,
    solution: `function longestIncreasingSubsequence (nums, idx = 0, base = -Infinity) {
                  if (idx === nums.length) return 0;
                  const num = nums[idx];
                  const whenExcluded = longestIncreasingSubsequence(nums, idx + 1, base);
                  if (num <= base) return whenExcluded;
                  const whenIncluded = 1 + longestIncreasingSubsequence(nums, idx + 1, num);
                  return Math.max(whenIncluded, whenExcluded);
               }`,
    testSpecs: [
                `assert.deepEqual(longestIncreasingSubsequence([3, 4, 2, 1, 10, 6]), 3)`,
                `assert.deepEqual(longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80]), 6)`,
                `assert.deepEqual(longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80, 21, 23, 24, 25, 26, 27, 28]), 9)`
               ],
    authorId: 1,
    signature: `longestIncreasingSubsequence (nums, idx = 0, base = -Infinity)`,
    rating: 4.9
  }
),
Problem.create(
  {
    title: `IsPalindrome`,
    level: 4,
    description: `write a function that takes in a string and, return true if any permutation of that string is a palindrom`,
    solution: `function isPalindrome(str){
                  let letterObj = {};

                  for(let i = 0; i < str.length; i++){
                      letterObj[str[i]] = letterObj[str[i]] + 1 || 1;
                  } // o(n)

                  let unevenFlag = false;
                  for(let k in letterObj){
                      if(letterObj[k] % 2 && unevenFlag){
                          return false;
                      } else if(letterObj[k] % 2){
                          unevenFlag = true;
                      }
                  }
                  return true;
            }`,
    testSpecs: [
                `assert.equal(isPalindrome('abc'), false)`,
                `assert.equal(isPalindrome('madam'), true)`,
                `assert.equal(isPalindrome('hello'), false)`
               ],
    authorId: 1,
    signature: `isPalindrome(str)`,
    rating: 5
  }
),
Problem.create(
  {
    title: `Intersection`,
    level: 5,
    description: `Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the                         "intersection") may be returned in any order, they needn't be sorted.
                  You can assume that each array has only unique values (no duplicates within the array).`,
    solution: `function intersection (arrA, arrB) {
                  const shared = [];
                  let idxA = 0;
                  let idxB = 0;
                  while (idxA < arrA.length && idxB < arrB.length) {
                    const elemA = arrA[idxA];
                    const elemB = arrB[idxB];
                    if (elemA == elemB) {
                      shared.push(elemA);
                    }
                    if (elemA <= elemB) {
                      idxA++;
                    }
                    if (elemA >= elemB) {
                      idxB++;
                    }
                  }
                  return shared;
               }`,
    testSpecs: [
                `assert.deepEqual(intersection([1,4,9,10,11], [2,3,4,5,8,10]),  [4, 10])`,
                `assert.deepEqual(intersection([11,14,19,20,21,24], [12,13,14,15,18,20, 24]),  [14, 20, 24])`,
                `assert.deepEqual(intersection([31,35,39,40,51], [22,25,34,45,58,60]),  [])`
               ],
    authorId: 1,
    signature: `intersection (arrA, arrB)`,
    rating: 5
  }
),
Problem.create(
  {
    title: `Paired Sum`,
    level: 5,
    description: `Write a function that takes in an array of sorted numbers and a number. See if any two numbers in that array add to that number. `,
    solution: `function pairSum(arr, num){
                  let startIndex = 0;
                  let stopIndex = arr.length - 1;

                  while(startIndex < stopIndex){
                      if(arr[startIndex] + arr[stopIndex] === num){
                          return true;
                      } else if(arr[startIndex] + arr[stopIndex] < num){
                          startIndex++;
                      } else {
                          stopIndex--;
                      }
                  }
                  return false;
            }`,
    testSpecs: [
                `assert.deepEqual(pairSum([1,2,3,4], 6), true)`,
                `assert.deepEqual(pairSum([1,2,3,4], 9), false)`,
                `assert.deepEqual(pairSum([-1, -2, -3], -4), true)`
               ],
    authorId: 1,
    signature: `pairSum(arr, num)`,
    rating: 5
  }
)])

const complete = await Promise.all([
  CompletedProblem.create({userId: 1, problemId: 1, rating: 3, userSolution: 'function sum(a,b){ return a+b}'}),
  CompletedProblem.create({userId: 2, problemId: 1, rating: 3, userSolution: 'function sum(a,b){ return a+b}'}),
  CompletedProblem.create({userId: 1, problemId: 2, rating: 4, userSolution: 'function diff(a,b){ return a-b}'}),
  CompletedProblem.create({userId: 2, problemId: 2, rating: 4, userSolution: 'function diff(a,b){ return a-b}'}),
  CompletedProblem.create({userId: 1, problemId: 12, rating: 3, userSolution: `function underToCamel(underName) {
    var camelCaseOutput = '';
    var foundUnder = false;
    for(var i = 0; i<underName.length; i++) {
        if (underName[i] === '_') {
            foundUnder = true;
        } else {
            if (foundUnder) {
                camelCaseOutput += underName[i].toUpperCase();
                foundUnder = false;
            } else {
                camelCaseOutput += underName[i];
            }
        }
    }
       return camelCaseOutput;
 }`}),
 CompletedProblem.create({userId: 2, problemId: 10, rating: 4, userSolution: `function isPrime(num){
  for(var i=2; i < num; i++){
     if(num%i === 0){
         return false;
     }
  }
    return num > 1;
}`}),
CompletedProblem.create({userId: 1, problemId: 5, rating: 4, userSolution: `function converter(temp) {
  return (temp - 32) * 5/9;
}`}),
CompletedProblem.create({userId: 1, problemId: 7, rating: 4, userSolution: `function mostVowels(str) {
  var vowels = "aeiou";
  var wordsArr = str.split(" ");
  var leadWord = "";
  var mostVowels = 0;

 for (var i=0; i<wordsArr.length; i++) {
    var word = wordsArr[i];
    var vowelCount = 0;
    for (var j=0; j<word.length; j++) {
      if (vowels.indexOf(word[j]) !== -1) {
        vowelCount += 1;
      }
    }
    if (vowelCount > mostVowels) {
      mostVowels = vowelCount;
      leadWord = word;
    }
  }

 return leadWord;
}`}),
CompletedProblem.create({userId: 1, problemId: 3, rating: 4, userSolution: `function fizzBuzz(num){
  if (num%15 === 0) {
    return "FizzBuzz";
  } else if (num%5 === 0) {
    return "Buzz";
  } else if (num%3 === 0) {
    return "Fizz";
  } else {
    return false;
  }
}
`}),
CompletedProblem.create({userId: 1, problemId: 8, rating: 4, userSolution: `function frequencyAnalysis(str) {
  var countObj = {};

  for (var i=0; i<str.length; i++) {
    if (countObj[str[i]]) {
      countObj[str[i]]++;
    } else {
      countObj[str[i]] = 1;
    }
  }

   return countObj;
}`})
])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
  console.log(`seeded ${complete.length} completed problems`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
