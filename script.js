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

let cls = "";

if (keyword !== "") {
    cls = itemMatched ? "matched-row" : "dimmed";
}

return `
  <li class="${cls}">
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
const compareA = document.getElementById("compareA");
const compareB = document.getElementById("compareB");
const compareBtn = document.getElementById("compareBtn");
const closeCompareBtn = document.getElementById("closeCompareBtn");
const compareResult = document.getElementById("compareResult");

function initCompareSelects() {
  if (!compareA || !compareB) return;

  const options = schools
    .filter(school => school.name)
    .map(school => `<option value="${school.name}">${school.name}</option>`)
    .join("");

  compareA.innerHTML = options;
  compareB.innerHTML = options;

  if (schools.length > 1) {
    compareB.selectedIndex = 1;
  }
}

function getSectionItems(school, keyword) {
  const section = school.sections.find(sec =>
    sec.title.includes(keyword) || sec.tag.includes(keyword)
  );

  if (!section) return "<p>자료 없음</p>";

  return `
    <ul>
      ${section.items.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function renderCompare() {
  const schoolA = schools.find(s => s.name === compareA.value);
  const schoolB = schools.find(s => s.name === compareB.value);

  if (!schoolA || !schoolB) return;

  compareResult.innerHTML = `
    <div class="compare-table">
      <h2>${schoolA.name} vs ${schoolB.name}</h2>

      <div class="compare-row">
        <div class="compare-cell compare-label">학교</div>
        <div class="compare-cell"><strong>${schoolA.name}</strong></div>
        <div class="compare-cell"><strong>${schoolB.name}</strong></div>
      </div>

      <div class="compare-row">
        <div class="compare-cell compare-label">요약</div>
        <div class="compare-cell">${schoolA.subtitle || "요약 없음"}</div>
        <div class="compare-cell">${schoolB.subtitle || "요약 없음"}</div>
      </div>

      <div class="compare-row">
        <div class="compare-cell compare-label">학종</div>
        <div class="compare-cell">${getSectionItems(schoolA, "학종")}</div>
        <div class="compare-cell">${getSectionItems(schoolB, "학종")}</div>
      </div>

      <div class="compare-row">
        <div class="compare-cell compare-label">논술</div>
        <div class="compare-cell">${getSectionItems(schoolA, "논술")}</div>
        <div class="compare-cell">${getSectionItems(schoolB, "논술")}</div>
      </div>

      <div class="compare-row">
        <div class="compare-cell compare-label">정시</div>
        <div class="compare-cell">${getSectionItems(schoolA, "정시")}</div>
        <div class="compare-cell">${getSectionItems(schoolB, "정시")}</div>
      </div>

      <div class="compare-row">
        <div class="compare-cell compare-label">면접</div>
        <div class="compare-cell">${getSectionItems(schoolA, "면접")}</div>
        <div class="compare-cell">${getSectionItems(schoolB, "면접")}</div>
      </div>
    </div>
  `;

  compareResult.scrollIntoView({ behavior: "smooth" });
}

if (compareBtn) {
  compareBtn.addEventListener("click", renderCompare);
}

if (closeCompareBtn) {
  closeCompareBtn.addEventListener("click", () => {
    compareResult.innerHTML = "";
  });
}

initCompareSelects();
