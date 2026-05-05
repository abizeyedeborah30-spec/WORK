
let patientsList = [
    { name: "Mukamana Divine", age: 34, phone: "0788123456", condition: "Routine check" },
    { name: "Habimana Jean", age: 45, phone: "0788234567", condition: "Hypertension" }
];

let appointmentsList = [
    { patient: "Mukamana Divine", date: "2026-05-07", time: "10:00 AM", reason: "Consultation" },
    { patient: "Habimana Jean", date: "2026-05-08", time: "02:30 PM", reason: "Follow-up" }
];

let currentSection = 'dashboard';

// ========== HELPER FUNCTIONS ==========
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========== RENDER FUNCTIONS ==========
function renderPatientsSection() {
    return `
        <div class="section-container">
            <h2 style="font-size:1.6rem; margin-bottom:12px;">👥 Patient Management</h2>
            <p style="margin-bottom:24px; color:#4a627a;">Register new patient or see current records</p>
            <div style="background:#fafcff; border-radius:28px; padding:20px; margin-bottom:28px; border:1px solid #eef2fa;">
                <h3 style="margin-bottom:16px;">➕ Add New Patient</h3>
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="patientName" placeholder="e.g., Uwase Aline">
                </div>
                <div class="form-group">
                    <label>Age</label>
                    <input type="number" id="patientAge" placeholder="Age">
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" id="patientPhone" placeholder="Phone">
                </div>
                <div class="form-group">
                    <label>Medical Condition</label>
                    <input type="text" id="patientCondition" placeholder="e.g., Malaria, Diabetes">
                </div>
                <button class="btn-primary" id="savePatientBtn">➕ Register Patient</button>
            </div>
            <h3>📋 Registered Patients (${patientsList.length})</h3>
            <div id="patientsListContainer" style="margin-top:12px;">
                ${patientsList.map((p, idx) => `
                    <div class="list-item">
                        <div><strong>${escapeHtml(p.name)}</strong> (${p.age} yrs) - ${escapeHtml(p.condition)} <br><small>📞 ${escapeHtml(p.phone)}</small></div>
                        <button class="remove-item-btn" data-type="patient" data-index="${idx}">🗑️ Remove</button>
                    </div>
                `).join('')}
                ${patientsList.length === 0 ? '<div class="list-item">No patients yet. Add one above.</div>' : ''}
            </div>
        </div>
    `;
}

function renderAppointmentsSection() {
    return `
        <div class="section-container">
            <h2 style="font-size:1.6rem; margin-bottom:12px;">📅 Appointments Schedule</h2>
            <p style="margin-bottom:24px; color:#4a627a;">Book, edit or view appointments</p>
            <div style="background:#fafcff; border-radius:28px; padding:20px; margin-bottom:28px; border:1px solid #eef2fa;">
                <h3>➕ Schedule New Appointment</h3>
                <div class="form-group">
                    <label>Patient Name</label>
                    <input type="text" id="appPatientName" placeholder="Full name of patient">
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="appDate">
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <input type="text" id="appTime" placeholder="e.g., 11:30 AM">
                </div>
                <div class="form-group">
                    <label>Reason</label>
                    <input type="text" id="appReason" placeholder="Consultation / Follow-up">
                </div>
                <button class="btn-primary" id="saveAppointmentBtn">📌 Book Appointment</button>
            </div>
            <h3>📋 Upcoming Appointments</h3>
            <div id="appointmentsListContainer">
                ${appointmentsList.map((apt, idx) => `
                    <div class="list-item">
                        <div><strong>${escapeHtml(apt.patient)}</strong> — ${apt.date} at ${apt.time} <br><small>${escapeHtml(apt.reason)}</small></div>
                        <button class="remove-item-btn" data-type="appointment" data-index="${idx}">❌ Cancel</button>
                    </div>
                `).join('')}
                ${appointmentsList.length === 0 ? '<div class="list-item">No appointments yet. Create one.</div>' : ''}
            </div>
        </div>
    `;
}

