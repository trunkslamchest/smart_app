const makeDashboardHelpSections = [
  {
    sub_header_text: 'Welcome to your Dashboard!',
    p_texts: [
      {
        header: '',
        texts: [
          `SmartApp™ Dashboards are where you can view all sorts of information about your profile,
           and make various changes regarding your account information or privacy settings.`,
          `You can navigate through the different dashboards by clicking their respective icons on the navigation bar at the top of the page.`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Profile Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `This is where you can view the information attached to your SmartApp™ Profile.
           You can also change your information by clicking on the 'Edit Profile' button on the top right portion of the page.`,
          `You can include as much or as little information about yourself as you feel comfortable.
          SmartApp™ only requires a user name, a valid email, and a password.`,
          `Your email is not and can not be made visible on your public profile. This is for security/privacy reasons.`,
          `You can view your public profile by clicking the 'View Public Profile' button on the top right portion of the page as well.`,
          `There are some restrictions for each piece of information you can add to your profile:`
        ]
      }
    ]
  },
  {
    sub_header_text: '',
    lists: [
      {
        list_header: `Profile Picture:`,
        list_items: [
          'Cannot be larger than 150x150 in dimension',
          'Cannot be larger than 2MB in size',
        ]
      },
      {
        list_header: `User Name:`,
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
        list_header: 'First & Last Names:',
        list_items: [
          `Cannot contain numbers`,
          `Cannot contain only special characters`,
          `First & Last Names Cannot be shorter than 2 characters`,
          `First Names Cannot be longer than 25 characters`,
          `Last Names Cannot be longer than 50 characters`,
          `Cannot contain ! @ # $ % & * ( ) [ ] { } ; : < > \\ / ? | _ = + ~`
        ]
      },
      {
        list_header: 'Biography:',
        list_items: [
          `Cannot be longer than 255 characters`,
          `Cannot strictly contain numbers`,
          `Cannot strictly contain special characters`,
          "Cannot contain @ ^ [ ] { } < > ` ~"
        ]
      },
    ]
  },
  {
    sub_header_text: 'Statistics Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can view all of the statistics gathered on the questions you have answered.`,
          `If you have answered questions for a specific difficulty or category,
           you can click on it and view information on each question you have answered.
           If you have not answered questions for a specific difficulty or category,
           it will be greyed out and you will not be able to click on it.`,
          `You can only view questions you have answered, so the more questions you answer, the more questions you can view.`,
          `You can also click on the 'View Question' button for each question you have answered to view even more detailed statistics for each question,
           or to go back and vote/comment on a question you might have missed.`,

        ]
      },
      {
        header: 'Experience',
        texts: [
          `You gain experience for each question you answer. `,

        ]
      },
      {
        header: 'Rank',
        texts: [
          `After answering 5 questions, you are granted a SmartApp Rank that increases or decreases based on how well you perform for each question.`,

        ]
      },
      {
        header: 'Rating',
        texts: [
          `After answering 5 questions, Every time you answer a question, the following calculation is ran on your performance:`,

        ]
      }
    ],
  },
  {
    sub_header_text: 'Achievements Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can view all of the Achievements you have unlocked while answering questions.`,

        ]
      }
    ]
  },
  {
    sub_header_text: 'Settings Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can change various settings for your SmartApp™ Profile.`,

        ]
      }
    ]
  },
]

export default makeDashboardHelpSections

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