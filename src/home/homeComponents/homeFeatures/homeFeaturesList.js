// const homeFeaturesList = (usersIMG, questionsIMG, statsIMG, achievementsIMG, xpIMG, rankRatingIMG, leaderboardsIMG) => {
const homeFeaturesList = (homeFeaturesIndex) => {
  return [
    {
      desc: [
        `The SmartApp™ Nexus stores all answerable questions for SmartApp™, and is responsible for tracking of all sorts of statistics for each question, category and difficulty.
         Statistics are dynamicly collected, complied and sorted, yielding detailed information as more questions are answered by more users.
        `,
        'The smarter you get, the larger the Nexus grows:'
      ],
      headline: 'The SmartApp™ Nexus',
      highlights: [
        '200+ Questions',
        '16 Categories',
        '3 Difficulty Levels',
        // 'Trend Tracking Capabilities',
        // 'Approval/Comment Features'
      ],
      id: 'home_features_questions',
      image: homeFeaturesIndex.temp,
      // image: questionsIMG,
      name: 'homeFeaturesQuestions'
    },
    {
      desc: [ 'SmartApp™ Profiles are where all of your statistics, information, experience and acheivements are made available to you. Whether you want to drill down' ],
      headline: 'User Profiles',
      highlights: [
        'User Generated Statistics',
        'Custom Privacy Settings',
        'Secured with Google Identity Toolkit',
        // 'highlight4',
        // 'highlight5',
      ],
      id: 'home_features_users',
      image: homeFeaturesIndex.temp,
      // image: usersIMG,
      name: 'homeFeaturesUsers'
    },
    {
      desc: ['Statistics Description'],
      headline: 'In Depth Statistics',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_stats',
      image: homeFeaturesIndex.temp,
      // image: statsIMG,
      name: 'homeFeaturesStats'
    },
    {
      desc: ['Achievements Description'],
      headline: 'Achievements',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_achievements',
      image: homeFeaturesIndex.temp,
      // image: achievementsIMG,
      name: 'homeFeaturesAchievements'
    },
    {
      desc: ['Experience Description'],
      headline: 'Level Up',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_xp',
      image: homeFeaturesIndex.temp,
      // image: xpIMG,
      name: 'homeFeaturesXP'
    },
    {
      desc: ['Rank and Rating Description'],
      headline: 'Ranks and Ratings',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_rank_rating',
      image: homeFeaturesIndex.temp,
      // image: rankRatingIMG,
      name: 'homeFeaturesRankRating'
    },
    {
      desc: ['Leaderboards Description'],
      headline: 'Live Leaderboards',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_leaderboards',
      image: homeFeaturesIndex.temp,
      // image: leaderboardsIMG,
      name: 'homeFeaturesLeaderboards'
    }
  ]
}

export default homeFeaturesList