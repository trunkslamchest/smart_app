// const homeTechIcons = (cssIcon, scssIcon, firebaseIcon, htmlIcon, jsIcon, otdbIcon, reactIcon, reduxIcon) => {
const homeTechIcons = (iconsIndex) => {

  return [
    {
      id: 'home_tech_css',
      image: iconsIndex.css,
      name: 'homeTechCSS',
      route: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      text: 'CSS 3'
    },
    {
      id: 'home_tech_scss',
      image: iconsIndex.scss,
      name: 'homeTechSCSS',
      route: 'https://sass-lang.com/',
      text: 'SCSS 4'
    },
    {
      id: 'home_tech_firebase',
      image: iconsIndex.firebase,
      name: 'homeTechFirebase',
      route: 'https://firebase.google.com/',
      text: 'Firebase 8.3'
    },
    {
      id: 'home_tech_html',
      image: iconsIndex.html,
      name: 'homeTechHTML',
      route: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      text: 'HTML 5'
    },
    {
      id: 'home_tech_js',
      image: iconsIndex.js,
      name: 'homeTechJS',
      route: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      text: 'Javascript 1.8'
    },
    {
      id: 'home_tech_react',
      image: iconsIndex.react,
      name: 'homeTechReact',
      route: 'https://reactjs.org/',
      text: 'React 16'
    },
    {
      id: 'home_tech_redux',
      image: iconsIndex.redux,
      name: 'homeTechRedux',
      route: 'https://redux.js.org/',
      text: 'Redux 7'
    }
  ]
}

export default homeTechIcons