function renderReportsSection() {
    return `
        <div class="section-container">
            <h2 style="font-size:1.6rem;">📊 Reports & Analytics</h2>
            <p style="margin:12px 0 24px;">Generate clinic summaries and reports</p>
            <div class="form-group">
                <label>Report Type</label>
                <select id="reportTypeSelect">
                    <option>Patient Summary</option>
                    <option>Appointment Analytics</option>
                    <option>Financial Overview</option>
                </select>
            </div>
            <div class="form-group">
                <label>Additional Notes / Data entry</label>
                <textarea rows="3" id="reportNotes" placeholder="Write any note or clinic data..."></textarea>
            </div>
            <button class="btn-primary" id="generateReportBtn">📄 Generate Report Preview</button>
            <div id="reportPreview" style="margin-top:28px; background:#f8fafc; border-radius:24px; padding:20px;">
                <strong>Report preview will appear here.</strong><br> Click generate to see dynamic clinic statistics.
            </div>
        </div>
    `;
}

function renderSettingsSection() {
    return `
        <div class="section-container">
            <h2 style="font-size:1.6rem;">⚙️ System Settings</h2>
            <p style="margin:12px 0 20px;">Clinic preferences & activation</p>
            <div class="form-group">
                <label>Clinic Name Display</label>
                <input type="text" id="clinicNameSetting" placeholder="DEBORAH & ALICE Clinic" value="DEBORAH & ALICE">
            </div>
            <div class="form-group">
                <label>Working Hours</label>
                <input type="text" id="workingHours" placeholder="8:00 AM - 6:00 PM">
            </div>
            <div class="form-group">
                <label>System Language</label>
                <select id="languageSelect">
                    <option>English</option>
                    <option>Kinyarwanda</option>
                    <option>French</option>
                </select>
            </div>
            <button class="btn-primary" id="saveSettingsBtn">💾 Save Preferences</button>
            <div id="settingsFeedback" style="margin-top:20px; background:#eef3fc; border-radius:20px; padding:16px;"></div>
        </div>
    `;
}

// ========== EVENT HANDLERS ==========
function attachRemoveEvents() {
    const removeBtns = document.querySelectorAll('.remove-item-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.getAttribute('data-type');
            const idx = parseInt(btn.getAttribute('data-index'));
            if (type === 'patient') {
                patientsList.splice(idx, 1);
                updateContent('patients');
            } else if (type === 'appointment') {
                appointmentsList.splice(idx, 1);
                updateContent('appointments');
            }
        });
    });
}

