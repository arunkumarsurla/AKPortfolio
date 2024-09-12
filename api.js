let currentPage = 1;
const itemsPerPage = 8;
let totalPages = 1;

const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const pageNumbers = document.getElementById('page-numbers');
// const jsonPath = 'https://668d0469099db4c579f16037.mockapi.io/api/data/projectData';
const jsonPath = './projectsData.json'

let allProjectsData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    fetchSkillsData();
});



async function fetchProjects() {
    showLoading();
    try {
        const response = await fetch(jsonPath);
        const projects = await response.json();
        allProjectsData = projects;
        totalPages = Math.ceil(allProjectsData.length / itemsPerPage);
        updatePagination();
        displayProjects(getCurrentPageProjects());
    } catch (error) {
        console.log(error);
    }
    hideLoading();
}

function getCurrentPageProjects() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    console.log("startIndex: ", startIndex )
    const endIndex = startIndex + itemsPerPage;
    console.log("endIndex: ", endIndex )

    const currentPageProjects = allProjectsData.slice(startIndex, endIndex);
    return currentPageProjects;
}

function displayProjects(projects) {
    const projectsData = document.getElementById('projectsData');
    let htmlData = "";
    projectsData.innerHTML = "";
    if (projects.length === 0) {
        document.getElementById('noProjectsMessage').style.display = 'block';    
    
    } else {
        document.getElementById('noProjectsMessage').style.display = 'none';
        document.getElementById('paginationContainer').style.display = 'block';

        projects.forEach((project) => {
            htmlData += `
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
        projectsData.innerHTML = htmlData;
    }
}

function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    updatePagination();
    displayProjects(getCurrentPageProjects());
}

function updatePagination() {
    pageNumbers.innerHTML = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}



function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

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