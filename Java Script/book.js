// ----- DOM elements
const doctorInfoSection = document.querySelector("#disableSection");
const doctorImage = document.getElementById("doctor-image");
const doctorName = document.getElementById("doctor-name");
const doctorSpecialization = document.getElementById("doctor-specialization");
const doctorExperience = document.getElementById("doctor-experience");
const doctorSelect = document.getElementById("doctor-select");
const confirmBooking = document.getElementById("confirm-booking")
const appointmentDate = document.getElementById('appointment-date');
const appointmentTime = document.getElementById('appointment-time');
const patientName = document.getElementById('patient-name');
const contact = document.getElementById('contact');
const age = document.getElementById('age');
const gender = document.getElementById('gender');


const preselectedDoctor = JSON.parse(localStorage.getItem("filteredDoc") || "null");


let allDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");


(async function init() {
  if (allDoctors.length === 0) {
    try {
      
      const res = await fetch("doctors.json");
      allDoctors = await res.json();
      // console.log(allDoctors)
      localStorage.setItem("doctors", JSON.stringify(allDoctors));
    } catch (e) {
      console.error("Failed to load doctors.json", e);
      return;
    }
  }

  populateSelect(allDoctors);


  if (preselectedDoctor) {

    doctorSelect.value = String(preselectedDoctor.id);
    renderDoctor(preselectedDoctor);
  } else {
    
    doctorInfoSection.style.display = "none";
  }

 
  doctorSelect.addEventListener("change", () => {
    const selected = allDoctors.find(d => String(d.id) === doctorSelect.value);
    // console.log()
    if (!selected) return;
    renderDoctor(selected);
    localStorage.setItem("filteredDoc", JSON.stringify(selected));
  });
})();


function populateSelect(doctors) {
 
  doctorSelect.querySelectorAll("option:not([disabled])").forEach(o => o.remove());
  doctors.forEach(d => {
    const opt = document.createElement("option");
    opt.value = String(d.id);
    opt.textContent = d.name;
    doctorSelect.appendChild(opt);
  });
}

function renderDoctor(d) {
  doctorInfoSection.style.display = "block";
  doctorName.textContent = d.name || "Dr. Unknown";
  doctorSpecialization.textContent = `Specialization: ${d.specialization || "Not Set"}`;
  doctorExperience.textContent = `Experience: ${d.experience || "Not Set"}`;
  doctorImage.src = d.photo || "";
  doctorImage.onerror = () => (doctorImage.src = "images/default.jpg");
}

// confirmBooking.addEventListener('submit', function(e) {
//     e.preventDefault();
//     console.log("clicked")
// })

// Handle the Confirm Booking button click event
confirmBooking.addEventListener('click', function(e) {
        e.preventDefault();
    //  console.log("clicked")
    
    if (!doctorSelect.value || !appointmentDate.value || !appointmentTime .value || !patientName.value || !contact.value || !age.value || !gender.value) {
        alert("Please fill in all the fields!");
        return;
    }


    const selectedDoctor = JSON.parse(localStorage.getItem('filteredDoc')) || null; 
    if (!selectedDoctor) {
        alert("No doctor selected.");
        return;
    }

    //  appointment object,xogta appointmentiga kushubanaya si aan local stroge ugeeyo
    const appointment = {
        doctor: selectedDoctor.name,
        doctorPhoto: selectedDoctor.photo,
        doctorSpecialization: selectedDoctor.specialization,
        date: appointmentDate.value,
        time: appointmentTime.value,
        patientName: patientName.value,
        contact: contact.value,
        age: age.value,
        gender: gender.value,
        status: "Scheduled",
        id : new Date().getTime()
         
    };

    // console.log(appointment)

    // Saving the appointment to localStorage 
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

   
    alert("Your appointment has been successfully booked!");

    
    window.location.href = "/Html/appointments.html"; 
});


// Responsive Navbar Toggle
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("show");
});