
function EnterScreen ():JSX.Element {
  return (
    <div>
      <head>
        <title>Войти — FitFriends</title>
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
            <div className="popup-form popup-form--sign-in">
              <div className="popup-form__wrapper">
                <div className="popup-form__content">
                  <div className="popup-form__title-wrapper">
                    <h1 className="popup-form__title">Вход</h1>
                  </div>
                  <div className="popup-form__form">
                    <form method="get">
                      <div className="sign-in">
                        <div className="custom-input sign-in__input">
                          <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                              <input type="email" name="email"/></span>
                          </label>
                        </div>
                        <div className="custom-input sign-in__input">
                          <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                              <input type="password" name="password"/></span>
                          </label>
                        </div>
                        <button className="btn sign-in__button" type="submit">Продолжить</button>
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

export default EnterScreen;
