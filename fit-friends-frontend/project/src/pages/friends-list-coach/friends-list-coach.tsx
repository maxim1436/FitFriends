import StyleSettings from '../../components/style-settings/style-settings';
import LinkSettings from '../../components/link-settings/link-settings';

function FriendsListCoach(): JSX.Element {
  return (
    <div>
      <head>
        <title>Список друзей — FitFriends</title>
        <LinkSettings />
      </head>
      <body>
        <StyleSettings />
        <div className="wrapper">
          <header className="header">
            <div className="container">
              <a className="header__logo" href="index.html" aria-label="Переход на главную">
                <svg width="187" height="70" aria-hidden="true">
                  <use xlinkHref="#logo"></use>
                </svg>
              </a>
              <nav className="main-nav">
                <ul className="main-nav__list">
                  <li className="main-nav__item">
                    <a className="main-nav__link is-active" href="#" aria-label="На главную">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-home"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="main-nav__item">
                    <a className="main-nav__link" href="#" aria-label="Личный кабинет">
                      <svg width="16" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-user"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="main-nav__item">
                    <a className="main-nav__link" href="#" aria-label="Друзья">
                      <svg width="22" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="main-nav__item main-nav__item--notifications">
                    <a className="main-nav__link" href="#" aria-label="Уведомления">
                      <svg width="14" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-notification"></use>
                      </svg>
                    </a>
                    <div className="main-nav__dropdown">
                      <p className="main-nav__label">Оповещения</p>
                      <ul className="main-nav__sublist">
                        <li className="main-nav__subitem">
                          <a className="notification is-active" href="#">
                            <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                            <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time>
                          </a>
                        </li>
                        <li className="main-nav__subitem">
                          <a className="notification is-active" href="#">
                            <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                            <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time>
                          </a>
                        </li>
                        <li className="main-nav__subitem">
                          <a className="notification is-active" href="#">
                            <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                            <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="search">
                <form action="#" method="get">
                  <label>
                    <span className="search__label">Поиск</span>
                    <input type="search" name="search" />
                    <svg className="search__icon" width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-search"></use>
                    </svg>
                  </label>
                  <ul className="search__list">
                    <li className="search__item">
                      <a className="search__link" href="#">Бокс</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link is-active" href="#">Бег</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Аэробика</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                    <li className="search__item">
                      <a className="search__link" href="#">Text</a>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </header>
          <main>
            <section className="friends-list">
              <div className="container">
                <div className="friends-list__wrapper">
                  <button className="btn-flat friends-list__back" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <div className="friends-list__title-wrapper">
                    <h1 className="friends-list__title">Мои друзья</h1>
                  </div>
                  <ul className="friends-list__list">
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-14.webp, img/content/thumbnails/friend-14@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-14.jpg" srcSet="img/content/thumbnails/friend-14@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Виктория</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Технологический институт II</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#аэробика</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                              <span>Готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                          <div className="thumbnail-friend__button-wrapper">
                            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-15.webp, img/content/thumbnails/friend-15@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-15.jpg" srcSet="img/content/thumbnails/friend-15@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Кристина</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Политехническая</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#бокс</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                              <span>Готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                          <div className="thumbnail-friend__button-wrapper">
                            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-16.webp, img/content/thumbnails/friend-16@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-16.jpg" srcSet="img/content/thumbnails/friend-16@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Алексей</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Обухово</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#кроссфит</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                              <span>Готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                          <div className="thumbnail-friend__button-wrapper">
                            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-17.webp, img/content/thumbnails/friend-17@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-17.jpg" srcSet="img/content/thumbnails/friend-17@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Катерина</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Фрунзенская</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#аэробика</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                              <span>Не&nbsp;готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-18.webp, img/content/thumbnails/friend-18@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-18.jpg" srcSet="img/content/thumbnails/friend-18@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Ксения</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Звенигородская</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#бокс</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                              <span>Готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-19.webp, img/content/thumbnails/friend-19@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-19.jpg" srcSet="img/content/thumbnails/friend-19@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Алиса</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Чёрная речка</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#стретчинг</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                              <span>Не&nbsp;готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-20.webp, img/content/thumbnails/friend-20@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-20.jpg" srcSet="img/content/thumbnails/friend-20@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Алёна</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Крестовский остров</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#кроссфит</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                              <span>Готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-21.webp, img/content/thumbnails/friend-21@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-21.jpg" srcSet="img/content/thumbnails/friend-21@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">София</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Электросила</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#кроссфит</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                              <span>Не&nbsp;готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="friends-list__item">
                      <div className="thumbnail-friend">
                        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                          <div className="thumbnail-friend__image-status">
                            <div className="thumbnail-friend__image">
                              <picture>
                                <source type="image/webp" srcSet="img/content/thumbnails/friend-09.webp, img/content/thumbnails/friend-09@2x.webp 2x" />
                                <img src="img/content/thumbnails/friend-09.jpg" srcSet="img/content/thumbnails/friend-09@2x.jpg 2x" width="78" height="78" alt="" />
                              </picture>
                            </div>
                          </div>
                          <div className="thumbnail-friend__header">
                            <h2 className="thumbnail-friend__name">Валерия</h2>
                            <div className="thumbnail-friend__location">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <address className="thumbnail-friend__location-address">Московские ворота</address>
                            </div>
                          </div>
                          <ul className="thumbnail-friend__training-types-list">
                            <li>
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#стретчинг</span>
                              </div>
                            </li>
                          </ul>
                          <div className="thumbnail-friend__activity-bar">
                            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                              <span>Готов к&nbsp;тренировке</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="show-more friends-list__show-more">
                    <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                    <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <script src="js/vendor.min.js"></script>
        <script src="js/main.min.js"></script>
      </body>
    </div>
  );
}

export default FriendsListCoach;
