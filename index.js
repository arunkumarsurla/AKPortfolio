const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav .collapse div a");

window.addEventListener("scroll", () => {
  let currentId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.classList.contains(currentId));
  });
});



const form = document.getElementById("myForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phonenumber");
const msg = document.getElementById("message");
var isformValid;
var inputs = [fullname, email, phone, msg];
let shouldValidate = false;

function validate() {
  let fullnameValue = fullname.value.trim();
  let emailValue = email.value.trim();
  let phonenumberValue = phone.value.trim();
  let msgValue = msg.value.trim();

  if (!shouldValidate) return;

  //User name check

  if (fullnameValue === "") {
    setError(fullname, "Full name cannot be empty");
  } else if (fullnameValue.length < 3) {
    setError(fullname, "Full name should be minimum 3 characters");
  } else {
    setSuccesss(fullname);
  }
  //email check
  if (emailValue === "") {
    setError(email, "Email cannot be empty");
  } else if (!emailCheck(emailValue)) {
    setError(email, "Enter Valid Email address");
  } else {
    setSuccesss(email);
  }

  //phonenumber check

  if (phonenumberValue === "") {
    setError(phone, "phone Number cannot be empty");
  } else if (!phoneCheck(phonenumberValue)) {
    setError(phone, "Phone number should be 10-digit number");
  } else {
    setSuccesss(phone);
  }

  //Messsage check

  if (msgValue === "") {
    setError(msg, "Message cannot be empty");
  } else if (msgValue.length < 6) {
    setError(msg, "Message should be minimum 6 characters");
  } else {
    setSuccesss(msg);
  }

  function setError(input, message) {
    isformValid = false;
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    small.innerText = message;
    parent.classList.add("error");
    parent.classList.remove("success");
  }
  function setSuccesss(input) {
    isformValid = true;
    let parent = input.parentElement;
    parent.classList.add("success");
    parent.classList.remove("error");
  }

  function emailCheck(input) {
    let emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let valid = emailReg.test(input);
    return valid;
  }

  function phoneCheck(input) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(input).toLowerCase());
  }

  console.log(isformValid);
  return isformValid;
}

const reset = (inputs) => {
  inputs.forEach((i) => {
    i.value = "";
    let parent = i.parentElement;
    parent.classList.remove("success");
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shouldValidate = true;
  const valid = validate();
  if (valid) {
    form.submit();
    reset(inputs);
  }
});

inputs.forEach((input) => input.addEventListener("input", validate));

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const year = document.getElementById("year").textContent = new Date().getFullYear();

  preloader.style.display = "none"; 
});
