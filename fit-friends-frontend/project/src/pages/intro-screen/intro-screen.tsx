

function IntroScreen (): JSX.Element {
  return (
    <div>
      <head>
        <title>Разводящая — FitFriends</title>
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
            <div className="intro">
              <div className="intro__background">
                <picture>
                  <source type="image/webp" srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x"/><img src="img/content/sitemap//background.jpg" srcSet="img/content/sitemap//background@2x.jpg 2x" width="1440" height="1024" alt="Фон с бегущей девушкой"/>
                </picture>
              </div>
              <div className="intro__wrapper">
                <svg className="intro__icon" width="60" height="60" aria-hidden="true">
                  <use xlinkHref="#icon-logotype"></use>
                </svg>
                <div className="intro__title-logo">
                  <picture>
                    <source type="image/webp" srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x"/><img src="img/content/sitemap//title-logo.png" srcSet="img/content/sitemap//title-logo@2x.png 2x" width="934" height="455" alt="Логотип Fit Friends"/>
                  </picture>
                </div>
                <div className="intro__buttons">
                  <button className="btn intro__button" type="button">Регистрация</button>
                  <p className="intro__text">Есть аккаунт? <a className="intro__link" href="#">Вход</a></p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </div>
  );
}

export default IntroScreen;
