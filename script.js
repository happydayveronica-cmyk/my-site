const schoolList = document.getElementById("schoolList");
const schoolButtons = document.getElementById("schoolButtons");

let selectedSchool = "전체";

function renderButtons() {
  if (!schoolButtons) {
    alert("index.html에 schoolButtons 영역이 없습니다.");
    return;
  }

  schoolButtons.innerHTML = "";

  const names = ["전체", ...schools.map(school => school.name)];

  names.forEach(name => {
    const button = document.createElement("button");
    button.textContent = name;

    if (selectedSchool === name) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectedSchool = name;
      render();
    });

    schoolButtons.appendChild(button);
  });
}

function render() {
  renderButtons();

  schoolList.innerHTML = "";

  const visibleSchools =
    selectedSchool === "전체"
      ? schools
      : schools.filter(school => school.name === selectedSchool);

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

render();
