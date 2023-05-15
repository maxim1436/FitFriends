
function QuestionnaireUser ():JSX.Element {
  return (
    <div>
      <head>
        <title>Опросник — FitFriends</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        <meta name="description" content="ProjectName — описание"/>
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
        <link rel="manifest" href="favicon/site.webmanifest" crossOrigin="use-credentials"/>
        <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <link rel="preload" href="fonts/roboto-regular.woff2" as="font" crossOrigin="anonymous"/>
        <link rel="preload" href="fonts/roboto-medium.woff2" as="font" crossOrigin="anonymous"/>
        <link rel="preload" href="fonts/roboto-bold.woff2" as="font" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="css/style.min.css"/>
      </head>
      <body>
        <div className="wrapper">
          <main>
            <div className="background-logo">
              <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
                <use xlinkHref="#logo-big"></use>
              </svg>
              <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
                <use xlinkHref="#icon-logotype"></use>
              </svg>
            </div>
            <div className="popup-form popup-form--questionnaire-user">
              <div className="popup-form__wrapper">
                <div className="popup-form__content">
                  <div className="popup-form__form">
                    <form method="get">
                      <div className="questionnaire-user">
                        <h1 className="visually-hidden">Опросник</h1>
                        <div className="questionnaire-user__wrapper">
                          <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                            <div className="specialization-checkbox questionnaire-user__specializations">
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="yoga"/><span className="btn-checkbox__btn">Йога</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="running"/><span className="btn-checkbox__btn">Бег</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="power" checked/><span className="btn-checkbox__btn">Силовые</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="aerobics"/><span className="btn-checkbox__btn">Аэробика</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="crossfit" checked/><span className="btn-checkbox__btn">Кроссфит</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="boxing" checked/><span className="btn-checkbox__btn">Бокс</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="pilates"/><span className="btn-checkbox__btn">Пилатес</span>
                                </label>
                              </div>
                              <div className="btn-checkbox">
                                <label>
                                  <input className="visually-hidden" type="checkbox" name="specialisation" value="stretching"/><span className="btn-checkbox__btn">Стрейчинг</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                            <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">10-30 мин</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="time" checked/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">30-50 мин</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">50-80 мин</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">больше 80 мин</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                            <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="level"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Новичок</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="level" checked/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Любитель</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="level"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Профессионал</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="questionnaire-user__block">
                            <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                              <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                                <label>
                                  <span className="custom-input__wrapper">
                                    <input type="number" name="calories-lose"/>
                                    <span className="custom-input__text">ккал</span>
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                              <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                                <label>
                                  <span className="custom-input__wrapper">
                                    <input type="number" name="calories-waste"/>
                                    <span className="custom-input__text">ккал</span>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <script src="js/vendor.min.js"></script>
        <script src="js/main.min.js"></script>
      </body>
    </div>
  );
}

export default QuestionnaireUser;
