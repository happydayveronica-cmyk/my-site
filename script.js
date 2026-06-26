const buttonColors = {
  "전체": "#374151",

  "고려대학교": "#8B1E3F",
  "포스텍": "#0B4EA2",
  "KAIST": "#005BAC",
  "한양대학교": "#0C4DA2",
  "중앙대학교": "#0055A5",
  "성균관대학교": "#004098",
  "서강대학교": "#8B2332",
  "경희대학교": "#8B1F41",
  "이화여자대학교": "#0F6A8D",
  "한국외국어대학교": "#006B5B",
  "건국대학교": "#2F7D32",
  "동국대학교": "#F57C00"
};

const schoolList = document.getElementById("schoolList");
const schoolButtons = document.getElementById("schoolButtons");

let selectedSchool = "전체";

function renderButtons() {
  if (!schoolButtons) return;

  schoolButtons.innerHTML = "";

  const names = ["전체", ...schools.map(school => school.name)];

  names.forEach(name => {
    const button = document.createElement("button");
    const color = buttonColors[name] || "#4F46E5";

    button.textContent = name;

    button.style.padding = "9px 18px";
    button.style.borderRadius = "999px";
    button.style.fontSize = "14px";
    button.style.fontWeight = "800";
    button.style.cursor = "pointer";
    button.style.transition = "all .2s ease";

    if (selectedSchool === name) {
      button.style.background = color;
      button.style.color = "#ffffff";
      button.style.border = `2px solid ${color}`;
      button.style.boxShadow = "0 6px 14px rgba(0,0,0,.18)";
      button.style.transform = "translateY(-2px)";
    } else {
      button.style.background = "#ffffff";
      button.style.color = color;
      button.style.border = `2px solid ${color}`;
      button.style.boxShadow = "none";
    }

    button.onmouseenter = () => {
      if (selectedSchool !== name) {
        button.style.background = color;
        button.style.color = "#ffffff";
      }
    };

    button.onmouseleave = () => {
      if (selectedSchool !== name) {
        button.style.background = "#ffffff";
        button.style.color = color;
      }
    };

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
