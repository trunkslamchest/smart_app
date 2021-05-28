const makeHomeFeaturesCarousel = (homeFeaturesIndex) => {
  return [
    {
      id: 'home_features_questions',
      image: homeFeaturesIndex.nexus,
      name: 'homeFeaturesQuestions',
      text: {
        desc: [
          `The SmartApp™ Nexus stores and collects data for over 500 questions from 20 different categories for 3 separate difficulty levels.`,
          `From general trends to individual metrics, The SmartApp™ Nexus enables us to tell you how you stack up against yourself, and with your competition.`
        ],
        headline: 'Nexus'
      }
    },
    {
      id: 'home_features_users',
      image: homeFeaturesIndex.profiles,
      name: 'homeFeaturesUsers',
      text: {
        desc: [
          `Whether you want to drill down on your performance, check out other people's stats, edit your information, or change your privacy settings,
          SmartApp™ Profiles makes it quick and easy to find yourself, or someone else.`
        ],
        headline: 'Profiles'
      }
    },
    {
      id: 'home_features_xp',
      image: homeFeaturesIndex.xp,
      name: 'homeFeaturesXP',
      text: {
        desc: [
          `Everyone loves the feeling progress. And SmartApp™ wants to give you that illusion of progress.`,
          `As you answer more questions, you will earn experience points based on your performance.
          The better you do, the more experience you gain, the higher your level becomes.`
        ],
        headline: 'Experience'
      }
    },
    {
      id: 'home_features_rank_rating',
      image: homeFeaturesIndex.rating,
      name: 'homeFeaturesRankRating',
      text: {
        desc: [
          `SmartApp™ Ratings base themselves on how quickly and correctly you, as well as others, answer questions.`,
          `Everyting is then compiled to produce your overall SmartApp™ Rank and SmartApp™ Rating.`,
          `No matter how you do, you will always know how well you do.`
        ],
        headline: 'Ratings'
      }
    },
    {
      id: 'home_features_achievements',
      image: homeFeaturesIndex.achievements,
      name: 'homeFeaturesAchievements',
      text: {
        desc: [
          `Still haven't scratched that itch for meaningless progress?`,
          `With over 60 achievements to unlock, SmartApp™ gives you plenty of reasons to grind for those lofty goals you forever hope to reach.`
        ],
        headline: 'Achievements'
      }
    },
    {
      id: 'home_features_leaderboards',
      image: homeFeaturesIndex.leaderboards,
      name: 'homeFeaturesLeaderboards',
      text: {
        desc: [
          `Want to know how your trivia knowledge stacks up against everyone in your country? How about the entire planet?`,
          `SmartApp™ Leaderboards have you covered.
           It doesn't matter where you want to assert your trivia dominance, everyone will know how smart you are when you hit that #1 spot.`
        ],
        headline: 'Leaderboards'
      }
    }
  ]
}

export default makeHomeFeaturesCarousel