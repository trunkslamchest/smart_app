const makeFooterCreditLogos = (footerCreditLogosIndex) => {
  return [
    {
      id: 'flatiron_logo_rectangle',
      name: 'Flatiron',
      alt: 'TheFlatironSchoolLogo',
      image: footerCreditLogosIndex.flatironLogoRectangle,
      imageHover: footerCreditLogosIndex.flatironLogoRectangleHover,
      route: 'https://flatironschool.com/'
    },
    {
      id: 'github_logo_rectangle',
      name: 'Github',
      alt: 'GithubLogo',
      image: footerCreditLogosIndex.githubLogoRectangle,
      imageHover: footerCreditLogosIndex.githubLogoRectangleHover,
      route: 'https://github.com/trunkslamchest/smart_app'
    },
    {
      id: 'hvh_logo_rectangle',
      name: 'HudsonValleyHost',
      alt: 'HudsonValleyHostLogo',
      image: footerCreditLogosIndex.hvhLogoRectangle,
      imageHover: footerCreditLogosIndex.hvhLogoRectangleHover,
      route: 'https://hudsonvalleyhost.com/'
    },
    {
      id: 'otb_logo_rectangle',
      name: 'OpenTriviaDatabase',
      alt: 'OpenTriviaDatabaseLogo',
      image: footerCreditLogosIndex.otbLogoRectangle,
      imageHover: footerCreditLogosIndex.otbLogoRectangleHover,
      route: 'https://opentdb.com/'
    },
  ]
}

export default makeFooterCreditLogos