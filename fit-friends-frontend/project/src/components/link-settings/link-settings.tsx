
function LinkSettings(): JSX.Element {
  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="ProjectName — описание" />
      <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
      <link rel="manifest" href="favicon/site.webmanifest" crossOrigin="use-credentials" />
      <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="preload" href="fonts/roboto-regular.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="fonts/roboto-medium.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="fonts/roboto-bold.woff2" as="font" crossOrigin="anonymous" />
      <link rel="stylesheet" href="css/style.min.css" />
    </div>
  );
}

export default LinkSettings;
