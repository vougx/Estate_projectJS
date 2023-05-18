const store = localStorage;
const $nameField = document.getElementById("name");
const $emailField = document.getElementById("email");
const $dateFiled = document.getElementById("date");
const $imageField = document.getElementById("image");
const $offerPrice = document.getElementById("offer");
const $finalPrice = document.getElementById("finalPrice");

const storeName = store.getItem("name");
const storeEmail = store.getItem("email");
const storeDate = store.getItem("date");
const storeImage = store.getItem("image");
const storePrice = store.getItem("price");
const storeFinalPfice = store.getItem("finalPrice");

$nameField.innerText = storeName;
$emailField.innerText = storeEmail;
$dateFiled.innerHTML = storeDate;
$imageField.setAttribute("src", storeImage);
$offerPrice.innerText = storePrice;
$finalPrice.innerText = storeFinalPfice;

const $backButtonFinal = document.getElementById("backFinal");
const backFinal = () => {
  window.location.href = "form.html";
};

$backButtonFinal.addEventListener("click", () => {
  backFinal();
});
