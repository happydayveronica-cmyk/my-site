const schoolList = document.getElementById("schoolList");
const schoolButtons = document.getElementById("schoolButtons");

let selectedSchool = "전체";

function renderButtons() {
  schoolButtons.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.textContent = "전체";
  allButton.className = selectedSchool === "전체" ? "active" : "";
  allButton.onclick = () => {
    selectedSchool = "전체";
    render();
  };
  schoolButtons.appendChild(allButton);

  schools.forEach((school) => {
    const button = document.createElement("button");
    button.textContent = school.name;
    button.className = selectedSchool === school.name ? "active" : "";

    button.onclick = () => {
      selectedSchool = school.name;
      render();
    };

    schoolButtons.appendChild(button);
  });
}

function render() {
  renderButtons();
  schoolList.innerHTML = "";

  const visibleSchools =
    selectedSchool === "전체"
      ? schools
      : schools.filter((school) => school.name === selectedSchool);

  visibleSchools.forEach((school) => {
    let html = `
      <section class="school">
        <div class="school-title">
          <h1>${school.name}</h1>
          <p>${school.subtitle || ""}</p>
        </div>

        <div class="grid">
    `;

    school.sections.forEach((section) => {
      html += `
        <article class="card">
          <div class="cardHeader">
            <h2>${section.title}</h2>
            <span>${section.tag}</span>
          </div>

          <ul>
      `;

      section.items.forEach((item) => {
        html += `<li>${item}</li>`;
      });

      html += `
          </ul>
        </article>
      `;
    });

    html += `
        </div>
      </section>
    `;

    schoolList.innerHTML += html;
  });
}

render();
