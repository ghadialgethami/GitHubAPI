# GitHub Repository Explorer

## 📌 Project Description
This is a web application that allows users to search for any GitHub username and display their public repositories dynamically.

The application uses the GitHub Users API to fetch repository data and updates the page without refreshing using JavaScript (AJAX).

---

## 🚀 Features
- Search GitHub users by username
- Display repository details dynamically
- View:
  - Repository name
  - Description
  - Programming language
  - Stars
  - Forks
  - Creation date
- Clear results button
- Dark mode toggle
- Loading spinner
- Error handling (invalid user, empty input, API errors)
- Double-click to remove repository cards

---

## 🔗 API Used
GitHub Users API

Endpoint:
https://api.github.com/users/{username}/repos


Example:
https://api.github.com/users/ghadialgethami/repos

---

## 🛠️ Technologies Used
- HTML
- CSS
- JavaScript (Fetch API / AJAX)
- GitHub REST API

---

## ⚙️ How It Works
1. The user enters a GitHub username
2. A request is sent to the GitHub API
3. The data is received asynchronously
4. The DOM is updated dynamically to display repositories
