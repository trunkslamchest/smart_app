
<p align="center">
  <img width=75% src="https://raw.githubusercontent.com/trunkslamchest/smart_app/master/src/assets/index_logo_blue3.png">
</p>

<p align="center">
  <img align="center" src="https://img.shields.io/badge/CSS-3.0-1572B6">
  <img align="center" src="https://img.shields.io/badge/Firebase-7.15.5-F57C00">
  <img align="center" src="https://img.shields.io/badge/HTML-5.2-E34F26">
  <img align="center" src="https://img.shields.io/badge/Javascript-1.8.5-F7DF1E">
  <img align="center" src="https://img.shields.io/badge/React.JS-16.13.1-61DAFB">
  <img align="center" src="https://img.shields.io/badge/Redux.JS-7.2.0-764ABC">
  <img align="center" src="https://img.shields.io/badge/SCSS-4.14.1-c69">
</p>

<p align="center">
  <img align="center" src="https://img.shields.io/badge/Status-Work%20In%20Progress-000000">
  <a href="https://github.com/trunkslamchest/smartapp/tree/0.72"><img align="center" src="https://img.shields.io/badge/Most%20Recent%20Branch-0.72-000000"></a>
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

&nbsp;

# Introduction
  ### Description
  SmartApp is a trivia application designed for people who love trivia, love to test their knowledge, and/or religiously watch Jeopardy. SmartApp was also developed with an administrative panel that collects user traffic and browsing data in real time, an in-browser database editor. SmartApp utilizes the Open Trivia Database for it's trivia dataset.

  ### Key Features
  - 250 trivia questions to answer
  - 3 difficulty levels
  - 20 categories
  - Statisically generated user ratings
  - Login/Signup secured with bcrypt & JWT Auth
  - Easy to access API functionality using FastJSON API for derivated work
  - Access Restricted administrative panel featuring realtime page & element tracking & in-browser database editor
  - Vote/Comment on trivia questions after answering a question
  - Conditional rendering and keyframe animations
  - Message other users (TBA)
  - Challenge other users to answer questions (TBA)
  - Custom Statisically Analytics Queries for Administrators/Developers (TBA)
  - Fun for the whole family

  ### Goals
  The two main goals of the project is to develop an application that was engaging to the end user, as well as explore potentialities to collect and curate user generated data in real time. 

  ### Challenges
  - Creating an effective workflow to get MVP and deliverables completed before a set deadline
  - Developing an application that is engaging enough for a user to generate enough traffic to collect on the administrative panel
  - Designing a gameplay loop that is easy to follow as well as a visual style that is legible and non intrusive
  - Refactoring large portions of the administrative panel to utilize as little communication between the frontend and backend as possible
  - Deployment

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
