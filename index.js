const prompt = require("prompt-async");

async function schoolHostelAssignment() {
  prompt.start();

  let { n } = await prompt.get(["n"]);
  const students = [];
  for (let i = 0; i < n; i++) {
    const studentInfo = await prompt.get(["id", "class", "food"]);

    const errors = checkErrors(studentInfo);
    if (errors.length !== 0) {
      errors.forEach((error) => console.log(error));
      // Increase n in case of errors
      n++;
      continue;
    }

    const isRegistered = registerStudent(students, studentInfo);
    if (!isRegistered) {
      console.log("Student already registered...please try with another id");
      n++;
    } else {
      console.log("Student Registered successfully!", studentInfo);
    }
    console.log("Currently registered students ==>", students);
  }

  console.log("AV :", studentHouse(students, "A", "V"));
  console.log("ANV :", studentHouse(students, "A", "NV"));
  console.log("BV :", studentHouse(students, "B", "V"));
  console.log("BNV :", studentHouse(students, "B", "NV"));
}

// check for valid input
function checkErrors(obj) {
  const { id, class: stdClass, food } = obj;
  let errors = [];
  if (typeof id !== "number" || id.toString().length !== 4)
    errors.push("id must be 4 digits");
  if (stdClass !== "A" && stdClass !== "B")
    errors.push("invalid student class");
  if (food !== "V" && food !== "NV") errors.push("invalid food preference");
  return errors;
}

// Add valid students
function registerStudent(input, obj) {
  const index = input.findIndex((item) => item.id === obj.id);
  if (index === -1) {
    input.push(obj);
    return true;
  } else {
    return false;
  }
}

//Final Result
function studentHouse(input, stdClass, food) {
  return input
    .filter((item) => item.class === stdClass && item.food === food)
    .map((item2) => item2.id);
}

schoolHostelAssignment();
