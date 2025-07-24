const toggle = document.getElementById("modeToggle");
const body = document.body;

toggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});

function openPopup() {
  document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}

function submitPopup() {
  const name = document.getElementById('nameInput').value.toUpperCase();
  const sem = document.getElementById('semSelect').value.toUpperCase();
  const course = document.getElementById('courseInput').value.toUpperCase();
  const branch = document.getElementById('branchInput').value.toUpperCase();

const output = `
  <div class="responsive-table">
  <table class="info-table">
    <tr>
      <td><strong>Name:</strong></td><td>${name || "N/A"}</td>
      <td><strong>Semester:</strong></td><td>${sem || "N/A"}</td>
      <td><strong>Course Type:</strong></td><td>${course || "N/A"}</td>
      <td><strong>Branch Type:</strong></td><td>${branch || "N/A"}</td>
    </tr>
  </table>
</div>

`;


  document.getElementById('displayArea').innerHTML = output;
  closePopup();
}

window.onload = function () {
  document.getElementById('popupOverlay').style.display = 'flex';
};










let totalPresent = 0;
let totalCount = 0;

function updateOverallStatus() {
  const overallStatus = document.getElementById('overallStatus');
  const percent = totalCount > 0 ? (totalPresent / totalCount) * 100 : 0;
  let statusText = percent >= 75 ? 'Good Attendance' : 'Low Attendance';
  let badgeClass = percent >= 75 ? 'bg-success' : 'bg-danger';

  overallStatus.innerHTML = `${totalPresent}/${totalCount} (${percent.toFixed(1)}%) — <span class="badge ${badgeClass}">${statusText}</span>`;
}

document.getElementById('addSubjectBtn').addEventListener('click', () => {
  const subjectInput = document.getElementById('subjectInput');
  const name = subjectInput.value.trim();
  if (!name) return;

  let subjectPresent = 0;
  let subjectTotal = 0;

  const card = document.createElement('div');
  card.className = 'card mb-3 p-3';

  const row = document.createElement('div');
  row.className = 'd-flex justify-content-between align-items-center flex-wrap';

  const title = document.createElement('h6');
  title.className = 'mb-2 mb-sm-0';
  title.textContent = name;

  const display = document.createElement('span');
  display.className = 'fw-bold';
  display.textContent = `(0/0 — 0%)`;

  const btnGroup = document.createElement('div');
  btnGroup.className = 'mt-2 mt-sm-0';

  const presentBtn = document.createElement('button');
  presentBtn.className = 'btn btn-primary btn-sm me-2';
  presentBtn.textContent = 'Present';

  const absentBtn = document.createElement('button');
  absentBtn.className = 'btn btn-danger btn-sm';
  absentBtn.textContent = 'Absent';

  const updateDisplay = () => {
    const percent = subjectTotal > 0 ? ((subjectPresent / subjectTotal) * 100).toFixed(1) : 0;
    display.textContent = `(${subjectPresent}/${subjectTotal} — ${percent}%)`;
  };

  presentBtn.onclick = () => {
    subjectPresent++;
    subjectTotal++;
    totalPresent++;
    totalCount++;
    updateDisplay();
    updateOverallStatus();
  };

  absentBtn.onclick = () => {
    subjectTotal++;
    totalCount++;
    updateDisplay();
    updateOverallStatus();
  };

  btnGroup.appendChild(absentBtn);
  btnGroup.appendChild(presentBtn);

  row.appendChild(title);
  row.appendChild(display);
  row.appendChild(btnGroup);

  card.appendChild(row);
  document.getElementById('subjectList').appendChild(card);

  subjectInput.value = '';
});




document.getElementById('refreshBtn').addEventListener('click', () => {
  document.getElementById('subjectList').innerHTML = '';
  document.getElementById('overallStatus').innerHTML = `0/0 (0%) — <span class="badge bg-secondary">No Data</span>`;
  totalPresent = 0;
  totalCount = 0;
});
