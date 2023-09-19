import { initThreeScene } from "./threeHelpers";

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
