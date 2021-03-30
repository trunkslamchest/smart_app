// const homeFeaturesList = (usersIMG, questionsIMG, statsIMG, achievementsIMG, xpIMG, rankRatingIMG, leaderboardsIMG) => {
const homeFeaturesList = (homeFeaturesIndex) => {
  return [
    {
      desc: 'Questions Description',
      headline: 'SmartApp™ Nexus',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_questions',
      image: homeFeaturesIndex.temp,
      // image: questionsIMG,
      name: 'homeFeaturesQuestions'
    },
    {
      desc: 'Users Description',
      headline: 'User Profiles',
      highlights: [
        'highlight1',
        'highlight2',
        'highlight3',
        'highlight4',
        'highlight5',
      ],
      id: 'home_features_users',
      image: homeFeaturesIndex.temp,
      // image: usersIMG,
      name: 'homeFeaturesUsers'
    },
    {
      desc: 'Statistics Description',
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
      desc: 'Achievements Description',
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
      desc: 'Experience Description',
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
      desc: 'Rank and Rating Description',
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
      desc: 'Leaderboards Description',
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