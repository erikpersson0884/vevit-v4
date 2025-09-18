 <img src="./images/vevit-white.png" style="width:20rem;" /> 

## The third (and hopefully final) version of the booking application to book vev in the Sandlådan. 
[![Last Commit][last-commit-shield]][last-commit-url]
[![Build Status][build-shield]][build-url]
[![Repo Size][repo-size-shield]][repo-size-url]
[![Author][author-shield]][author-url]

<!-- ![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen?style=for-the-badge) -->
<!-- [![Stars][stars-shield]][stars-url] -->

## Table of Contents
- [About the project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Built with](#built-with)
- [Getting started](#getting-started)
- [Contribute](#contribute)
- [Acknowledgements](#acknowledgements)

# About the Project
vevIT started as a gag-joke when two recently elected people in <a href="https://fikit.chalmers.it">FikIT</a> could not agree. During that same summer <a href="https://github.com/erikpersson0884">Erik Persson</a> decided to turn the website into a reality with vevIT-v1. However since he did not know anything about web development, it did not turn out very well... 
Three years later, on the 16:th of september 2025 vevIT version 4 was deployed as a stable realisation of the idea, finally letting people book vev in the <a href="https://maps.app.goo.gl/LLm5NugsixquoynM7">Sandlådan</a>.


## Built with
![Vite][vite-shield]
![React][react-shield]
![Vitest][vitest-shield]
![Prisma][prisma-shield]
![Docker][docker-shield]
![TypeScript][typescript-shield]
![Express][express-shield]


## Features
- Book vevs
- User-friendly interface
- Secure authentication
- Real-time updates
- Admin controls

## Screenshots
<img src="./images/vevit-home.png" alt="Home page" style="height:20rem;" />
<img src="./images/vevit-home-mobile.png" alt="Home page - mobile" style="height:20rem;" />
<img src="./images/vevit-login-mobile.png" alt="Login popup - mobile" style="height:20rem;" />
<img src="./images/vevit-vev-mobile.png" alt="Login popup - mobile" style="height:20rem;" />


# Getting started

## Installation

1. Clone the repo
    ```sh
    git clone https://github.com/erikpersson0884/vevit-v4
    ```

2. Install dependencies
    ```
    cd vevit-v4

    npm run install
    ```
3. Set up a development database
    ```sh
    cd server 

    docker run --name vevit-v4 -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=myuser -e POSTGRES_DB=mydb -p 5432:5432 -d postgres

    npx prisma migrate dev

    npx prisma db push
    ```
4. Set environmental variables

    In `./client/.env`
    ```
    VITE_BASE_URL=http://localhost:3001/api
    ```

    In `./server/.env`
    ```
    DATABASE_URL=postgresql://myuser:secretpassword@localhost:5432/mydb?schema=public

    JWT_SECRET=your_jwt_secret
    ```



## Usage
After installation, you simply run the application with a single command from root.
```sh 
npm run dev
```
This runs concurrently:
- Database container (vevit-v4)
- Backend server (server) in development mode
- Frontend (client) in development mode

You can also run each part individually:
```sh
npm run server       # Starts backend only
npm run client       # Starts frontend only
npm run start-database   # Start DB only
npm run stop-database    # Stop DB only
```

For production:
```sh
npm run build        # Build backend and frontend
cd server
npm start            # Run production server
```


# Contribute
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/myCoolFeature`)
3. Commit your Changes (`git commit -m 'Add a very cool feature!'`)
4. Push to the Branch (`git push origin feature/myCoolFeature`)
5. Open a Pull Request


# Acknowledgements
<!-- ![Gustav 'Goose' Asplund][goose-shield]
![Oscar 'Space' Eriksson][space-shield]
![Oscar 'Saxen' Palm][saxen-shield]
![Hanna 'Neinei' Adenholm][neinei-shield] -->

Without the help of a lot of wonderful people, this project would not have been possible! Therefore, there are a few people I would like to acknowledge for their help and support along the way.

First of all, a huge thanks to <a href="https://github.com/GAsplund">Gustav 'Goose' Asplund</a> and <a href="https://github.com/Oscariremma">Oscar 'Space' Eriksson</a> for their enormous help and, not to mention, their encouragement to make this a real website.

Next, I would like to thank <a href="https://github.com/x183">Oscar 'Saxen' Palm</a> for a huge amount of time spent helping me learn, debug, and deploy this and various other pet projects of mine.

A big thanks also goes out to my wonderful girlfriend <a href="https://github.com/Adenholm">Hanna 'Neinei' Adenholm</a> for her guidance on the design of the site, as well as supporting me along the way.

Finally, a big thanks to all the people who encouraged and helped me along the way, always keeping me motivated to finish this project!🩵

<img src="./images/goose.svg" style="height:50px"/>

<img src="./images/space.svg" style="height:50px"/>

<img src="./images/saxen.svg" style="height:50px"/>

<img src="./images/neinei.svg" style="height:50px"/>




<!--  CONFIG FOR README.md   -->

<!-- Repo info Shields -->
[last-commit-shield]: https://img.shields.io/github/last-commit/erikpersson0884/vevit-v4.svg?style=for-the-badge
[last-commit-url]: https://github.com/erikpersson0884/vevit-v4/commits/main
[repo-size-shield]: https://img.shields.io/github/repo-size/erikpersson0884/vevit-v4?style=for-the-badge
[repo-size-url]: https://github.com/erikpersson0884/vevit-v4
[author-shield]: https://img.shields.io/badge/Author-Erik%20Persson-blue?style=for-the-badge
[author-url]: https://github.com/erikpersson0884
[stars-shield]: https://img.shields.io/github/stars/erikpersson0884/vevit-v4?style=for-the-badge
[stars-url]: https://github.com/erikpersson0884/vevit-v4/stargazers
[build-shield]: https://img.shields.io/github/actions/workflow/status/erikpersson0884/vevit-v4/.github/workflows/tests.yml?branch=main&style=for-the-badge
[build-url]: https://github.com/erikpersson0884/vevit-v4/actions


<!-- Frameworks & Languages Shields -->
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white&style=for-the-badge
[react-shield]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge
[next-shield]: https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge
[vitest-shield]: https://img.shields.io/badge/Vitest-3E7CFF?logo=vitest&logoColor=white&style=for-the-badge
[prisma-shield]: https://img.shields.io/badge/Prisma-3178C6?logo=prisma&logoColor=white&style=for-the-badge
[docker-shield]: https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge
[typescript-shield]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge
[express-shield]: https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge


<!-- Contributors shields -->
[goose-shield]: https://img.shields.io/badge/Gustav%20'Goose'%20Asplund-000000?logo=github&logoColor=white&style=for-the-badge
[space-shield]: https://img.shields.io/badge/Oscar%20'Space'%20Eriksson-000000?logo=github&logoColor=white&style=for-the-badge
[saxen-shield]: https://img.shields.io/badge/Oscar%20'Saxen'%20Palm-000000?logo=github&logoColor=white&style=for-the-badge
[neinei-shield]: https://img.shields.io/badge/Hanna%20'Neinei'%20Adenholm-000000?logo=github&logoColor=white&style=for-the-badge




<!-- SADLY README.md dont suport this, so i use images instead

<ul class="acknowledgements-list">
  <li class="acknowledgement-item">
    <img src="https://github.com/GAsplund.png" alt="Gustav 'Goose' Asplund">
    <a href="https://github.com/GAsplund">Gustav "Goose" Asplund</a>
  </li>
  <li class="acknowledgement-item">
    <img src="https://github.com/Oscariremma.png" alt="Oscar 'Space' Eriksson">
    <a href="https://github.com/Oscariremma">Oscar "Space" Eriksson</a>
  </li>
  <li class="acknowledgement-item">
    <img src="https://github.com/x183.png" alt="Oscar 'Saxen' Palm">
    <a href="https://github.com/x183">Oscar "Saxen" Palm</a>
  </li>
  <li class="acknowledgement-item">
    <img src="https://github.com/Adenholm.png" alt="Hanna 'Neinei' Adenholm">
    <a href="https://github.com/Adenholm">Hanna "Neinei" Adenholm</a>
  </li>
</ul>


<style>
  .acknowledgements-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .acknowledgement-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .acknowledgement-item img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }

  .acknowledgement-item a {
    text-decoration: none;
    font-weight: bold;
    color: #c4c4c4ff;
  }
</style>
-->
