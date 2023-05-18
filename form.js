const $name = document.getElementById("name");
const $email = document.getElementById("email");
const $credit = document.getElementById("credit");
const $cash = document.getElementById("cash");
const $form = document.getElementById("form");
const $errorElement = document.getElementById("error");
const $dateInput = document.getElementById("date");
const $placeholder = document.getElementById("formPlaceholder");
const $notesPlus = document.getElementById("notesPlus");
const $notesMinus = document.getElementById("notesMinus");
const $plusBtn = document.getElementById("plusBtn");
const $minusBtn = document.getElementById("minusBtn");
const $offerPrice = document.getElementById("offer");
const store = localStorage;

const storePrice = store.getItem("price");

$offerPrice.innerText = storePrice;

// BUTTON CLICK
const $backButton = document.getElementById("back");
const $buyButton = document.getElementById("buy");

console.log({ store });

const back = () => {
  window.location.href = "index.html";
};

const buy = () => {
  window.location.href = "finalcard.html";
};

// INPUT SAVE & LOAD ON CHANGE
const saveInputToStore = (input, storeName) => {
  store.setItem(storeName, input);
};

const loadInputFromStore = (input, storeName) => {
  const val = store.getItem(storeName);

  input.value = val;
};

// LOAD DATA FROM STORE TO INPUT
loadInputFromStore($name, "formName");
loadInputFromStore($email, "formEmail");
loadInputFromStore($dateInput, "formDate");

// INPUT EVENT LISTENERS
$name.addEventListener("input", (e) =>
  saveInputToStore(e.target.value, "formName")
);

$email.addEventListener("input", (e) =>
  saveInputToStore(e.target.value, "formEmail")
);

$dateInput.addEventListener("input", (e) =>
  saveInputToStore(e.target.value, "formDate")
);

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $errorElement.innerText = "";
  const messages = [];

  const hasNameTwoStrings = $name.value.split(" ");
  console.log({ hasNameTwoStrings });

  if (
    $name.value === "" ||
    $name.value == null ||
    hasNameTwoStrings.length < 2
  ) {
    messages.push("Podaj imię i nazwisko");
  }

  if ($email.value === "" || $email.value == null) {
    messages.push("Podaj adres e-mail");
  }

  if ($dateInput.value === "" || $dateInput.value == null) {
    messages.push("Podaj datę odbioru");
  }

  if (!$credit.checked && !$cash.checked) {
    messages.push("Musisz wybrać jeden z radiobuttonów");
  }

  if (messages.length > 0) {
    $errorElement.innerHTML = messages.map((error) => `<p>${error}</p>`);

    return;
  }

  store.setItem("name", $name.value);
  store.removeItem("formName");

  store.setItem("email", $email.value);
  store.removeItem("formEmail");

  store.setItem("date", $dateInput.value);
  store.removeItem("formDate");

  buy();
});

// BACK TO PREVIOUS PAGE
$backButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log({ e });
  window.location.href = "/";
});

// CALENDAR

const today = new Date();
const todayDateString = today.toISOString().split("T")[0];
const daysToAdd = 14;
const futureDateString = new Date(today.setDate(today.getDate() + daysToAdd))
  .toISOString()
  .split("T")[0];
$dateInput.setAttribute("min", todayDateString);
$dateInput.setAttribute("max", futureDateString);

// IMAGE

const allButtons = document.querySelectorAll("button");

allButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    const closestDiv = button.closest(".offer", "div");
    const closestImage = closestDiv.querySelector("img");
    const imageAttr = closestImage.getAttribute("src");
    console.log("src: ", imageAttr);
  });
});

// PRICE

const checkboxesWrap = document.getElementById("price-checkboxes");
const checkboxes = checkboxesWrap.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function (button, index) {
  button.addEventListener("change", function () {
    const checkedArray = [];
    checkboxes.forEach((el) => {
      if (el.checked) {
        return checkedArray.push(true);
      }
    });

    const checkedElements = checkedArray.length;
    console.log("test", checkedArray, checkedElements);

    const price = store.getItem("price");

    const finalPrice = +price + +checkedElements * 10000;
    store.setItem("checkedItems", checkedElements);
    store.setItem("finalPrice", finalPrice);

    $offerPrice.innerText = finalPrice;
  });
});

console.log("chceckbox", checkboxes);
