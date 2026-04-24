const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");
const message = document.getElementById("message");
const loader = document.getElementById("loader");
const repoContainer = document.getElementById("repoContainer");
const summary = document.getElementById("summary");

// Your unique API endpoint:
// https://api.github.com/users/ghadialgethami/repos

function showMessage(text, type) {
  message.textContent = text;

  if (type === "success") {
    message.style.color = "#16a34a";
  } else if (type === "error") {
    message.style.color = "#dc2626";
  } else {
    message.style.color = "#4f46e5";
  }
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function clearResults() {
  repoContainer.innerHTML = "";
  summary.innerHTML = "";
  summary.style.display = "none";
}

async function fetchRepositories() {
  const username = usernameInput.value.trim();

  clearResults();

  if (username === "") {
    showMessage("Please enter a GitHub username.", "error");
    return;
  }

  showMessage("Fetching repositories...", "info");
  showLoader();

  try {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(apiUrl);

    if (response.status === 404) {
      throw new Error("User not found. Please enter a valid GitHub username.");
    }

    if (response.status === 403) {
      throw new Error("API limit reached. Please try again later.");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch repository data.");
    }

    const repos = await response.json();

    if (repos.length === 0) {
      showMessage("This user has no public repositories.", "error");
      return;
    }

    displaySummary(username, repos);
    displayRepositories(repos);
    showMessage("Repositories loaded successfully.", "success");

  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    hideLoader();
  }
}

function displaySummary(username, repos) {
  const totalStars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
  const totalForks = repos.reduce((total, repo) => total + repo.forks_count, 0);

  summary.style.display = "block";

  summary.innerHTML = `
    <h2>👤 ${username}'s Repository Summary</h2>
    <p><strong>Total repositories:</strong> ${repos.length}</p>
    <p><strong>Total stars:</strong> ${totalStars}</p>
    <p><strong>Total forks:</strong> ${totalForks}</p>
  `;
}

function displayRepositories(repos) {
  repos.forEach(function(repo) {
    const card = document.createElement("article");
    card.className = "repo-card";

    card.innerHTML = `
      <div class="repo-icon">📁</div>
      <h3>${repo.name}</h3>
      <p><strong>📝 Description:</strong> ${repo.description || "No description available"}</p>
      <p><strong>💻 Language:</strong> ${repo.language || "Not specified"}</p>
      <p><strong>⭐ Stars:</strong> ${repo.stargazers_count}</p>
      <p><strong>🍴 Forks:</strong> ${repo.forks_count}</p>
      <p><strong>📅 Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
      <a href="${repo.html_url}" target="_blank">View Repository</a>
    `;

    // Event 3: double click
    card.addEventListener("dblclick", function() {
      card.remove();
      showMessage("Repository card removed.", "info");

      if (repoContainer.children.length === 0) {
        clearResults();
        showMessage("All cards have been removed.", "info");
      }
    });

    repoContainer.appendChild(card);
  });
}

// Event 1: click
searchBtn.addEventListener("click", fetchRepositories);

// Event 2: keyup
usernameInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    fetchRepositories();
  }
});

// Clear button removes all created DOM elements
clearBtn.addEventListener("click", function() {
  usernameInput.value = "";
  clearResults();
  showMessage("Data cleared successfully.", "info");
});

// Dark theme toggle
themeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    themeBtn.textContent = "🌙 Dark Mode";
  }
});
