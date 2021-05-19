const makeHomeHelpSections = [
  {
    sub_header_text: 'What is SmartApp™?',
    p_texts: [
      {
        texts: [
          `SmartApp™ is a trivia application. Answer multiple choice questions as fast as you can.`,
          `The more questions you answer correctly,
          the more experience you gain,
          the more achievements you unlock,
          the more your rank improves,
          the more your rating increases,
          the higher you place on the leaderboards,
          and the smarter you become!`,
          `It's all in the pursuit of knowledge!`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Signing Up',
    p_texts: [
      {
        header: '',
        texts: [
          `You can create a new account by clicking the 'Sign Up' button located on the home page or header, and filling out the form.`,
          `You can add more information like where you are from, your profile picture, or your birth date after you sign up.`,
          `By creating a new account, you must agree to the Terms Of Service, accept the Privacy Policy, and abide by the Disclaimer
          provided in the Documentation section of SmartApp™.`,
          `The user name, email and password you provide must also follow some requirements:`,
        ]
      }
    ],
    lists: [
      {
        list_header: 'User Name:',
        list_items: [
          `Cannot be shorter than 3 characters`,
          `Cannot be longer than 20 characters`,
          `Cannot be made of only numbers`,
          `Cannot be made of only special characters`,
          "Cannot contain ! @ # % ^ & ( ) [ ] { } ; : < > \\ / ? | = + , . ` ~"
        ]
      },
      {
        list_header: 'Email:',
        list_items: [
          `Cannot be shorter than 10 characters`,
          `Cannot be longer than 100 characters`,
          `Must follow the RFC 5322 (sections 3.2.3 and 3.4.1), RFC 5321, and by extension, RFC 6531 standard formats`,
        ]
      },
      {
        list_header: 'Password:',
        list_items: [
          `Cannot be shorter than 6 characters`,
          `Cannot be longer than 100 characters`,
          `Must contain at least 1 special character`,
          `Must contain at least 1 lower case letter`,
          `Must contain at least 1 upper case letter`,
          `Must contain at least 2 numbers`,
        ]
      }
    ]
  },
  {
    sub_header_text: 'Logging Into your Account',
    p_texts: [
      {
        header: '',
        texts: [
          `You can log in and out of your account anytime you'd like.`,
          `If you are logged out, you can log back in by clicking the 'Login' button on the homepage or on the header.`,
          `The email and password requirements for logging in are the same as creating a new account.`,
          `Once you are logged in, you can begin answering questions by either clicking the 'Play' button on the home page,
           or clicking the 'Play' button located on the header.`,
          `Then select a game mode from either the drop down menu, or the selections presented on screen.`,
        ]
      }
    ]
  },
  {
    sub_header_text: `What can I do with SmartApp™ if I don't want to make an account?`,
    lists: [
      {
        list_header: `But you can do some things if you don't want to make an account:`,
        list_items: [
          `View International, Regional and Category leaderboards`,
          `View public profiles of users`,
          `View the Terms of Service, Privacy Policy, Disclaimer, and License for SmartApp™`,
          `View the source code on GitHub`,
        ]
      }
    ],
    p_texts: [
      {
        header: '',
        texts: [
          `Well, not much. If you want to use SmartApp™, we kind of need you to make an account.`,
          `It's the only way we can keep track of your stats and achievements, and put you on the leaderboards.`,
          `We do not and will not disclose any of your information with anyone else (as per our Privacy Policy)
          and offer privacy settings for your profile to hopefully suit your needs.`,
        ]
      }
    ]
  },
  {
    sub_header_text: 'Support',
    p_texts: [
      {
        header: '',
        texts: [
          `If you have any issues creating a new account or logging into your existing account,
          please submit a support ticket(TBA).`,
        ]
      }
    ]
  }
]

export default makeHomeHelpSections



  // {
  //   sub_header_text: '',
  //   p_texts: [
  //     {
  //       header: '',
  //       texts: [
  //
  //       ]
  //     }
  //   ]
  // },



  // {
  //   sub_header_text: '',
  //   lists: [
  //     {
  //       list_header: '',
  //       list_items: [
  //
  //       ]
  //     }
  //   ]
  // },


  // {
  //   sub_header_text: '',
  //   lists: [
  //     {
  //       list_header: '',
  //       list_items: [
  //
  //       ]
  //     }
  //   ],
  //   p_texts: [
  //     {
  //       header: '',
  //       texts: [
  //
  //       ]
  //     }
  //   ]
  // },