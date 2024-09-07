


// Function to show the loading message
function showLoading() {
    const loader = document.getElementById("loading");
    loader.style.display = "block";  // Shows the loader
    loader.classList.add('spinner'); // Adds the spinner class for the loader animation
}

// Function to hide the loading message
function hideLoading() {
    const loader = document.getElementById("loading");
    loader.style.display = "none";   // Hides the loader
    loader.classList.remove('spinner'); // Removes the spinner class to stop animation
}


function handleFormSubmit(event) {
    event.preventDefault(); 

    // Fetch form data
    const formData = getFormData();

    // Send the form data to the server
    insertProjectData(formData);
}

// Function to gather form data
function getFormData() {
    const projectName = document.getElementById("projectname").value;
    const projectUrl = document.getElementById("projecturl").value;
    const logoPng = document.getElementById("logourl").value;
    const projectImage = document.getElementById("projectimageurl").value;


    return {
        projectName: projectName,
        projectUrl: projectUrl,
        logoPng: logoPng,
        projectImg: projectImage
    };
}

// Function to send data via POST request

async function insertProjectData(formData) {
    showLoading();
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
     }
    await fetch("https://668d0469099db4c579f16037.mockapi.io/api/data/projectData", options)
    .then(response => response.json())
    .then(() => {
        const projectForm = document.getElementById("projectsForm");
        displayResponse("Project saved successfully!", "success");
        projectForm.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        displayResponse("Error saving project.", "error");
        formElement.reset();
    })
    .finally(() => {
        hideLoading();
    });
}

// Function to display success or error messages
function displayResponse(message, status) {
    const spanElement = document.getElementById("span");
    if (status === "success") {
        spanElement.style.color = "green";
    } else if (status === "error") {
        spanElement.style.color = "red";
    }
    spanElement.innerText = message;
}

// Attach form submit event listener to the form
const projectForm = document.getElementById("projectsForm");
projectForm.addEventListener('submit', handleFormSubmit);



 // Function to show the loading message
 function showLoading() {
    const loader = document.getElementById("skillsloader");
    loader.style.display = "block";  // Shows the loader
    loader.classList.add('spinner'); // Adds the spinner class for the loader animation
}

// Function to hide the loading message
function hideLoading() {
    const loader = document.getElementById("skillsloader");
    loader.style.display = "none";   // Hides the loader
    loader.classList.remove('spinner'); // Removes the spinner class to stop animation
}

function handleSkillsFormSubmit(event) {
    event.preventDefault(); 

    // Fetch form data
    const formSkillsData = getSkillsFormData();

    // Send the form data to the server
    insertSkillsFormData(formSkillsData);
}

// Function to gather form data
function getSkillsFormData() {
    const skillName = document.getElementById("skillname").value;
    const percentage = document.getElementById("percentage").value;
    const skillClassName = document.getElementById("skillclassname").value;
    const skillIcon = document.getElementById("skillicon").value;
    return {
        name: skillName,
        percentage: percentage,
        className: skillClassName,
        icon: skillIcon
    };
}

// Function to send data via POST request
function insertSkillsFormData(formSkillsData) {
    showLoading();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({formSkillsData})
    };
    fetch('http://localhost:3000/skills', options)
        .then(response => response.json())
        .then(() => {
            const skillsForm = document.getElementById("skillsForm");
            displayResponse("Skils Data saved successfully!", "success");
            skillsForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            displayResponse("Error saving skills data.", "error");
            skillsForm.reset();
        })
        .finally(() => {
            hideLoading();
        });
}

// Function to display success or error messages
function displayResponse(message, status) {
    const spanElement = document.getElementById("skilsspan");
    if (status === "success") {
        spanElement.style.color = "green";
    } else if (status === "error") {
        spanElement.style.color = "red";
    }
    spanElement.innerText = message;
}

// Attach form submit event listener to the form
const skillsForm = document.getElementById("skillsForm");
skillsForm.addEventListener('submit', handleSkillsFormSubmit);