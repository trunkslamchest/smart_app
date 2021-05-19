
<p align="center">
  <img width=75% src="https://raw.githubusercontent.com/trunkslamchest/smart_app/master/src/assets/logos/indexLogos/full_color_index_logo.png">
</p>

<p align="center">
  <img align="center" src="https://img.shields.io/badge/CSS-3.0-1572B6">
  <img align="center" src="https://img.shields.io/badge/Firebase-8.5.0-F57C00">
  <img align="center" src="https://img.shields.io/badge/HTML-5.2-E34F26">
  <img align="center" src="https://img.shields.io/badge/Javascript-1.8.5-F7DF1E">
  <img align="center" src="https://img.shields.io/badge/React.JS-17.0.2-61DAFB">
  <img align="center" src="https://img.shields.io/badge/Redux.JS-4.1.0-764ABC">
  <img align="center" src="https://img.shields.io/badge/SCSS-4.14.1-c69">
</p>

<p align="center">
  <img align="center" src="https://img.shields.io/badge/Status-Work%20In%20Progress-000000">
</p>

<p align="center">
  <a href="https://github.com/trunkslamchest/smart_app/tree/0.93"><img align="center" src="https://img.shields.io/badge/Latest%20Repository-0.93-000000"></a>
</p>

# Contents
- [Introduction](#introduction)
  - [Description](#description)
  - [Key Features](#key-features)
  - [Goals](#goals)
  - [Challenges](#challenges)
- [Demo](#demo)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [First Start](#first-start)
- [Summary Of Files](#summary-of-files)
  - [Internal File Structure](#internal-file-structure)
  - [External Dataset](#external-dataset)
- [Credits](#credits)
- [Contact](#contact)

&nbsp;

# Introduction
  ### Description
  SmartApp™ is a trivia application designed for people who love trivia, love to test their knowledge, and/or religiously watch Jeopardy. SmartApp utilizes the Open Trivia Database for it's trivia dataset. Answer Questions. Unlock Achievements. Improve Your Rank. Climb The Leaderboards. Get Smart.

  ### Key Features
  - 250 trivia questions to answer
  - 3 difficulty levels
  - 20 categories
  - User profiles with personalization and privacy settings
  - In depth question based user statistics
  - 56 Unlockable Achievements
  - Performance based experience/leveling system
  - Statistically generated ranks/ratings
  - Interational/Regional/Category Specific Live Leaderboards
  - Community based Vote/Comment system for answered questions
  - Login/Signup secured with Google Identity Toolkit
  - RESTful API functionality using Firebase Cloud Functions
  - Conditional rendering and keyframe animations
  - Fun for the whole family

  ### Goals
  The two main goals of the project is to develop an application that was engaging to the end user, and to challenge my abilities in developing a small to mid sized project. Smart App eventually grew to encompass a wide feature set aimed at driving user interactivity, and will continue to grow as time progresses.

  ### Challenges
  - Creating an effective workflow to get MVP and deliverables completed before a set deadline
  - Deploying systems and abstraction layers for an application that scale with the scope of the project
  - Designing a visual style that is legible and non intrusive
  - Developing a smooth gameplay loop that is easy to follow
  - Refactoring the entire project to utilize with Redux and Firebase
  - Writing effective algorithms that aid with the distribution of user centric data

&nbsp;

<a href="https://github.com/trunkslamchest/smart_app/blob/master/README.md#contents"><img src="https://img.shields.io/badge/^-Back%20To%20Top-000000"></a>

&nbsp;

# Demo

<p align="center">
  <a href="https://www.youtube.com/watch?v=tbCYteYJhAA" target="_blank">
    <img align="center" src="https://img.youtube.com/vi/tbCYteYJhAA/0.jpg">
  </a>
</p>

&nbsp;

<a href="https://github.com/trunkslamchest/smart_app/blob/master/README.md#contents"><img src="https://img.shields.io/badge/^-Back%20To%20Top-000000"></a>

&nbsp;

# Installation
  ### Prerequisites
  Smart App is built using NPM, React, & Firebase. Make sure you have the latest versions of the following components installed before cloning this repo. You can find their official installation guides below:
  - [NPM](https://docs.npmjs.com/getting-started/)
  - [React](https://reactjs.org/docs/getting-started.html)
  - [Firebase](https://firebase.google.com/docs/guides)
  - [Firebase CLI](https://firebase.google.com/docs/cli)

  - [Clone the most recent branch](https://github.com/trunkslamchest/smart_app)
  - Run `npm install` in your bash-enabled terminal to make sure all dependancies are installed
  - Replace fetch request URL's with the appropriate Firebase URLs after you have setup your project on firebase
  - Run `npm start` to locally initalize React on port 3000
    - You can now access Frontend of Smart App by visiting: `http://localhost:3000`

   Thats it! Have fun breaking/fixing/doing whatever you want with Smart App. The world is your oyster!

  **If you have recieved any errors during this process, feel free to contact me so I can help you and update this readme accordingly**

&nbsp;

<a href="https://github.com/trunkslamchest/smart_app/blob/master/README.md#contents"><img src="https://img.shields.io/badge/^-Back%20To%20Top-000000"></a>

&nbsp;

# Summary Of Files
  ### Internal File Structure
  - [docs](https://github.com/trunkslamchest/smart_app/tree/master/docs): Documents for Development Purposes
  - [public](https://github.com/trunkslamchest/smart_app/tree/master/public): Various Assets for General Purposes
  - [src](https://github.com/trunkslamchest/smart_app/tree/master/src): Root Frontend
    - [assets](https://github.com/trunkslamchest/smart_app/tree/master/src/assets): Art Assets
    - [css](https://github.com/trunkslamchest/smart_app/tree/master/src/css): CSS stylesheets
    - [question](https://github.com/trunkslamchest/smart_app/tree/master/src/question): Core Gameplay Loop Functionality
    - [user](https://github.com/trunkslamchest/smart_app/tree/master/src/user): All files pertaining to User Specific Actions
      - [dashboard](https://github.com/trunkslamchest/smart_app/tree/master/src/user/dashboard): User Dashboard Functionality
  - [package.json](https://github.com/trunkslamchest/smart_app/blob/master/package.json): Prerequisite Modules/Dependancies

&nbsp;

  ### External Dataset

  - [Open Trivia Database API](https://opentdb.com/api_config.php): Initial Source of local question database

&nbsp;

<a href="https://github.com/trunkslamchest/smart_app/blob/master/README.md#contents"><img src="https://img.shields.io/badge/^-Back%20To%20Top-000000"></a>

&nbsp;

# Credits
  - [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
  - [Firebase](https://firebase.google.com/)
  - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
  - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - [Open Trivia Database](https://opentdb.com/)
  - [React](https://reactjs.org/)
  - [React Router](https://reacttraining.com/react-router/)
  - [Redux](https://redux.js.org/)
  - [SCSS](https://sass-lang.com/)
  - [The Flatiron School](https://flatironschool.com/)

&nbsp;

<a href="https://github.com/trunkslamchest/smart_app/blob/master/README.md#contents"><img src="https://img.shields.io/badge/^-Back%20To%20Top-000000"></a>

&nbsp;

# Contact
  - austin.smith.dev@gmail.com
  - <a href="https://www.linkedin.com/in/austin-smith-dev/">LinkedIn</a>
  - <a href="https://medium.com/@trunk9slamchest">Medium</a>

&nbsp;
