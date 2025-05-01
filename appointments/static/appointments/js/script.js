// script.js

// --- Utility Functions ---
function getElement(selector) {
    return document.querySelector(selector);
}

function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}

// --- Login Page (login.html) ---
if (document.getElementById('loginForm')) {
    const loginForm = getElement('#loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = getElement('#email').value;
        const password = getElement('#password').value;

        // In a real application, you would send this data to a server for authentication.
        // For this example, we'll just log it to the console.
        console.log('Login attempt:', { email, password });

        // After successful login, you would typically redirect the user.
        window.location.href = 'appointments.html'; // Redirect to appointments page
    });
}

// --- Register Page (register.html) ---
if (document.getElementById('registerForm')) {
    const registerForm = getElement('#registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = getElement('#name').value;
        const email = getElement('#email').value;
        const password = getElement('#password').value;
        const confirmPassword = getElement('#confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // In a real application, you would send this data to a server to create a new account.
        // For this example, we'll just log it to the console.
        console.log('Registration attempt:', { name, email, password });

        // After successful registration, you would typically redirect the user.
        window.location.href = 'login.html'; // Redirect to login page
    });
}

// --- Appointments Page (appointments.html) ---
if (document.getElementById('appointment-list')) {
    const appointmentList = getElement('#appointment-list');
    let appointments = loadFromLocalStorage('appointments') || [];

    function renderAppointments(currentAppointments = appointments) {
        appointmentList.innerHTML = '<h2>Your Appointments</h2>';
        if (currentAppointments.length === 0) {
            appointmentList.innerHTML += '<p>No appointments found.</p>';
            return;
        }

        currentAppointments.forEach((appointment, index) => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.className = 'appointment-item';
            appointmentDiv.innerHTML = `
                <span><strong>${appointment.doctor}</strong></span>
                <span>Date & Time: ${new Date(appointment.date).toLocaleString()}</span>
                <span>Reason: ${appointment.reason}</span>
                <span class="status ${appointment.status.toLowerCase()}">${appointment.status}</span>
                <div class="actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            appointmentList.appendChild(appointmentDiv);
        });

        // Add event listeners to the newly created buttons
        getAllElements('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                window.location.href = `appointment-form.html?edit=${index}`;
            });
        });

        getAllElements('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                deleteAppointment(index);
            });
        });
    }

    function deleteAppointment(index) {
        if (confirm('Are you sure you want to delete this appointment?')) {
            appointments.splice(index, 1);
            saveToLocalStorage('appointments', appointments);
            renderAppointments();
        }
    }

    function applyFilters() {
        const searchDoctorInput = getElement('#search-doctor');
        const filterStatusSelect = getElement('#filter-status');
        const searchTerm = searchDoctorInput.value.toLowerCase();
        const filterStatus = filterStatusSelect.value;

        const filteredAppointments = appointments.filter(appointment => {
            const doctorMatch = appointment.doctor.toLowerCase().includes(searchTerm);
            const statusMatch = filterStatus === '' || appointment.status === filterStatus;
            return doctorMatch && statusMatch;
        });

        renderAppointments(filteredAppointments);
    }

    const filterButton = getElement('.search-filters button');
    if (filterButton) {
        filterButton.addEventListener('click', applyFilters);
    }

    renderAppointments(); // Initial rendering
}

// --- Appointment Form Page (appointment-form.html) ---
if (document.getElementById('addAppointmentForm')) {
    const addAppointmentForm = getElement('#addAppointmentForm');
    let appointments = loadFromLocalStorage('appointments') || [];
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');
    let editingIndex = -1;

    if (editIndex !== null) {
        editingIndex = parseInt(editIndex);
        const appointmentToEdit = appointments[editingIndex];
        if (appointmentToEdit) {
            getElement('#doctor-name').value = appointmentToEdit.doctor;
            getElement('#appointment-date').value = appointmentToEdit.date;
            getElement('#reason').value = appointmentToEdit.reason;
            getElement('#status').value = appointmentToEdit.status;
            getElement('#addAppointmentForm button[type="submit"]').textContent = 'Save Changes';
        } else {
            alert('Appointment not found for editing.');
            window.location.href = 'appointments.html';
        }
    }

    addAppointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const doctorName = getElement('#doctor-name').value;
        const appointmentDate = getElement('#appointment-date').value;
        const reason = getElement('#reason').value;
        const status = getElement('#status').value;

        if (!doctorName || !appointmentDate) {
            alert('Doctor\'s Name and Date & Time are required.');
            return;
        }

        const newAppointment = { doctorName, date: appointmentDate, reason, status };

        if (editingIndex !== -1) {
            appointments[editingIndex] = { doctor: doctorName, date: appointmentDate, reason, status };
        } else {
            appointments.push(newAppointment);
        }

        saveToLocalStorage('appointments', appointments);
        window.location.href = 'appointments.html'; // Redirect back to appointments page
    });
}

// --- Navbar (present on appointments.html and appointment-form.html) ---
const logoutButton = getElement('.logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        // In a real application, you would handle server-side logout and clear session data.
        // For this example, we'll just redirect to the login page.
        window.location.href = 'login.html';
    });
}
