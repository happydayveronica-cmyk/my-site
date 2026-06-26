const schoolList = document.getElementById("schoolList");
const schoolButtons = document.getElementById("schoolButtons");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

let selectedSchool = "전체";
let searchText = "";

function getSchoolText(school) {
  return [
    school.name,
    school.subtitle || "",
    ...school.sections.flatMap(section => [
      section.title,
      section.tag,
      ...section.items
    ])
  ].join(" ").toLowerCase();
}

function renderButtons() {
  if (!schoolButtons) return;

  schoolButtons.innerHTML = "";

  const names = [
    "전체",
    ...schools
      .map(school => school.name)
      .filter(name => name && name.trim() !== "")
  ];

  names.forEach(name => {
    const button = document.createElement("button");
    button.textContent = name;

    if (selectedSchool === name) {
      button.classList.add("active");
    }

    button.onclick = () => {
      selectedSchool = name;
      render();
    };

    schoolButtons.appendChild(button);
  });
}

function render() {
  renderButtons();
  schoolList.innerHTML = "";

  const keyword = searchText.trim().toLowerCase();

  const visibleSchools = schools
    .filter(school => school.name)
    .filter(school => {
      const matchSchool =
        selectedSchool === "전체" || school.name === selectedSchool;

      const matchKeyword =
        keyword === "" || getSchoolText(school).includes(keyword);

      return matchSchool && matchKeyword;
    });

  if (visibleSchools.length === 0) {
    schoolList.innerHTML = `
      <div class="empty-result">
        검색 결과가 없습니다.
      </div>
    `;
    return;
  }

  visibleSchools.forEach(school => {
    const sectionHtml = school.sections.map(section => `
      <article class="card">
        <div class="cardHeader">
          <h2>${section.title}</h2>
          <span>${section.tag}</span>
        </div>

        <ul>
          ${section.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    `).join("");

    schoolList.innerHTML += `
      <section class="school">
        <div class="school-title">
          <h1>${school.name}</h1>
          <p>${school.subtitle || ""}</p>
        </div>

        <div class="grid">
          ${sectionHtml}
        </div>
      </section>
    `;
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchText = searchInput.value;
    render();
  });
}

if (clearSearch) {
  clearSearch.addEventListener("click", () => {
    searchText = "";
    searchInput.value = "";
    render();
  });
}

render();
