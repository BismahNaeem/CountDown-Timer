import inquirer from "inquirer";
import { differenceInSeconds, interval } from "date-fns";

// Creating a variable to prompt the user using inquirer
const res = await inquirer.prompt({
  name: "userinput",
  type: "number",
  message: "Enter the number of seconds",
  validate: (input) => {
    if (isNaN(input)) {
      return "Please enter a valid number";
    } else if (input > 60 || input < 1) {
      return "Seconds must be between 1 and 60";
    } else {
      return true;
    }
  }
})

// Create variable to save user input
let input = res.userinput;

// Function
function time(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const setIntervalTime = new Date(intTime);
  let intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(setIntervalTime, currentTime);
    if (timeDiff <= 0) {
      console.log("Time is up");
      clearInterval(intervalId); // Stop the timer
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600)
    const sec = Math.floor(timeDiff % 60)
    console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`)
  }, 1000)
}


time(input);