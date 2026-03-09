const allIssues = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issuesContainer = document.getElementById("issues-container");
const totalCount = document.getElementById("total-count");
const loadingSpinner = document.getElementById("loading-spinner");

let allData = [];

// spinner manage function
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  issuesContainer.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// load data
async function loadIssues() {
  showLoading();
  const res = await fetch(allIssues);
  const data = await res.json();
  console.log(data.data);
  allData = data.data;

  hideLoading();
  displayIssues(allData);
}

// Function to filter data by status:
async function filterIssues(status, event) {
  showLoading();
  setTimeout(() => {
    if (status === "all") {
      displayIssues(allData);
    } else {
      const filterData = allData.filter(function (issue) {
        return issue.status === status;
      });
      displayIssues(filterData);
    }
    hideLoading();
  }, 100);

  // button toggle color
  const button = document.querySelectorAll(".filter-btn");
  button.forEach(function (btn) {
    btn.classList.remove("bg-blue-600", "text-white", "bg-indigo-600");
    btn.classList.add("bg-gray-200", "text-gray-700");
  });
  const clickedButton = event.currentTarget;
  clickedButton.classList.remove("bg-gray-200", "text-gray-700");
  clickedButton.classList.add("bg-blue-600", "text-white");
}

// showing data in UI:
function displayIssues(issues) {
  totalCount.innerText = issues.length;
  issuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");

    card.setAttribute("onclick", `loadSingleIssue('${issue.id}')`);
    // image logic:
    let statusImage = "";
    if (issue.status === "open") {
      statusImage = "./assets/Open-Status.png";
    } else {
      statusImage = "./assets/Closed- Status .png";
    }

    // border color logic:
    let topBorderColor = ""; //
    if (issue.status === "open") {
      topBorderColor = "border-t-emerald-500";
    } else if (issue.status === "closed") {
      topBorderColor = "border-t-purple-400";
    }

    // badge color:
    let badgeTextColor = "text-gray-500";
    if (issue.priority === "high") {
      badgeTextColor = "text-red-400";
    } else if (issue.priority === "medium") {
      badgeTextColor = "text-yellow-400";
    }

    // Assign logic:
    let issueAssignee = "";
    if (issue.assignee) {
      issueAssignee = issue.assignee;
    } else {
      issueAssignee = "Unassigned";
    }
    card.className = `card bg-white shadow-sm border border-gray-200 border-t-4 ${topBorderColor} p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-all`;

    card.innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <img src="${statusImage}" alt="${issue.status}" class="w-5 h-5">
        </div>
        <div class="badge badge-sm bg-white border-gray-200 text-[10px] px-2 py-2 font-bold lowercase italic ${badgeTextColor}">
           ${issue.priority}
        </div>
        
      </div>
      
      <div>
        <h2 class="text-slate-900 font-bold text-base mb-2 hover:text-blue-600 cursor-pointer transition-colors">${issue.title}</h2>
        <p class="text-gray-500 text-xs line-clamp-2">${issue.description}</p>
      </div>
      <div class="flex flex-wrap gap-2 mb-2">
        ${issue.labels.map((label) => `<span class="px-2 py-0.5 bg-yellow-400 text-[9px] font-black rounded uppercase">${label}</span>`).join("")}
      </div>
      <div class="border-t border-gray-100 pt-3 mt-auto text-[11px] text-gray-400">
          <div class="flex justify-between mb-1">
            <p>#${issue.id} by <span class="text-gray-600 font-medium">${issue.author}</span></p>
            <p>${issue.createdAt.split("T")[0]}</p>
          </div>
          <div class="flex justify-between">
            <p>Assignee: <span class="text-gray-600">${issueAssignee}</span></p>
            <p>Updated: ${issue.updatedAt.split("T")[0]}</p>
          </div>
      </div>
    `;

    issuesContainer.appendChild(card);
  });
}
loadIssues();

// Search options
const handleSearch = async () => {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim();
  if (searchText.length > 0) {
    showLoading();
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
    );
    const data = await res.json();
    console.log("Search Result:", data.data);
    displayIssues(data.data);
    hideLoading();
  } else if (searchText.length === 0) {
    displayIssues(allData);
  }
};
// input field event listener(keyup & Enter):
const searchInputField = document.getElementById("searchInput");
searchInputField.addEventListener("keyup", (event) => {
  if (event.target.value.length > 2 || event.key === "Enter") {
    handleSearch();
  }
});

// load single issue details in modal:
const loadSingleIssue = async (issueId) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const result = await res.json();
  const issue = result.data;

  // title description & set author
  document.getElementById("modalTitle").textContent = issue.title;
  document.getElementById("modalDescription").textContent = issue.description;
  document.getElementById("modalAuthor").textContent = issue.author;
  document.getElementById("modalAssignee").textContent =
    issue.assignee || "Unassigned";
  //date
  const dateObj = new Date(issue.createdAt);
  document.getElementById("modalDate").textContent =
    dateObj.toLocaleDateString();

  // status & labels
  const statusEl = document.getElementById("modalStatus");
  statusEl.textContent = issue.status[0].toUpperCase() + issue.status.slice(1);

  const labelContainer = document.getElementById("modalLabels");
  labelContainer.innerHTML = issue.labels
    .map(
      (label) =>
        `<span class="px-3 py-1 bg-yellow-400 text-[10px] font-black rounded-md uppercase text-black italic">${label}</span>`,
    )
    .join("");

  const priorityEl = document.getElementById("modalPriority");
  priorityEl.textContent = issue.priority.toUpperCase();
  priorityEl.className = `px-4 py-1.5 rounded-full text-white font-black text-xs uppercase shadow-sm ${issue.priority === "high" ? "bg-red-500 shadow-red-200" : "bg-yellow-500 shadow-yellow-200"}`;

  my_modal_5.showModal();
};
window.loadSingleIssue = loadSingleIssue;
