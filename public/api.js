function sendCodeData(coneData) {
  return fetch("api/coneData", {
    method: "POST",
    headers: {
      "Content-type": "application-json",
    },
    body: JSON.stringify(coneData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export { sendCodeData };
