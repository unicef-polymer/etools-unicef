const monthsNames = {
  en: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc'],
  ru: ['Янв', 'Фев.', 'Мар', 'Апр.', 'Май', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
  ro: ['Ian.', 'Feb.', 'Mart.', 'Apr.', 'Mai', 'Iunie', 'Iulie', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  pt: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Maio', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  es: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'Mayo', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  ar: [
    'يناير',
    'شهر فبراير',
    'مارس',
    'أبريل',
    'قد',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'اكتوبر',
    'شهر نوفمبر',
    'ديسمبر'
  ]
};

const daysNames = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  ro: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
  pt: ['Dom', '2a', '3a', '4a', '5a', '6a', 'Sab'],
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  ar: ['الأحد', 'الاثنين', 'الثَلاثاء', 'الأربَعاء', 'الخَميس', 'الجُمُعة', 'السَبْت']
};

const daysFirstLetter = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  ru: ['в', 'п', 'в', 'c', 'ч', 'п', 'c'],
  fr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  ro: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  pt: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  es: ['D', 'L', 'M', 'X', 'J', 'V', 'S']
};

export function translatedDaysFirstLetter(lang, index) {
  if (daysFirstLetter[lang]) {
    return daysFirstLetter[lang][index];
  }
  return daysFirstLetter.en[index];
}

export function translatedMonthNames(lang) {
  if (monthsNames[lang]) {
    return monthsNames[lang];
  }
  return monthsNames.en;
}

export function translatedDayNames(lang) {
  if (daysNames[lang]) {
    return daysNames[lang];
  }
  return daysNames.en;
}
