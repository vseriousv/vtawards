export default {
  ru: {
    lang: "ru",
    drawer: {},
    header: {
      logotype: "VT_Logo",
      head: "Лидер перемен 2020",
      subHeadText: `Зажги свою звезду!`,
      bodyText:
        "Главная премия «Восточной Техники», с 2005 года она вручается сотрудникам за выдающиеся достижения и новаторские инициативы.",
      btnHeader: {
        beforeText: `<p>Заполнить форму подачи заявки</br>для участия в конкурсе</p>`,
        text: "Заполнить форму",
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
    ApplicationForm: {
      argumentationTitle: "Аргументация",
      commentPost: "Написать аргументацию",
      fileArgumentation: "Прикрепить к завке документы для аргументации своей кандидатуры",
      labelArgumentation: "Прикрепить файл",
      btnArgumentation: "Отправить заявку",
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
      buttonVoting: "Голосовать",
			comments: "Комментарии",
			commentPost: "Написать комментарий",
			send: "Опубликовать"
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
      sayCEO: `<p>
                <span class="initial">Г</span>лавная премия группы компаний  
                «Восточная Техника» для выдающихся сотрудников и лидеров.
                Вручается сотрудникам – за профессиональные успехи и достижения 
                во всех сферах деятельности компании.
              </p>
              <p><strong>Кого можно номинировать?</strong></p>
              <p>
                На соискание премии в номинациях могут быть предложены:
                -  сотрудники любого подразделения группы компаний «Восточная Техника»;
                Главное, кандидат не может быть победителем прошлых лет. Полный список 
                можно посмотреть <a href="">здесь</a>.
              </p>
              <p><strong>Кто может предложить кандидатуру?</strong></p>
              <p>
                Правом на выдвижение претендентов на соискание премии группы компаний  
                «Восточная Техника» обладают:
                <ul>
                  <li>– структурные подразделения группы компаний «Восточная Техника»;</li>
                  <li>– сотрудники группы компаний «Восточная Техника»;</li>
                  <li>– предусмотрено самовыдвижение  кандидатов.</li>
                </ul>
              </p>`
    },
    NominationBlock: {
      head: "Номинации 2020",
      headText: "Выдвинуть номинанта в любую из трех номинаций конкурса «Лидер перемен ВТ» может каждый сотрудник или структурное подразделение группы компаний «Восточная Техника», количество заявок от одного человека не ограничено.",
      liderNom: `<p>Достижение</br>и лидерство</p>`,
      professionalNom: `<p>Профессионализм</br>и новаторство</p>`,
      goldManNom: `<p>Золотой человек</p>`,
    },
    StepsMainBlock: {
      
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
      head: "Change Maker</br>Award 2020",
      subHeadText: `Ignite your star!`,
      bodyText:
        "The main award of Vostochnaya Technica, presented to employees for outstanding achievements and innovative initiatives since 2005.",
      btnHeader: {
        beforeText: `<p>Fill out the application form</br>for participation in the competition</p>`,
        text: "Competition regulations",
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
    ApplicationForm: {
      argumentationTitle: "Argumentation",
      commentPost: "Write a argumentation",
      fileArgumentation: "Attach documents to the application to substantiate your candidacy",
      labelArgumentation: "Attach file",
      btnArgumentation: "Send a request",
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
      buttonVoting: "Vote",
			comments: "Comments",
			commentPost: "Write a comment",
			send: "Public"
    },
    addressMainBlock: {
      head: "Обращение директора",
      nameCEO: "Gerhard Worster",
      whoIsCEO: "General Director of Vostochnaya Tekhnika LLC",
      sayCEO: `<p>
                <span class="initial">T</span>he main award of the "Vostochnaya 
                Tekhnika" group of companies for outstanding employees and leaders. 
                Awarded to employees for professional success and achievements in all 
                areas of the company.
              </p>
              <p><strong>Who can be nominated?</strong></p>
              <p>
              For the competition for the award in the nominations, the following may be proposed:
              - employees of any division of the "Vostochnaya Tekhnika" group of companies;
              The main thing is that the candidate cannot be the winner of the past years. 
              The full list can be viewed <a href="">here</a>.
              </p>
              <p><strong>Who can propose a candidate?</strong></p>
              <p>
              The following persons have the right to nominate candidates for the prize 
              of the "Vostochnaya Tekhnika" group of companies:
                <ul>
                  <li>– structural divisions of the group of companies "Vostochnaya Tekhnika"; </li>
                  <li>– employees of the group of companies "Vostochnaya Tekhnika"; </li>
                  <li>– self-nomination of candidates is provided. </li>
                </ul>
              </p>`
    },
    NominationBlock: {
      head: "Nominations 2020",
      headText: "Each employee or structural subdivision of the Vostochnaya Tekhnika group of companies can nominate a nominee for any of the three nominations of th' VT Leader of Change 'competition, the number of applications from one person is not limited.",
      liderNom: `<p>Achievement</br>and leadership</p>`,
      professionalNom: `<p>Professionalism</br>and innovation</p>`,
      goldManNom: `<p>Golden man</p>`,
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
