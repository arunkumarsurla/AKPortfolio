const sections = document.querySelectorAll("section");
const nava = document.querySelectorAll("nav .collapse div a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      // console.log(scrollY)
      current = section.getAttribute("id");
    }
  });

  nava.forEach((a) => {
    a.classList.remove("active");
    if (a.classList.contains(current)) {
      a.classList.add("active");
    }
  });
});

// ------------
// Form
// ------------

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

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = `${e.pageX}px`; // Adjust the x position
  cursor.style.top = `${e.pageY}px`; // Adjust the y position
});

window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

// Function to hide the loading message
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

const API_URL =
  "https://668d0469099db4c579f16037.mockapi.io/api/data/projectData";

const fetchApi = async () => {
  showLoading();
  try {
    const response = await fetch(API_URL);
    const jsonData = await response.json();
    displayData(jsonData);
  } catch (error) {
    console.log(error);
  }
};

fetchApi();

function displayData(projectsData) {
  const projectsDataDiv = document.getElementById("projectsData");

  let htmlString = "";

  projectsData.forEach((project) => {
    htmlString += `
         <div class="col-12 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
    <div class="project-section shadow p-3 mb-3">
        <img src="${project.projectImg}" alt="${project.projectName}" class="project-image w-100" />
        <h1 class="project-title">${project.projectName}</h1>
        <div class="d-flex justify-content-between">
            <a href="${project.projectUrl}" class="project-link" target="_blank">
                                View Project
                                <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-arrow-right-short"
                                    fill="#ff4533" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                </svg>
                            </a>
            <img src="${project.logoPng}" class="project-logo" alt="${project.Name}">
        </div>
    </div>
</div>
`;
  });

  projectsDataDiv.innerHTML = htmlString;
}

// async function getData() {
//   const url = "";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// }




const fetchSkillsData = async () =>{
  showLoading();
  const skillsResponse  = await fetch('./skills.json');
  const jsonSkillsData =  await skillsResponse.json();
  console.log(jsonSkillsData)
  displaySkillsData(jsonSkillsData);
}

fetchSkillsData();

function displaySkillsData(skillsData) {
  const skillsDataDiv = document.getElementById("skillDataContainer");

  let htmlString = "";

  skillsData.forEach((skills) => {
    htmlString += `
      <div class="skill-bar mt-2">
          <div class="info">
          <i class="${skills.icon}"></i>
              <p>${skills.name}</p>
              <P>${skills.percentage}</P>
          </div>
          <div class="bar">
              <span class="${skills.className}"></span>
          </div>
      </div>
`;
  });
  skillsDataDiv.innerHTML = htmlString;
}