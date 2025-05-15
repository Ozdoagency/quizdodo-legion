import { getQuestions } from '../data/questions';

export const TELEGRAM_BOT_TOKEN = "7704057139:AAG5O92Mom3YcuheZa8OgCIdlyzjnZiaUfQ";
export const TELEGRAM_CHAT_ID = "278210959";

function formatDate() {
  return new Date().toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' });
}

export function formatAnswers(answers: Record<string, any>, language: string = 'uk') {
  const questions = getQuestions(language);
  let msg = `<b>📩 Заявка из QuizDo:</b>\n\n`;
  msg += `<b>Дата:</b> ${formatDate()}\n\n`;
  msg += `<b>Номер телефона:</b> ${(answers.countryCode || '')}${answers.phone || '-'}\n`;
  msg += `<b>Удобный мессенджер:</b> ${answers.messenger || '-'}\n`;
  if (answers.telegramUsername) {
    msg += `<b>Username Telegram:</b> ${answers.telegramUsername}\n`;
  }
  msg += `\n`;
  msg += `<b>Ответы:</b>\n`;

  questions.forEach((q, idx) => {
    if (q.type === 'contact') return;
    const answer = answers[idx];
    if (answer === undefined || answer === null || answer === '') return;
    if (q.type === 'multiple' && Array.isArray(answer)) {
      msg += `${idx + 1}) ${q.question}\n`;
      answer.forEach((val: string) => {
        const opt = (q.options as any[]).find(o => o.value === val);
        msg += `- ${opt ? opt.value : val}\n`;
      });
    } else {
      const opt = Array.isArray(q.options)
        ? (q.options as any[]).find(o => o.value === answer)
        : null;
      msg += `${idx + 1}) ${q.question}\n`;
      msg += `- ${opt ? opt.value : answer}\n`;
    }
    msg += '\n';
  });

  // UTM
  const utm = Object.entries(answers).filter(([k]) => k.startsWith('utm_'));
  msg += `\n<b>UTM-метки:</b>\n`;
  if (utm.length) {
    utm.forEach(([k, v]) => {
      msg += `${k}: ${String(v)}\n`;
    });
  }

  // Информация о пользователе
  if (answers.userInfo) {
    msg += `\n<b>Информация о пользователе:</b>\n`;
    msg += `Локация: ${answers.userInfo.country}, ${answers.userInfo.city} (${answers.userInfo.timezone})\n`;
    msg += `Устройство: ${answers.userInfo.device}\n`;
  }

  // Cookies
  if (answers.cookies) {
    msg += `\nCookies:\n${answers.cookies}`;
  }

  return msg;
}

export async function sendToTelegram(answers: Record<string, any>, language: string = 'uk') {
  // Добавляем информацию о стране
  if (!answers.userCountry) {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();
      
      // Расширенная информация о пользователе
      answers.userInfo = {
        ip: ip,
        country: geoData.country_name || 'Неизвестно',
        city: geoData.city || 'Неизвестно',
        region: geoData.region || 'Неизвестно',
        timezone: geoData.timezone || 'Неизвестно',
        currency: geoData.currency || 'Неизвестно',
        isp: geoData.org || 'Неизвестно',
        asn: geoData.asn || 'Неизвестно',
        browser: answers.userAgent || 'Неизвестно',
        device: answers.device || 'Неизвестно',
        os: answers.os || 'Неизвестно'
      };
    } catch (error) {
      answers.userInfo = {
        error: 'Не удалось определить информацию'
      };
    }
  }
  
  const text = encodeURIComponent(formatAnswers(answers, language));
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${text}&parse_mode=HTML`;
  await fetch(url);
} 