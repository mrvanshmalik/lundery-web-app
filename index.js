//login form

let Loginform = document.getElementById("login-form");
if (Loginform) {
  Loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#login-username").value.trim();
    if (!username) return;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);

    window.location.replace("index.html");
  });
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.replace("login.html");
  });
}

const nameEl = document.getElementById("user-main-name");
if (nameEl) {
  nameEl.innerText = localStorage.getItem("username") || "User Name";
}

//add to cart

const data = [
  { name: "Dry Cleaning", price: 200, times: 0 },
  { name: "Woolen Wash", price: 100, times: 0 },
  { name: "Steam Ironing", price: 30, times: 0 },
  { name: "Comforter Cleaning", price: 435, times: 0 },
  { name: "Curtain Cleaning", price: 199, times: 0 },
  { name: "Wash & Iron Combo", price: 99, times: 0 },
  { name: "Premium Laundry", price: 149, times: 0 },
];

const allservices = document.getElementById("service-content");
const bookingForm = document.getElementById("booking-form-box");
const addToCart = document.getElementById("added-items");
let total = document.getElementById("billing-amt");
let num = 0;
let totalBillAmt = 0;

function totalBill(amt) {
  totalBillAmt += amt;
  total.innerText = `Rs. ${totalBillAmt}`;
}

function cartItemCreator(val) {
  let alert_div = document.getElementById("no-item-alert");
  alert_div.style.display = "none";
  num++;
  const mainele = document.createElement("div");
  const subele1 = document.createElement("p");
  const subele2 = document.createElement("p");
  const subele3 = document.createElement("p");

  mainele.className = `motion grid grid-cols-6 grid-rows-1 rounded-2xl border-2 border-black/30 bg-white mb-1 `;
  mainele.id = `${val}`;

  subele1.innerText = `${num}`;
  subele1.className = "col-span-1 col-start-1 font-bold text-black text-center";

  subele2.innerText = `${val}`;
  subele2.className =
    "col-span-2  col-start-3  font-bold text-pink-600 text-center";

  subele3.innerText = `Rs. ${data.find((item) => item.name === val)?.price ?? "N/A"}`;
  subele3.className =
    "col-span-1  col-start-6  font-bold text-red-600 text-center";

  mainele.append(subele1, subele2, subele3);

  addToCart.appendChild(mainele);

  let bill = data.find((item) => item.name === val)?.price ?? 0;

  return totalBill(bill);
}

// remove from cart

function subFromCart(value) {
  let remove_ele = document.getElementById(`${value}`);
  addToCart.removeChild(remove_ele);
  num--;
  let removeBill = data.find((item) => item.name === value)?.price ?? 0;
  totalBillAmt -= removeBill;
  total.innerText = `Rs. ${totalBillAmt}`;
}

allservices.addEventListener("click", (e) => {
  let val = e.target.value;
  let obj = data.find((item) => item.name === val);
  let decide = obj.times;

  if (decide == 0) {
    obj.times++;
    e.target.innerText = "Remove";
    e.target.className =
      "btn-primery bg-red-500 max-md:w-full hover:bg-red-800";
    return cartItemCreator(val);
  } else {
    obj.times = 0;
    e.target.innerText = "Add To Cart";
    e.target.className =
      "btn-primery  bg-pink-600 hover:bg-pink-800 max-md:w-full";
    return subFromCart(val);
  }
});

let btn_book = 0;

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input_booking__name =
    document.getElementById("input-booking-name").value;
  const input_booking__email = document.getElementById(
    "input-booking-email",
  ).value;
  const input_booking__phn = document.getElementById("input-booking-phn").value;

  if (btn_book == 0) {
    alert(`Booking Confirmed!! Thanks ${input_booking__name}`);
    btn_book++;
    addToCart.replaceChildren();
    document.getElementById("billing-amt").innerText = "Rs.0";
  } else {
    alert("You have already Booked!!!");
    return;
  }

  let bookingbtn = document.getElementById("booked-btn");
  bookingbtn.className =
    " bg-pink-900  mx-auto mt-2 max-md:w-[95%] text-white font-bold py-2 px-4 rounded-full scale-90";
  bookingbtn.innerText = "Booked";

  bookingForm.reset();
});
