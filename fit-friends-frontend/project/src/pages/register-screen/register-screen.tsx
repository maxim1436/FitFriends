
function RegisterScreen ():JSX.Element {
  return (
    <div>
      <head>
        <title>Регистрация — FitFriends</title>
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
            <div className="popup-form popup-form--sign-up">
              <div className="popup-form__wrapper">
                <div className="popup-form__content">
                  <div className="popup-form__title-wrapper">
                    <h1 className="popup-form__title">Регистрация</h1>
                  </div>
                  <div className="popup-form__form">
                    <form method="get">
                      <div className="sign-up">
                        <div className="sign-up__load-photo">
                          <div className="input-load-avatar">
                            <label>
                              <input className="visually-hidden" type="file" accept="image/png, image/jpeg"/>
                              <span className="input-load-avatar__btn">
                                <svg width="20" height="20" aria-hidden="true">
                                  <use xlinkHref="#icon-import"></use>
                                </svg>
                              </span>
                            </label>
                          </div>
                          <div className="sign-up__description">
                            <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                          </div>
                        </div>
                        <div className="sign-up__data">
                          <div className="custom-input">
                            <label><span className="custom-input__label">Имя</span>
                              <span className="custom-input__wrapper">
                                <input type="text" name="name"/>
                              </span>
                            </label>
                          </div>
                          <div className="custom-input">
                            <label><span className="custom-input__label">E-mail</span>
                              <span className="custom-input__wrapper">
                                <input type="email" name="email"/>
                              </span>
                            </label>
                          </div>
                          <div className="custom-input">
                            <label><span className="custom-input__label">Дата рождения</span>
                              <span className="custom-input__wrapper">
                                <input type="date" name="birthday" max="2099-12-31"/>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected"><span className="custom-select__label">Ваша локация</span>
                            <button className="custom-select__button" type="button" aria-label="Выберите одну из опций"><span className="custom-select__text"></span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div className="custom-input">
                            <label><span className="custom-input__label">Пароль</span>
                              <span className="custom-input__wrapper">
                                <input type="password" name="password" autoComplete="off"/>
                              </span>
                            </label>
                          </div>
                          <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                            <div className="custom-toggle-radio custom-toggle-radio--big">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="sex"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Мужской</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="sex" checked/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Женский</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="sex"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Неважно</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sign-up__role">
                          <h2 className="sign-up__legend">Выберите роль</h2>
                          <div className="role-selector sign-up__role-selector">
                            <div className="role-btn">
                              <label>
                                <input className="visually-hidden" type="radio" name="role" value="coach" checked/>
                                <span className="role-btn__icon">
                                  <svg width="12" height="13" aria-hidden="true">
                                    <use xlinkHref="#icon-cup"></use>
                                  </svg>
                                </span>
                                <span className="role-btn__btn">Я хочу тренировать</span>
                              </label>
                            </div>
                            <div className="role-btn">
                              <label>
                                <input className="visually-hidden" type="radio" name="role" value="sportsman"/>
                                <span className="role-btn__icon">
                                  <svg width="12" height="13" aria-hidden="true">
                                    <use xlinkHref="#icon-weight"></use>
                                  </svg>
                                </span>
                                <span className="role-btn__btn">Я хочу тренироваться</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="sign-up__checkbox">
                          <label>
                            <input type="checkbox" value="user-agreement" name="user-agreement" checked/>
                            <span className="sign-up__checkbox-icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                          </label>
                        </div>
                        <button className="btn sign-up__button" type="submit">Продолжить</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </div>
  );
}

export default RegisterScreen;
