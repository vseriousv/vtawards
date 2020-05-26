export default {
  ru: {
    lang: "ru",
    drawer: {},
    header: {
      logotype: "VT_Logo",
      head: "Лидер перемен",
      subHeadText: `Зажги свою звезду!`,
      bodyText:
        "Главная премия «Восточной Техники», с 2005 года она вручается сотрудникам за выдающиеся достижения и новаторские инициативы.",
      btnHeader: {
        text: "положение о конкурсе",
        link: "POLOZHENIE-o-konkurse-Lider-peremen-VT-2019-0204.pdf"
      },
      statusVote: {
        statusEnd: "Голосование на сайте завершено",
        statusProc: "Голосование скоро начнется",
        statusStart: "Идет голосовнаие"
      }
    },
    loginBlock: {
      headAuth: "Авторизация",
      headReg: "Регистрация",
      headForget: "Забыли пароль",
      form: {
        email: "Email",
        tab_number: "Таб номер",
        password: "Пароль",
        password_repeat: "Повторите пароль",
        name: "ФИО",
        position: "Должность",
        section: "Офис",
        state: "Регион",
        city: "Город",
        nomination: "Номинация",
        description: "Описание",
        role: "Роль",
        submit: "Отправить",
        errorPassRepeat: "Пароли должны совпадать"
      }
    },
    infoBlock: {
      head: "Открытие ежегодного голосования",
      img: "image_star",
      text:
        "Мы вынуждены отталкиваться от того, что глубокий уровень погружения однозначно фиксирует необходимость своевременного выполнения сверхзадачи. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: курс на социально-ориентированный национальный проект требует определения и уточнения анализа существующих паттернов поведения! Принимая во внимание показатели успешности, выбранный нами инновационный путь влечет за собой процесс внедрения и модернизации направлений прогрессивного развития."
    },
    membersBlock: {
      table: {
        head: "Таблица результатов участников",
        member: "Участник",
        count_committee_votes: "Баллы комиссии",
        committee_rating: "Голоса комиссии",
        sr_rating: "Средний балл комиссии",
        count_votes: "Голоса сотрудников",
        result_rating: "Итоговый рейтинг"
      }
    },
    participantID: {
      buttonVoting: "Голосовать"
    },
    winnerBlock: {
      head: "Победитель голосования",
      year: "года",
      more: "Подробнее об участнике"
    },
    winnersAllBlock: {
      head: {
        text1: "Победители",
        semifinal_voting: "полуфинала",
        autumn_committee_voting: 'осеннего голосования "Звезда"',
        autumn_users_voting: "осеннего народного голосования",
        spring_committee_voting: 'весеннего голосования "Звезда"',
        spring_users_voting: "весеннего народного голосования"
      },
      year: "года",
      more: "Подробнее об участнике"
    },
    addressMainBlock: {
      head: "Обращение директора",
      nameCEO: "Герхард Ворстер",
      whoIsCEO: "Генеральный директор ООО «Восточная Техника»",
      sayCEO: `<p><span class="initial">Н</span>ашу команду вполне можно сравнить с
              Олимпийской сборной. В нее входят лучшие атлеты, чемпионы,
              спортсмены и тренеры, которые много и упорно работают над сборной
              для достижения победы. Для нас всех важен только общекомандный
              результат. Но в разные периоды те или иные сотрудники получают
              шанс проявить личные способности. И делают они это с огромным
              успехом.</p>
            <p>
              Наши «Лидеры перемен» − это Звезды команд, умеющие проявить свои
              компетенции в эпоху перемен. Изменились бизнес-ландшафт и
              политическая ситуация, приходят новые технологии и цифровые
              инновации, конкуренция стала жестче, а потребности клиентов
              сложнее, но и в этих изменившихся условиях наши сотрудники
              достойно «держат мяч» и демонстрируют нестандартные подходы! Что
              им помогает? Во-первых, профессиональные компетенции. Во-вторых,
              активное развитие навыков. И, конечно, дружеское плечо товарищей
              по команде: всех нас, кто работает в «Восточной Технике».
            </p>
            <p><b>Правила меняются. Движение к успеху продолжается!</b></p>`
    },
    memberMainBlock: {
      button: 'Все номинанты'
    },
    footerBlock: {},
    menuItems: [
      {
        id: 1,
        text: "Главная",
        link: "/",
        target: "_self"
      },
      {
        id: 2,
        text: "Результаты голосования",
        link: "/result",
        target: "_self"
      },
      {
        id: 3,
        text: "Комиссия",
        link: "/committee",
        target: "_self"
      },
      {
        id: 4,
        text: "Участники",
        link: "/participants",
        target: "_self"
      },
      // {
      //   id: 5,
      //   text: "Архив",
      //   link: "/archive",
      //   target: "_self"
      // },
      {
        id: 6,
        text: "Выход",
        link: "/logout",
        target: "_self"
      }
    ]
  },
  en: {
    lang: "en",
    drawer: {},
    header: {
      logotype: "VT_Logo_eng",
      head: "Change Maker",
      subHeadText: `Ignite your star!`,
      bodyText:
        "The main award of Vostochnaya Technica, presented to employees for outstanding achievements and innovative initiatives since 2005.",
      btnHeader: {
        text: "competition regulations",
        link: "Konkurs-Lider-Peremen-VT-Polozhenie_2019-0204-eng.pdf"
      },
      statusVote: {
        statusEnd: "Voting is closed",
        statusProc: "Voting will begin soon",
        statusStart: "There is a vote"
      }
    },
    loginBlock: {
      headAuth: "Sing in",
      headReg: "Registration",
      headForget: "Forget password",
      form: {
        email: "Email",
        tab_number: "Tab number",
        password: "Password",
        password_repeat: "Password repeat",
        name: "Name and Last name",
        position: "Position",
        section: "Section",
        state: "State",
        city: "City",
        nomination: "Nomination",
        description: "Description",
        role: "Role",
        submit: "Send",
        errorPassRepeat: "Passwords must match"
      }
    },
    infoBlock: {
      head: "Opening of annual voting",
      img: "image_star",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    winnerBlock: {
      head: "Voting winner",
      year: "year",
      more: "More about the participant"
    },
    winnersAllBlock: {
      head: {
        text1: "Winners",
        semifinal_voting: "semifinal",
        autumn_committee_voting: 'autumn "Star" voting',
        autumn_users_voting: "autumn popular vote",
        spring_committee_voting: 'spring "Star" voting',
        spring_users_voting: "spring popular vote"
      },
      year: "year",
      more: "Member Details"
    },
    membersBlock: {
      table: {
        head: "Table of results",
        member: "Participant",
        count_committee_votes: "Commission points",
        committee_rating: "Voices of the commission",
        sr_rating: "Average commission score",
        count_votes: "Employee Voices",
        result_rating: "Total rating"
      }
    },
    participantID: {
      buttonVoting: "Vote"
    },
    addressMainBlock: {
      head: "Обращение директора",
      nameCEO: "Герхард Ворстер",
      whoIsCEO: "Генеральный директор ООО «Восточная Техника»",
      sayCEO: `<p><span class="initial">Н</span>ашу команду вполне можно сравнить с
              Олимпийской сборной. В нее входят лучшие атлеты, чемпионы,
              спортсмены и тренеры, которые много и упорно работают над сборной
              для достижения победы. Для нас всех важен только общекомандный
              результат. Но в разные периоды те или иные сотрудники получают
              шанс проявить личные способности. И делают они это с огромным
              успехом.</p>
            <p>
              Наши «Лидеры перемен» − это Звезды команд, умеющие проявить свои
              компетенции в эпоху перемен. Изменились бизнес-ландшафт и
              политическая ситуация, приходят новые технологии и цифровые
              инновации, конкуренция стала жестче, а потребности клиентов
              сложнее, но и в этих изменившихся условиях наши сотрудники
              достойно «держат мяч» и демонстрируют нестандартные подходы! Что
              им помогает? Во-первых, профессиональные компетенции. Во-вторых,
              активное развитие навыков. И, конечно, дружеское плечо товарищей
              по команде: всех нас, кто работает в «Восточной Технике».
            </p>
            <p><b>Правила меняются. Движение к успеху продолжается!</b></p>`
    },
    memberMainBlock: {
      button: 'Все номинанты'
    },
    footerBlock: {},
    menuItems: [
      {
        id: 1,
        text: "Home",
        link: "/",
        target: "_self"
      },
      {
        id: 2,
        text: "Voting results",
        link: "/result",
        target: "_self"
      },
      {
        id: 3,
        text: "Committee",
        link: "/committee",
        target: "_self"
      },
      {
        id: 4,
        text: "Participants",
        link: "/participants",
        target: "_self"
      },
      // {
      //   id: 5,
      //   text: "Archive",
      //   link: "#archive",
      //   target: "_self"
      // },
      {
        id: 6,
        text: "Logout",
        link: "/logout",
        target: "_self"
      }
    ]
  }
};
