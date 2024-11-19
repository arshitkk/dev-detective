let search = document.querySelector(".search");
let inputBar = document.querySelector(".input-bar");
let infoContainer = document.querySelector(".info-container");
let user = "arshitkk";
const token = YOUR_TOKEN;
inputBar.addEventListener("submit", (e) => {
  infoContainer.style.scale = "0";
  e.preventDefault();
  user = search.value;
  fetchData(user);
});

if (search.value == "") {
  fetchData(user);
  infoContainer.style.scale = "1";
}
async function fetchData(user) {
  let response = await fetch(`https://api.github.com/users/${user}`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  });
  let data = await response.json();
  console.log(data);
  if (data.message === "Not Found") {
    infoContainer.style.scale = "1";
    infoContainer.style.setProperty("--pseudo-d", "flex");
  } else {
    renderInfo(data);
  }
}

function renderInfo(data) {
  const name = document.querySelector(".name");
  const pfp = document.querySelector(".pfp");
  const bio = document.querySelector(".bio");
  const username = document.querySelector(".username");
  const joinedDate = document.querySelector(".joined-date");
  const repoCnt = document.querySelector("#repo-cnt");
  const followerCnt = document.querySelector("#follower-cnt");
  const followingCnt = document.querySelector("#following-cnt");
  const locationName = document.querySelector(".location-name");
  const location = document.querySelector(".location");
  const websiteN = document.querySelector(".website-name");
  const website = document.querySelector(".website");
  const xLink = document.querySelector(".x-link");
  const x = document.querySelector(".x");
  const companyName = document.querySelector(".company-name");
  const company = document.querySelector(".company");

  name.innerText = data.name;
  username.innerText = `@${data.login}`;
  username.href = data.html_url;
  pfp.src = data.avatar_url;

  if (data.bio == null) bio.innerText = "This user has no Bio";
  else bio.innerText = data.bio;

  repoCnt.innerHTML = data.public_repos;
  followerCnt.innerText = data.followers;
  followingCnt.innerText = data.following;

  if (data.location) {
    locationName.innerText = data.location;
    location.style.opacity = "1";
  }
  if (data.blog) {
    xLink.innerText = data.twitter_username;
    xLink.href = `https://x.com/${xLink.innerText}`;
    x.style.opacity = "1";
  }
  if (data.company) {
    companyName.textContent = data.company;
    company.style.opacity = "1";
  }

  if (data.blog) {
    websiteN.innerText = data.blog;
    websiteN.href = `https://${websiteN.innerText}`;
    website.style.opacity = "1";
  }
  infoContainer.style.scale = "1";
}

// mode
let mode = document.querySelector(".mode");
let modeName = document.querySelector(".mode-name");
let icon = document.querySelector(".icon");
let darkMode = true;
const root = document.documentElement.style;


mode.addEventListener("click", () => {
  if (modeName.innerText == "DARK") {
    modeName.innerText = "LIGHT";
    icon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    root.setProperty("--text", "white");
    root.setProperty("--wrapperC", "#141d2f");
    root.setProperty("--searchC", "#1e2a47");
    root.setProperty("--lm-shadow-xl", "transparent");
  } else {
    modeName.innerText = "DARK";
    icon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    root.setProperty("--text", "black");
    root.setProperty("--wrapperC", "rgb(224, 227, 246)");
    root.setProperty("--searchC", "white");
    root.setProperty("--lm-shadow-xl", "rgba(0, 0, 255, 0.396)");
  }
});
