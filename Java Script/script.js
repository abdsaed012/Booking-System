const doctorList = document.querySelector('.doctor-list');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
let allDoctors = [];
let selectedDoc = [];

fetchDoctorInfo();

async function fetchDoctorInfo() {
    try {
        const response = await fetch('doctors.json');
        const data = await response.json();
        allDoctors = data;
        showDocInfo(allDoctors);
        localStorage.setItem('doctors', JSON.stringify(allDoctors));
    } catch (error) {
        console.error(error);
    }
}

function showDocInfo(doctors) {
    selectedDoc = doctors;
    const docInfo = doctors.map(doc => {
        return ` 
        <div class="doctor-card">
            <img src="${doc.photo}" alt="${doc.name}" onerror="this.src='images/default.jpg'">
            <h3>${doc.name}</h3>
            <p>Specialization: ${doc.specialization}</p>
            <p>Experience: ${doc.experience}</p>
            <button class="bookDoctor" data-name="${doc.name}" data-id="${doc.id}">Book Appointment</button>
        </div>`;
    });

    doctorList.innerHTML = docInfo.join('');
    doctorList.querySelectorAll(".bookDoctor").forEach((doc) => {
        doc.addEventListener('click', () => {
            const { id } = doc.dataset;
            let doctor = selectedDoc.find(doc => doc.id == id);
            localStorage.setItem('filteredDoc', JSON.stringify(doctor));
            window.location.href = "../Html/book.html";
        });
    });
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const queryData = JSON.parse(localStorage.getItem('query')) || [];
    queryData.push(query);
    localStorage.setItem('query', JSON.stringify(queryData));
    filterDoc(query);
});

function filterDoc(query) {
    if (!query) {
        showDocInfo(allDoctors);
        return;
    }

    const tokens = query.split(/\s+/);
    const filteredDoc = allDoctors.filter(doc => {
        const name = doc.name.toLowerCase();
        const spec = doc.specialization.toLowerCase();
        const exp = doc.experience.toLowerCase();
        return tokens.every(token =>
            name.includes(token) || spec.includes(token) || exp.includes(token)
        );
    });

    showDocInfo(filteredDoc);

    if (filteredDoc.length === 0) {
        const notFound = document.querySelector("#not-found");
        notFound.innerHTML = `No doctors found matching ${query}`;
        showDocInfo(allDoctors);
    }
}

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("show");
});
