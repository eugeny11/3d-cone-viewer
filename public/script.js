import { initThreeScene } from "./threeHelpers";
import { drawCone } from "./threeHelpers";

document
  .getElementById("coneForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const height = parseFloat(document.getElementById("height").value);
    const radius = parseFloat(document.getElementById("radius").value);
    const segments = parseInt(document.getElementById("segments").value);

    console.log("Height:", height, "Radius:", radius, "Segments:", segments);
  });

const threeContainer = document.getElementById("threeContainer");

initThreeScene(threeContainer);

document
  .getElementById("drawSimpleCone")
  .addEventListener("click", function () {
    let height = parseFloat(document.getElementById("height").value);
    let radius = parseFloat(document.getElementById("radius").value);
    let segments = parseInt(document.getElementById("segments"));

    drawCone(radius, height, segments);
  });
