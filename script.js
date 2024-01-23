const grid = document.querySelector(".content");
const amountDiv = document.querySelector(".amount");
const slider = document.querySelector(".slider");
const blackbtn = document.querySelector(".btn.black");
const randbtn = document.querySelector(".btn.random");
const erasebtn = document.querySelector(".btn.erase");
const btns = [blackbtn, randbtn, erasebtn];
let color = ""; // default color

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
    div.style["background-color"] = "white";
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
  _turnOffScale();
  setGrid();
};

const setColor = (e) => {
  color = e.target.textContent.toLowerCase();
  _toggleActiveScale(e);
  setHoverColor(color);
};

/**
 * changes the color of divs when the mouse hovers over the grid elements
 * @param {string} color: selected color
 */
const setHoverColor = (color) => {
  const divs = document.querySelectorAll(".content div");
  if (color === "erase") {
    divs.forEach((div) => {
      div.onmousemove = (e) => (e.target.style["background-color"] = "white");
    });
  } else {
    for (let i = 0; i < divs.length; i++) {
      divs[i].onmousemove = (e) => {
        let [rand1, rand2, rand3] = _getThreeRandNums();
        let finalColor =
          color === "random" ? `rgb(${rand1}, ${rand2}, ${rand3})` : "black";
        console.log(finalColor);
        // only color if background is white
        if (e.target.style["background-color"] === "white")
          e.target.style["background-color"] = finalColor;
      };
    }
  }
};

/**
 * scales button to 1.2 and reduces scale of all other buttons
 * @param {*} event
 */
const _toggleActiveScale = (event) => {
  // scale current button
  for (let btn of btns) {
    if (btn === event.target) btn.style["transform"] = "scale(1.2)";
    else btn.style["transform"] = "scale(1.0)";
  }
  // rescale others back to 1
};

const _turnOffScale = () => {
  btns.forEach((btn) => (btn.style["transform"] = "scale(1.0)"));
};

const _getThreeRandNums = () => {
  const rand1 = Math.floor(Math.random() * 256);
  const rand2 = Math.floor(Math.random() * 256);
  const rand3 = Math.floor(Math.random() * 256);
  return [rand1, rand2, rand3];
};

// activate buttons, slider, and the grid
btns.forEach((btn) => btn.addEventListener("click", setColor));
slider.addEventListener("change", setDimensions);
setGrid();
