import { Question } from '../types/quiz';

export const questions: { [key: string]: Question[] } = {
  uk: [
    {
      id: 1,
      type: 'single',
      question: "З якою метою цікавитесь?",
      description: "Виберіть відповідний варіант",
      tip: "Це допоможе підібрати оптимальні об'єкти під ваші завдання.",
      options: [
        { label: "💰 Хочу отримувати дохід від оренди", value: "Дохід від оренди" },
        { label: "📈 Хочу вигідно перепродати", value: "Перепродаж" },
        { label: "🏠 Хочу для проживання", value: "Проживання" },
        { label: "🔄 Хочу комбінувати", value: "Комбіновані цілі" }
      ]
    },
    {
      id: 2,
      type: 'single',
      question: "Коли плануєте покупку?",
      description: "Виберіть приблизні терміни",
      tip: "Від терміну покупки буде залежати варіанти, які ми підберемо під термін здачі об'єктів. Готові об'єкти або будуються з різними термінами здачі.",
      options: [
        { label: "⚡ В найближчий час", value: "В найближчий час" },
        { label: "🔜 Протягом 2-3 місяців", value: "Протягом 2-3 місяців" },
        { label: "📅 Протягом півроку", value: "Протягом півроку" },
        { label: "🗓️ Протягом року і більше", value: "Протягом року і більше" }
      ]
    },
    {
      id: 7,
      type: 'single',
      question: "На який бюджет розраховуєте?",
      description: "Виберіть діапазон бюджету",
      tip: "Від бюджету залежить вибір району, класу об'єкту та додаткових опцій. Чим вищий бюджет, тим більше варіантів ми зможемо вам запропонувати.",
      options: [
        { label: "💵 100 000 - 200 000$", value: "100 000 - 200 000$" },
        { label: "💰 200 000 - 300 000$", value: "200 000 - 300 000$" },
        { label: "💎 300 000 - 400 000$", value: "300 000 - 400 000$" },
        { label: "👑 500 000$ і більше", value: "500 000$ і більше" }
      ]
    },
    {
      id: 9,
      type: 'image-choice',
      question: "Який тип нерухомості вас цікавить?",
      description: "Оберіть варіант",
      tip: "Від типу нерухомості залежить вартість, локація та інвестиційний потенціал.",
      options: [
        { 
          label: "Апартаменти", 
          value: "Апартаменти",
          imageUrl: "https://adsquiz.s3.eu-central-1.amazonaws.com/quiz/9BdbeD3jc3/data/zLv8Ed8H4L98fodCyJI5L4HcIZbob3ISWbdNlOlP.png"
        },
        { 
          label: "Вілли", 
          value: "Вілли",
          imageUrl: "https://optim.tildacdn.one/tild6265-6635-4166-a439-303662373534/-/cover/882x1050/center/center/-/format/webp/5317fa3c-f009-4903-8.png.webp"
        },
        { 
          label: "Таунхауси", 
          value: "Таунхауси",
          imageUrl: "https://adsquiz.s3.eu-central-1.amazonaws.com/quiz/9BdbeD3jc3/data/OiQly1qeD3wdFKZyN4fv7h5QAgPq4Gak29S1XK4J.png"
        },
        { 
          label: "Розгляну всі варіанти", 
          value: "Всі варіанти",
          imageUrl: "https://optim.tildacdn.one/tild3266-3737-4866-b434-326535343363/-/cover/724x514/center/center/-/format/webp/2e6adb8a-eb29-48d3-b.png.webp"
        }
      ]
    },
    {
      id: 10,
      type: 'contact',
      question: "Виберіть зручний месенджер для отримання підбірки",
      description: "Ви отримаєте повну підбірку <strong>з фото, описом, таблицями окупності та 3 стратегіями інвестування</strong>",
      options: ["WhatsApp", "Telegram", "Viber"]
    }
  ],
  ru: [
    {
      id: 1,
      type: 'single',
      question: "С какой целью интересуетесь?",
      description: "Выберите подходящий вариант",
      tip: "Это поможет подобрать оптимальные объекты под ваши задачи.",
      options: [
        { label: "💰 Хочу получать доход от аренды", value: "Доход от аренды" },
        { label: "📈 Хочу выгодно перепродать", value: "Перепродажа" },
        { label: "🏠 Хочу для проживания", value: "Проживание" },
        { label: "🔄 Хочу комбинировать", value: "Комбинированные цели" }
      ]
    },
    {
      id: 2,
      type: 'single',
      question: "Когда планируете покупку?",
      description: "Выберите примерные сроки",
      tip: "От срока покупки будет зависеть варианты, которые мы подберем под срок сдачи объектов. Готовые объекты или строящиеся с разными сроками сдачи.",
      options: [
        { label: "⚡ В ближайшее время", value: "В ближайшее время" },
        { label: "🔜 В течении 2-3 месяцев", value: "В течении 2-3 месяцев" },
        { label: "📅 В течении полугода", value: "В течении полугода" },
        { label: "🗓️ В течении года и более", value: "В течении года и более" }
      ]
    },
    {
      id: 7,
      type: 'single',
      question: "На какой примерно бюджет рассчитываете?",
      description: "Выберите диапазон бюджета",
      tip: "От бюджета зависит выбор района, класса объекта и дополнительных опций. Чем выше бюджет, тем больше вариантов мы сможем вам предложить.",
      options: [
        { label: "💵 100 000 - 200 000$", value: "100 000 - 200 000$" },
        { label: "💰 200 000 - 300 000$", value: "200 000 - 300 000$" },
        { label: "💎 300 000 - 400 000$", value: "300 000 - 400 000$" },
        { label: "👑 500 000$ и более", value: "500 000$ и более" }
      ]
    },
    {
      id: 9,
      type: 'image-choice',
      question: "Какой тип недвижимости вас интересует?",
      description: "Выберите вариант",
      tip: "От типа недвижимости зависит стоимость, локация и инвестиционный потенциал.",
      options: [
        { 
          label: "Апартаменты", 
          value: "Апартаменты",
          imageUrl: "https://adsquiz.s3.eu-central-1.amazonaws.com/quiz/9BdbeD3jc3/data/zLv8Ed8H4L98fodCyJI5L4HcIZbob3ISWbdNlOlP.png"
        },
        { 
          label: "Виллы", 
          value: "Виллы",
          imageUrl: "https://optim.tildacdn.one/tild6265-6635-4166-a439-303662373534/-/cover/882x1050/center/center/-/format/webp/5317fa3c-f009-4903-8.png.webp"
        },
        { 
          label: "Таунхаусы", 
          value: "Таунхаусы",
          imageUrl: "https://adsquiz.s3.eu-central-1.amazonaws.com/quiz/9BdbeD3jc3/data/OiQly1qeD3wdFKZyN4fv7h5QAgPq4Gak29S1XK4J.png"
        },
        { 
          label: "Рассмотрю все варианты", 
          value: "Все варианты",
          imageUrl: "https://optim.tildacdn.one/tild3266-3737-4866-b434-326535343363/-/cover/724x514/center/center/-/format/webp/2e6adb8a-eb29-48d3-b.png.webp"
        }
      ]
    },
    {
      id: 10,
      type: 'contact',
      question: "Выберите удобный месседжер на который отправим подборку",
      description: "Вы получите полную подборку <strong>с фото, описанием, таблицами окупаемости и 3 стратегиями инвecтирoвания</strong>",
      options: ["WhatsApp", "Telegram", "Viber"]
    }
  ]
};

export function getQuestions(language: string): Question[] {
  return questions[language] || questions['uk'];
}