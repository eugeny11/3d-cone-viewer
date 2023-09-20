import {
  initThreeScene,
  animate,
  drawCone,
  drawSmoothCone,
} from "./threeHelpers.js";
import { sendCodeData } from "./api.js";

const threeContainer = document.getElementById("threeContainer");

initThreeScene(threeContainer);
animate();

document.getElementById("sendData").addEventListener("click", function () {
  console.log("Button clicked!");
  const heightValue = parseFloat(document.getElementById("height").value);
  const radiusValue = parseFloat(document.getElementById("radius").value);
  const segmentsValue = parseInt(document.getElementById("segments").value);

  const coneData = {
    height: heightValue,
    radius: radiusValue,
    segments: segmentsValue,
  };

  console.log(heightValue, radiusValue, segmentsValue);

  sendCodeData(coneData).then((response) => {
    console.log("Data has been sent");
  });
});

document
  .getElementById("drawSimpleCone")
  .addEventListener("click", function () {
    let height = parseFloat(document.getElementById("height").value);
    let radius = parseFloat(document.getElementById("radius").value);
    let segments = parseInt(document.getElementById("segments").value);

    drawCone(radius, height, segments);
  });

document
  .getElementById("drawSmoothConeButton")
  .addEventListener("click", function () {
    let height = parseFloat(document.getElementById("height").value);
    let radius = parseFloat(document.getElementById("radius").value);
    let segments = parseInt(document.getElementById("segments").value);

    drawSmoothCone(radius, height, segments);
  });
