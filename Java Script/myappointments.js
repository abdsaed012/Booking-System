
const appointmentsContainer = document.querySelector('.appointments-list');


let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

if (appointments.length === 0) {
  
    appointmentsContainer.innerHTML = "<p>You have no appointments booked yet.</p>";
} else {
    
    const appointmentsHtml = appointments.map((appointment) => {
        return `
            <div class="appointment-card" data-id="${appointment.id}">
        <!-- Left: Doctor Info -->
        <div class="doctor-section">
          <img src="${appointment.doctorPhoto}" alt="${appointment.doctor}">
          <div class="appointment-details">
            <h4>${appointment.doctor}</h4>
            <p>Specialization: ${appointment.doctorSpecialization}</p>
            
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
            <button class="cancel-appointment" data-id="${appointment.id}">Cancel Appointment</button>
          </div>
        </div>

        <!-- Right: Patient Info -->
        <div class="patient-section">
          <h3>Patient Info</h3>
          <p><strong>Patient:</strong> ${appointment.patientName}</p>
          <p><strong>Contact:</strong> ${appointment.contact}</p>
          <p><strong>Age:</strong> ${appointment.age}</p>
          <p><strong>Gender:</strong> ${appointment.gender}</p>
        </div>
      </div>
        `;
    }).join('');

    
    appointmentsContainer.innerHTML = appointmentsHtml;

    // event listener to cancel button
    const cancelButtons = document.querySelectorAll('.cancel-appointment');
    cancelButtons.forEach(button => {
        button.addEventListener('click', cancelAppointment);
    });
}

// Function to cancel the appointment
function cancelAppointment(event) {
    const appointmentId = event.target.dataset.id;  
    // console.log(appointmentId)
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
 
    const updatedAppointments = appointments.filter(appointment => appointment.id != appointmentId);

   
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    
    window.location.reload();
}


// Responsive Navbar Toggle
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("show");
});