// ========== MAIN UPDATE FUNCTION ==========
function updateContent(sectionId) {
    currentSection = sectionId;
    const dynamicCard = document.getElementById('dynamicContentCard');
    const headerTitleDiv = document.getElementById('dynamicHeader');

    if (sectionId === 'dashboard') {
        headerTitleDiv.innerHTML = '<h1>Dashboard</h1><p>Welcome to your clinic dashboard</p>';
        dynamicCard.innerHTML = `
            <div class="section-container">
                <div class="welcome-message">
                    ✨ <strong>Welcome to DEBORAH & ALICE Clinic Management System</strong><br>
                    Manage appointments, patients, reports, and clinic activities seamlessly.
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-emoji">👥</div>
                        <div class="stat-number">${patientsList.length}</div>
                        <div>Total Patients</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-emoji">📅</div>
                        <div class="stat-number">${appointmentsList.length}</div>
                        <div>Appointments</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-emoji">📊</div>
                        <div class="stat-number">3</div>
                        <div>Pending Reports</div>
                    </div>
                </div>
                <div class="data-list">
                    <div class="list-item">
                        <span>🟢 Clinic Today</span>
                        <span class="badge-info">Active Hours 8am-6pm</span>
                    </div>
                    <div class="list-item">
                        <span>📌 Recent Activity: ${appointmentsList.length} upcoming appointments</span>
                    </div>
                </div>
            </div>
        `;
    } 
    else if (sectionId === 'patients') {
        headerTitleDiv.innerHTML = '<h1>Patients</h1><p>Manage patient records & register new</p>';
        dynamicCard.innerHTML = renderPatientsSection();
        const saveBtn = document.getElementById('savePatientBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const name = document.getElementById('patientName').value.trim();
                const age = document.getElementById('patientAge').value;
                const phone = document.getElementById('patientPhone').value.trim();
                const condition = document.getElementById('patientCondition').value.trim();
                if (name) {
                    patientsList.push({
                        name: name,
                        age: age || '?',
                        phone: phone || 'N/A',
                        condition: condition || 'General'
                    });
                    updateContent('patients');
                } else {
                    alert("Please enter patient name");
                }
            });
        }
        attachRemoveEvents();
    } 
    else if (sectionId === 'appointments') {
        headerTitleDiv.innerHTML = '<h1>Appointments</h1><p>Schedule and manage appointments</p>';
        dynamicCard.innerHTML = renderAppointmentsSection();
        const bookBtn = document.getElementById('saveAppointmentBtn');
        if (bookBtn) {
            bookBtn.addEventListener('click', () => {
                const patient = document.getElementById('appPatientName').value.trim();
                const date = document.getElementById('appDate').value;
                const time = document.getElementById('appTime').value.trim();
                const reason = document.getElementById('appReason').value.trim();
                if (patient && date) {
                    appointmentsList.push({
                        patient: patient,
                        date: date,
                        time: time || '09:00 AM',
                        reason: reason || 'Consultation'
                    });
                    updateContent('appointments');
                } else {
                    alert("Please provide patient name and date");
                }
            });
        }
        attachRemoveEvents();
    } 
    else if (sectionId === 'reports') {
        headerTitleDiv.innerHTML = '<h1>Reports</h1><p>Analytics & clinic data reporting</p>';
        dynamicCard.innerHTML = renderReportsSection();
        const genBtn = document.getElementById('generateReportBtn');
        if (genBtn) {
            genBtn.addEventListener('click', () => {
                const reportType = document.getElementById('reportTypeSelect').value;
                const extraNote = document.getElementById('reportNotes').value;
                const previewDiv = document.getElementById('reportPreview');
                previewDiv.innerHTML = `<strong>📋 ${escapeHtml(reportType)} (Clinic Report)</strong><br>• Total Patients: ${patientsList.length}<br>• Total Appointments: ${appointmentsList.length}<br>• Notes: ${escapeHtml(extraNote) || 'No extra notes'}<br><span style="color:#2563eb;">✅ Report generated at ${new Date().toLocaleString()}</span>`;
            });
        }
    } 
    else if (sectionId === 'settings') {
        headerTitleDiv.innerHTML = '<h1>Settings</h1><p>System preferences & Windows activation</p>';
        dynamicCard.innerHTML = renderSettingsSection();
        const saveSettings = document.getElementById('saveSettingsBtn');
        if (saveSettings) {
            saveSettings.addEventListener('click', () => {
                const clinicNameVal = document.getElementById('clinicNameSetting').value;
                const hours = document.getElementById('workingHours').value;
                const lang = document.getElementById('languageSelect').value;
                const feedbackDiv = document.getElementById('settingsFeedback');
                feedbackDiv.innerHTML = `✅ Settings saved! Clinic: ${escapeHtml(clinicNameVal)} | Hours: ${escapeHtml(hours) || '8-6'} | Language: ${escapeHtml(lang)}<br>⚙️ Windows activation status: reminder active.`;
            });
        }
    }
}

// ========== SIDEBAR NAVIGATION ==========
const navBtns = document.querySelectorAll('.nav-btn');

function setActiveNav(selected) {
    navBtns.forEach(btn => btn.classList.remove('active'));
    selected.classList.add('active');
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if (section) {
            updateContent(section);
            setActiveNav(btn);
        }
    });
});

// ========== INITIAL LOAD ==========
updateContent('dashboard');
const defaultBtn = document.querySelector('[data-section="dashboard"]');
if (defaultBtn) setActiveNav(defaultBtn);
