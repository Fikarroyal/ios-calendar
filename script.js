const monthYearDisplay = document.querySelector('.current-month-year');
const prevButton = document.querySelector('.prev-month');
const nextButton = document.querySelector('.next-month');
const calendarGrid = document.querySelector('.calendar-grid');

let currentDate = new Date(); // Tanggal saat ini
let currentMonth = currentDate.getMonth(); // Bulan saat ini (0-11)
let currentYear = currentDate.getFullYear(); // Tahun saat ini

const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function renderCalendar() {
    // Clear grid sebelumnya
    calendarGrid.innerHTML = '';

    // Dapatkan hari pertama bulan ini (0 = Minggu, 1 = Senin, dst.)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    // Dapatkan jumlah hari dalam bulan ini
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Dapatkan jumlah hari dalam bulan sebelumnya untuk mengisi awal grid
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Update tampilan bulan dan tahun
    monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Isi tanggal dari bulan sebelumnya (inactive)
    for (let i = firstDayOfMonth; i > 0; i--) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('inactive');
        dayDiv.textContent = daysInPrevMonth - i + 1;
        calendarGrid.appendChild(dayDiv);
    }

    // Isi tanggal bulan ini
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        
        // Tandai tanggal hari ini
        if (i === currentDate.getDate() && 
            currentMonth === new Date().getMonth() && 
            currentYear === new Date().getFullYear()) {
            dayDiv.classList.add('today');
        }
        calendarGrid.appendChild(dayDiv);
    }

    // Isi tanggal dari bulan berikutnya (inactive)
    // Hitung sisa slot di grid (42 slot total, 7 hari * 6 baris)
    const totalDaysDisplayed = firstDayOfMonth + daysInMonth;
    const remainingSlots = 42 - totalDaysDisplayed; // Standard grid size 6x7 = 42

    for (let i = 1; i <= remainingSlots; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('inactive');
        dayDiv.textContent = i;
        calendarGrid.appendChild(dayDiv);
    }
}

// Event Listeners untuk navigasi
prevButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Render kalender saat pertama kali dimuat
renderCalendar();