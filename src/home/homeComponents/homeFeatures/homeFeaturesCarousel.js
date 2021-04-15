const homeFeaturesCarousel = (homeFeaturesIndex) => {
  return [
    {
      id: 'home_features_questions',
      image: homeFeaturesIndex.nexus,
      name: 'homeFeaturesQuestions',
      text: {
        desc: [
          `The SmartApp™ Nexus stores and collects data for over 200+ questions from 16 different categories in 3 separate difficulty levels.`,
          `From general trends, to individual metrics, The SmartApp™ Nexus collects the data that lets you know how you stack up against yourself, and with your competition.`
        ],
        headline: 'Nexus',
        highlights: [
          // '200+ Questions',
          // '16 Categories',
          // '3 Difficulty Levels',
          // 'Trend Tracking Capabilities',
          // 'Approval/Comment Features'
        ]
      }
    },
    {
      id: 'home_features_users',
      image: homeFeaturesIndex.profiles,
      name: 'homeFeaturesUsers',
      text: {
        desc: [
          `SmartApp™ Profiles are where all of your statistics, information, experience and acheivements are made available to you.`,
          `Whether you want to drill down on your performance, check out other people's stats, edit your information, or change your privacy settings,
          SmartApp™ Profiles makes it quick and easy to find yourself, or someone else.`
        ],
        headline: 'Profiles',
        highlights: [
          // 'User Generated Statistics',
          // 'Custom Privacy Settings',
          // 'Secured with Google Identity Toolkit',
          // 'highlight4',
          // 'highlight5',
        ]
      }
    },
    // {
    //   id: 'home_features_stats',
    //   image: homeFeaturesIndex.temp,
    //   // image: statsIMG,
    //   name: 'homeFeaturesStats',
    //   text: {
    //     desc: [
    //       `We know you want to know how well you're doing in your quest for absolute knowledge.
    //       So we want to provide you with the information you need to succeed.`,
    //       `From general trends, to individual metrics, SmartApp™ offers important data to let you know how you stack up with yourself, and with your competition.`
    //     ],
    //     headline: 'In Depth Statistics',
    //     highlights: [
    //       // 'Individual Performance Reports',
    //       // 'Percentage Based User Comparisons',
    //       // 'Dynamic Question Ratings',
    //       // 'highlight4',
    //       // 'highlight5',
    //     ]
    //   }
    // },
    {
      id: 'home_features_xp',
      image: homeFeaturesIndex.xp,
      name: 'homeFeaturesXP',
      text: {
        desc: [
          `Everyone loves the feeling progress. And SmartApp™ wants to give you that illusion of progress.`,
          `As you answer more questions, you will earn experience points based on your performance.
          The better you do, the more experience you gain, the higher your level becomes.`,
          `It is quite elementary, my dear Watson.`
        ],
        headline: 'Experience',
        highlights: [
          // 'highlight1',
          // 'highlight2',
          // 'highlight3',
          // 'highlight4',
          // 'highlight5',
        ]
      }
    },
    {
      id: 'home_features_rank_rating',
      image: homeFeaturesIndex.rating,
      name: 'homeFeaturesRankRating',
      text: {
        desc: [
          `Along with gaining experience and leveling up,
          you will receive ranks and ratings for each question you answer based on how fast you, as well as others, have answered a question.`,
          `Question ranks and ratings are then compiled to produce your overall SmartApp™ Rank and SmartApp™ Rating.
          There are also ranks and ratings for how well you perform for individual categories and difficulties.`,
          `No matter how you do, you will always know how well you do.`
        ],
        headline: 'Ratings',
        highlights: [
          // 'highlight1',
          // 'highlight2',
          // 'highlight3',
          // 'highlight4',
          // 'highlight5',
        ]
      }
    },
    {
      id: 'home_features_achievements',
      image: homeFeaturesIndex.achievements,
      name: 'homeFeaturesAchievements',
      text: {
        desc: [
          `Still haven't scratched that itch for meaningless progress?`,
          `With over 25 achievements to unlock, SmartApp™ gives you plenty of reasons to grind for those lofty goals you forever hope to reach.`
        ],
        headline: 'Achievements',
        highlights: [
          // '25 Achievements',
          // 'highlight2',
          // 'highlight3',
          // 'highlight4',
          // 'highlight5',
        ]
      }
    },
    {
      id: 'home_features_leaderboards',
      image: homeFeaturesIndex.leaderboards,
      name: 'homeFeaturesLeaderboards',
      text: {
        desc: [
          `Wanna know how your trivia knowledge stacks up against everyone in your country? How 'bout the entire planet?`,
          `SmartApp™'s Leaderboards have you covered.`,
          `It doesn't matter where you want to assert your trivia dominance, everyone will know how smart you are when you hit that #1 spot.`
        ],
        headline: 'Leaderboards',
        highlights: [
          // 'highlight1',
          // 'highlight2',
          // 'highlight3',
          // 'highlight4',
          // 'highlight5',
        ]
      }
    }
  ]
}

export default homeFeaturesCarousel