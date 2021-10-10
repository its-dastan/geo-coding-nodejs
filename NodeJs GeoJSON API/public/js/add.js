const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");

// Send POST to API to add store
storeForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (storeId.value === "" || storeAddress.value === "") {
    alert("Please fill the fields");
  }

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value,
  };

  try {
    const res = await fetch("/api/stores", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
    }

    alert("Store added!");
    window.location.href = "/index.html";
  } catch (error) {
    alert(err);
  }
});
