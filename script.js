const schedule = [
    // Абдуллаев Алимирза (Бокс)
    { day: 1, hours: 15, minutes: 0, trainer: "Бокс доп. тренировки (Абдуллаев Алимирза)" }, // Пн
    { day: 2, hours: 17, minutes: 0, trainer: "Детская группа по боксу (Абдуллаев Алимирза)" }, // Вт
    { day: 2, hours: 19, minutes: 0, trainer: "Взрослая группа по боксу (Абдуллаев Алимирза)" }, // Вт
    { day: 3, hours: 15, minutes: 0, trainer: "Бокс доп. тренировки (Абдуллаев Алимирза)" }, // Ср
    { day: 4, hours: 17, minutes: 0, trainer: "Детская группа по боксу (Абдуллаев Алимирза)" }, // Чт
    { day: 4, hours: 19, minutes: 0, trainer: "Взрослая группа по боксу (Абдуллаев Алимирза)" }, // Чт
    { day: 5, hours: 15, minutes: 0, trainer: "Бокс доп. тренировки (Абдуллаев Алимирза)" }, // Пт
    { day: 6, hours: 17, minutes: 0, trainer: "Детская группа по боксу (Абдуллаев Алимирза)" }, // Сб
    { day: 6, hours: 19, minutes: 0, trainer: "Взрослая группа по боксу (Абдуллаев Алимирза)" }, // Сб

    // Шахпазов Минхажудин (ММА)
    { day: 1, hours: 18, minutes: 0, trainer: "ММА младшая группа (Шахпазов Минхажудин)" }, // Пн
    { day: 1, hours: 19, minutes: 0, trainer: "ММА средняя группа (Шахпазов Минхажудин)" }, // Пн
    { day: 2, hours: 20, minutes: 30, trainer: "ММА взрослая группа (Шахпазов Минхажудин)" }, // Вт
    { day: 3, hours: 18, minutes: 0, trainer: "ММА младшая группа (Шахпазов Минхажудин)" }, // Ср
    { day: 3, hours: 19, minutes: 0, trainer: "ММА средняя группа (Шахпазов Минхажудин)" }, // Ср
    { day: 4, hours: 20, minutes: 30, trainer: "ММА взрослая группа (Шахпазов Минхажудин)" }, // Чт
    { day: 5, hours: 18, minutes: 0, trainer: "ММА младшая группа (Шахпазов Минхажудин)" }, // Пт
    { day: 5, hours: 19, minutes: 0, trainer: "ММА средняя группа (Шахпазов Минхажудин)" }, // Пт
    { day: 6, hours: 20, minutes: 30, trainer: "ММА взрослая группа (Шахпазов Минхажудин)" }  // Сб
];

function updateCountdown() {
    const now = new Date();
    let nextTraining = null;
    let minDiff = Infinity;

    schedule.forEach(session => {
        const trainingDate = new Date(now);
        // Устанавливаем день недели (0 - воскресенье, 1 - понедельник и т.д.)
        trainingDate.setDate(now.getDate() + ((session.day - now.getDay() + 7) % 7));
        trainingDate.setHours(session.hours, session.minutes, 0, 0);
        
        // Если тренировка уже прошла сегодня, переносим на следующую неделю
        if (trainingDate <= now) {
            trainingDate.setDate(trainingDate.getDate() + 7);
        }

        const diff = trainingDate - now;
        
        if (diff > 0 && diff < minDiff) {
            minDiff = diff;
            nextTraining = { 
                date: trainingDate, 
                info: session.trainer,
                time: `${session.hours.toString().padStart(2, '0')}:${session.minutes.toString().padStart(2, '0')}`
            };
        }
    });

    if (nextTraining) {
        const totalSeconds = Math.floor(minDiff / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        document.getElementById('next-training-info').textContent = 
            `Ближайшая тренировка: ${nextTraining.info} в ${nextTraining.time}`;
    } else {
        document.getElementById('next-training-info').textContent = "Нет запланированных тренировок";
    }
}

// Запускаем таймер сразу и обновляем каждую секунду
updateCountdown();
setInterval(updateCountdown, 1000);