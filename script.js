// Обновите или добавьте в script.js
function updateCountdown() {
  // Расписание тренировок в формате: день недели (0-6), часы, минуты, тренер
  const schedule = [
    { day: 1, hours: 17, minutes: 0, trainer: "Абдуллаев Алимирза (Детская группа)" },
    { day: 1, hours: 19, minutes: 0, trainer: "Абдуллаев Алимирза (Взрослая группа)" },
    { day: 1, hours: 20, minutes: 30, trainer: "Максим Коркодел" },
    { day: 2, hours: 15, minutes: 0, trainer: "Абдуллаев Алимирза (Доп. тренировка)" },
    { day: 2, hours: 18, minutes: 0, trainer: "Шахпазов Минхажудин (Младшая группа)" },
    { day: 2, hours: 19, minutes: 0, trainer: "Шахпазов Минхажудин (Средняя группа)" },
    { day: 2, hours: 20, minutes: 30, trainer: "Шахпазов Минхажудин (Взрослая группа)" },
    { day: 3, hours: 17, minutes: 0, trainer: "Абдуллаев Алимирза (Детская группа)" },
    { day: 3, hours: 19, minutes: 0, trainer: "Абдуллаев Алимирза (Взрослая группа)" },
    { day: 4, hours: 15, minutes: 0, trainer: "Абдуллаев Алимирза (Доп. тренировка)" },
    { day: 4, hours: 18, minutes: 0, trainer: "Шахпазов Минхажудин (Младшая группа)" },
    { day: 4, hours: 19, minutes: 0, trainer: "Шахпазов Минхажудин (Средняя группа)" },
    { day: 4, hours: 20, minutes: 30, trainer: "Максим Коркодел" },
    { day: 5, hours: 17, minutes: 0, trainer: "Абдуллаев Алимирза (Детская группа)" },
    { day: 5, hours: 19, minutes: 0, trainer: "Абдуллаев Алимирза (Взрослая группа)" },
    { day: 5, hours: 20, minutes: 30, trainer: "Шахпазов Минхажудин (Взрослая группа)" },
    { day: 6, hours: 17, minutes: 0, trainer: "Абдуллаев Алимирза (Детская группа)" }
  ];

  const now = new Date();
  let nextTraining = null;
  let minDiff = Infinity;

  // Находим ближайшую тренировку
  schedule.forEach(session => {
    const trainingDate = new Date();
    trainingDate.setDate(now.getDate() + ((session.day + 7 - now.getDay()) % 7));
    trainingDate.setHours(session.hours, session.minutes, 0, 0);

    // Если тренировка сегодня уже прошла, смотрим на следующую неделю
    if (trainingDate < now) {
      trainingDate.setDate(trainingDate.getDate() + 7);
    }

    const diff = trainingDate - now;
    if (diff < minDiff) {
      minDiff = diff;
      nextTraining = { date: trainingDate, info: session.trainer };
    }
  });

  // Обновляем таймер
  if (nextTraining) {
    const days = Math.floor(minDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((minDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((minDiff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    document.getElementById('next-training-info').textContent = 
      `Ближайшая тренировка: ${nextTraining.info} в ${nextTraining.date.getHours()}:${nextTraining.date.getMinutes().toString().padStart(2, '0')}`;
  }
}

// Обновляем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown(); // Инициализация при загрузке