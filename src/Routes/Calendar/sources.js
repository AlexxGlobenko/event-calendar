export const getDaysInMonth = (month, year) => {
  return new Date(new Date(year, month + 1).getTime() - 1).getDate();
};

export const monthNames = {
  EU: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  RU: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
};

export const weekDays = {
  EU: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  RU: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};

export const getDays = (month, year) => {
  const daysCount = getDaysInMonth(month, year);
  const days = [];

  for (let i = 1; i <= daysCount; i++) {
    days.push({
      date: i,
      weekDay: new Date(year, month, i).getDay(),
      month,
      year
    });
  }
  return days;
};

export const isPickedDate = (
  date,
  pickedDate = {
    date: new Date().getDate(),
    weekDay: new Date().getDay(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  }
) => {
  return (
    date.date === pickedDate.date &&
    date.weekDay === pickedDate.weekDay &&
    date.month === pickedDate.month &&
    date.year === pickedDate.year
  );
};
