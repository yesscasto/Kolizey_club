function updateCountdown() {
console.log("Текущее время:", new Date());
console.log("Расписание:", schedule);
    const schedule = [
        // Ваше расписание остается без изменений
    ];

    const now = new Date();
    console.log("Текущее время:", now);
    
    let nextTraining = null;
    let minDiff = Infinity;

    schedule.forEach(session => {
        // Создаем дату тренировки на текущей неделе
        const trainingDate = new Date(now);
        trainingDate.setDate(now.getDate() + ((session.day + 7 - now.getDay()) % 7));
        trainingDate.setHours(session.hours, session.minutes, 0, 0);
        
        // Если тренировка уже прошла сегодня, переносим на следующую неделю
        if (trainingDate <= now) {
            trainingDate.setDate(trainingDate.getDate() + 7);
        }

        const diff = trainingDate - now;
        console.log(`Тренировка: ${session.trainer} в ${trainingDate}, разница: ${diff}ms`);
        
        if (diff > 0 && diff < minDiff) {
            minDiff = diff;
            nextTraining = { date: trainingDate, info: session.trainer };
        }
    });

    console.log("Ближайшая тренировка:", nextTraining);
    
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
            `Ближайшая тренировка: ${nextTraining.info} в ${nextTraining.date.getHours()}:${nextTraining.date.getMinutes().toString().padStart(2, '0')}`;
    } else {
        console.error("Не найдено будущих тренировок!");
        document.getElementById('next-training-info').textContent = "Нет запланированных тренировок";
    }
}
