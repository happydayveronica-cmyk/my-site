const schoolList = document.getElementById("schoolList");

function render(){

    schoolList.innerHTML="";

    schools.forEach(school=>{

        let html=`
        <div class="school">

            <h1>${school.name}</h1>
            <p>${school.subtitle}</p>

            <div class="grid">
        `;

        school.sections.forEach(section=>{

            html+=`
            <div class="card">

                <div class="cardHeader">

                    <h2>${section.title}</h2>

                    <span>${section.tag}</span>

                </div>

                <ul>
            `;

            section.items.forEach(item=>{
                html+=`<li>${item}</li>`;
            });

            html+=`
                </ul>

            </div>
            `;
        });

        html+=`
            </div>

        </div>
        `;

        schoolList.innerHTML+=html;

    });

}

render();
