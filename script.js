const grid = document.querySelector(".content");
const amountDiv = document.querySelector(".amount");
const slider = document.querySelector(".slider");
const blackbtn = document.querySelector(".btn.black");
const randbtn = document.querySelector(".btn.random");
const shadebtn = document.querySelector(".btn.shade");
const clearbtn = document.querySelector(".btn.erase");
let color = "black"; // default color

let size = 10; // 10x10, also min and default size
amountDiv.textContent = size;
/**
 *
 * @param gridSize: integer which specificies the amount of divs per row
 */
const setGrid = (gridSize = size * size) => {
  // set column & row style
  grid.style["grid-template-columns"] = `repeat(${size}, minmax(${
    100 / size
  }%, 1fr))`;

  grid.style["grid-template-rows"] = `repeat(${size}, minmax(${
    100 / size
  }%, 1fr))`;
  //delete existing divs
  grid.textContent = "";

  // add divs
  for (let i = 0; i <= gridSize; i++) {
    const div = document.createElement("div");
    grid.appendChild(div);
  }
};

/**
 * sets amount of dimensions selected by the user via the range slider
 * @param e:event
 */
const setDimensions = (e) => {
  let value = e.target.value;
  amountDiv.textContent = value;
  size = value;
  setGrid();
};

const setBlack = () => {
  color = "black";
  setHoverColor(color);
};

const setHoverColor = (color) => {
  const divs = document.querySelectorAll(".content div");
  divs.forEach((div) =>
    div.addEventListener(
      "mousemove",
      (div) => (div.target.style.backgroundColor = color)
    )
  );
};

// activate buttons and slider
blackbtn.addEventListener("click", setBlack);
slider.addEventListener("change", setDimensions);
setGrid();
