const schoolList = document.getElementById("schoolList");

function render() {
  schoolList.innerHTML = "";

  schools.forEach((school) => {
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
