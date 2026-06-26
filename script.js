const schoolList = document.getElementById("schoolList");
const schoolButtons = document.getElementById("schoolButtons");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

let selectedSchool = "전체";
let searchText = "";

function getSchoolText(school) {
  return [
    school.name || "",
    school.subtitle || "",
    ...school.sections.flatMap(section => [
      section.title || "",
      section.tag || "",
      ...section.items
    ])
  ].join(" ").toLowerCase();
}

function highlightText(text, keyword) {
  if (!keyword) return text;

  const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${safeKeyword})`, "gi");

  return text.replace(regex, `<mark class="highlight">$1</mark>`);
}

function renderButtons() {
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
      const schoolMatch =
        selectedSchool === "전체" || school.name === selectedSchool;

      const keywordMatch =
        keyword === "" || getSchoolText(school).includes(keyword);

      return schoolMatch && keywordMatch;
    });

  if (visibleSchools.length === 0) {
    schoolList.innerHTML = `<div class="empty-result">검색 결과가 없습니다.</div>`;
    return;
  }

  visibleSchools.forEach(school => {
    const sectionHtml = school.sections.map(section => {
      const sectionText = [
        section.title || "",
        section.tag || "",
        ...section.items
      ].join(" ").toLowerCase();

      const sectionMatched =
        keyword !== "" && sectionText.includes(keyword);

      return `
        <article class="card ${sectionMatched ? "matched-card" : ""}">
          <div class="cardHeader">
            <h2>${highlightText(section.title, keyword)}</h2>
            <span>${highlightText(section.tag, keyword)}</span>
          </div>

          <ul>
            ${section.items.map(item => {
              const itemMatched =
                keyword !== "" && item.toLowerCase().includes(keyword);

              return `
                <li class="${itemMatched ? "matched-row" : ""}">
                  ${highlightText(item, keyword)}
                </li>
              `;
            }).join("")}
          </ul>
        </article>
      `;
    }).join("");

    schoolList.innerHTML += `
      <section class="school">
        <div class="school-title">
          <h1>${highlightText(school.name, keyword)}</h1>
          <p>${highlightText(school.subtitle || "", keyword)}</p>
        </div>

        <div class="grid">
          ${sectionHtml}
        </div>
      </section>
    `;
  });
}

searchInput.addEventListener("input", () => {
  searchText = searchInput.value;
  render();
});

clearSearch.addEventListener("click", () => {
  searchText = "";
  searchInput.value = "";
  render();
});

render();
