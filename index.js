const playBoard = document.querySelector(".game");
    const normalScore = document.getElementById("scoreValue");
    const highNum = document.getElementById("highValue");
    const rightArrow = document.getElementById("rightArrow");
    const leftArrow = document.getElementById("leftArrow");
    const upArrow = document.getElementById("upArrow");
    const downArrow = document.getElementById("downArrow");

    let snakeBody = [];
    let moveX = 0,
      moveY = 0;
    let score = 0;
    let cubesEaten = 0;

    let highValue = localStorage.getItem("highValue") || 0;
    highNum.innerText = highValue;

    const gameOver = () => {
      window.alert("Game Over! Click ok to Restart!");
      snakeX = 5;
      snakeY = 5;
      moveX = 0;
      moveY = 0;
      snakeBody.forEach((segment) => segment.remove());
      snakeBody = [];
      createSnake();
      score = 0;
      normalScore.innerText = score;
      resetFoodCubes();
    };

const createFood = (numberOfFoods) => {
  for (let i = 0; i < numberOfFoods; i++) {
    let newX, newY;
    do {
      newX = Math.floor(Math.random() * 28);
      newY = Math.floor(Math.random() * 28);
    } while (snakeCoordinates.includes(`${newX},${newY}`));

    foodX.push(newX);
    foodY.push(newY);

    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.left = newX * 20 + "px";
    foodElement.style.top = newY * 20 + "px";
    playBoard.appendChild(foodElement);
  }
};

const initialNumberOfFoods = 4;
let foodX = [];
let foodY = [];
let snakeCoordinates = []; 

for (let i = 0; i < initialNumberOfFoods; i++) {
  let newX, newY;
  do {
    newX = Math.floor(Math.random() * 30);
    newY = Math.floor(Math.random() * 30);
  } while (snakeCoordinates.includes(`${newX},${newY}`));

  foodX.push(newX);
  foodY.push(newY); 
}
createFood(initialNumberOfFoods);

const updateFoodPosition = () => {
  if (cubesEaten >= 4) {
    const foodElements = document.querySelectorAll(".food");
    for (let i = 0; i < initialNumberOfFoods; i++) {
      let newX, newY;
      do {
        newX = Math.floor(Math.random() * 30);
        newY = Math.floor(Math.random() * 30);
      } while (snakeCoordinates.includes(`${newX},${newY}`));

      foodX[i] = newX;
      foodY[i] = newY;

      foodElements[i].style.left = newX * 20 + "px";
      foodElements[i].style.top = newY * 20 + "px";
    }
    cubesEaten = 0;
  }
};

setInterval(() => {
  updateFoodPosition();
}, 4000);

const addNewFoodCube = () => {
  let newX, newY;
  do {
    newX = Math.floor(Math.random() * 30);
    newY = Math.floor(Math.random() * 30);
  } while (snakeCoordinates.includes(`${newX},${newY}`));

  foodX.push(newX);
  foodY.push(newY);

  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = newX * 20 + "px";
  foodElement.style.top = newY * 20 + "px";
  playBoard.appendChild(foodElement);
};

const resetFoodCubes = () => {
  const foodElements = document.querySelectorAll(".food");
  foodElements.forEach((foodElement) => foodElement.remove());
  foodX = [];
  foodY = [];
  createFood(initialNumberOfFoods);
};

let snakeX = 5,
  snakeY = 5;

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      moveX = 0;
      moveY = -1;
      break;
    case "ArrowDown":
      moveX = 0;
      moveY = 1;
      break;
    case "ArrowLeft":
      moveX = -1;
      moveY = 0;
      break;
    case "ArrowRight":
      moveX = 1;
      moveY = 0;
      break;
    default:
      return;
  }
});

const createSnake = () => {
  const snakeElement = document.createElement("div");
  snakeElement.classList.add("snake");
  snakeElement.style.left = snakeX * 20 + "px";
  snakeElement.style.top = snakeY * 20 + "px";
  playBoard.appendChild(snakeElement);
  snakeBody.unshift(snakeElement);
};

const updateSnakePosition = () => {
  snakeX += moveX;
  snakeY += moveY;

  if (snakeX < 0 || snakeX >= 30 || snakeY < 0 || snakeY >= 30) {
    gameOver();
    return;
  }

  snakeBody[0].style.left = snakeX * 20 + "px";
  snakeBody[0].style.top = snakeY * 20 + "px";

  
  snakeCoordinates = [`${snakeX},${snakeY}`, ...snakeCoordinates.slice(0, -1)];

  const foodElements = document.querySelectorAll(".food");
  foodElements.forEach((foodElement, index) => {
    if (snakeX === foodX[index] && snakeY === foodY[index]) {
      foodElement.remove();
      foodX.splice(index, 1);
      foodY.splice(index, 1);
      score++;
      normalScore.innerText = score;
      cubesEaten++;

      const highNumValue = parseInt(highNum.innerText);
      if (score > highNumValue) {
        highNum.innerText = score;
        localStorage.setItem("highValue", score);
      }

      const newSnakeSegment = document.createElement("div");
      newSnakeSegment.classList.add("snake");
      snakeBody.push(newSnakeSegment);
      playBoard.appendChild(newSnakeSegment);

      addNewFoodCube();
    }
  });

  for (let i = snakeBody.length - 1; i > 0; i--) {
    const prevSegment = snakeBody[i - 1];
    const currentSegment = snakeBody[i];
    const prevX = parseInt(prevSegment.style.left);
    const prevY = parseInt(prevSegment.style.top);
    currentSegment.style.left = prevX + "px";
    currentSegment.style.top = prevY + "px";
  }
};

setInterval(() => {
  updateSnakePosition();
}, 100);

rightArrow.addEventListener('click', function () { 
  
  moveX = 1;
  moveY = 0;
});

leftArrow.addEventListener('click', function () { 
  
  moveX = -1;
  moveY = 0;
});

upArrow.addEventListener('click', function () { 
  
  moveX = 0;
  moveY = -1;
});

downArrow.addEventListener('click', function () { 

  moveX = 0;
  moveY = 1;
});

createSnake();
