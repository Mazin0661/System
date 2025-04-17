// app.js

const scheduleEl = document.getElementById('schedule');
const datePicker = document.getElementById('datePicker');
const START_HOUR = 6;
const END_HOUR = 22;

function getDateKey(date) {
  return `schedule_${date}`;
}

function renderSchedule(date) {
  const key = getDateKey(date);
  const saved = JSON.parse(localStorage.getItem(key) || '{}');

  scheduleEl.innerHTML = '';

  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const time = `${hour}:00`;
    const value = saved[hour] || '';

    const wrapper = document.createElement('div');
    wrapper.className = 'time-slot';

    const label = document.createElement('div');
    label.className = 'time-label';
    label.textContent = time;

    const entry = document.createElement('div');
    entry.className = 'entry';
    entry.contentEditable = true;
    entry.innerText = value;
    entry.dataset.hour = hour;

    // Apply color coding by keywords
    if (value.toLowerCase().includes('study')) entry.classList.add('study');
    if (value.toLowerCase().includes('workout')) entry.classList.add('workout');
    if (value.toLowerCase().includes('work')) entry.classList.add('work');

    entry.addEventListener('input', () => {
      saved[hour] = entry.innerText;
      localStorage.setItem(key, JSON.stringify(saved));
    });

    wrapper.appendChild(label);
    wrapper.appendChild(entry);
    scheduleEl.appendChild(wrapper);
  }
}

function todayDateStr() {
  return new Date().toISOString().split('T')[0];
}

datePicker.addEventListener('change', () => {
  renderSchedule(datePicker.value);
});

// Init with today
datePicker.value = todayDateStr();
renderSchedule(datePicker.value);
