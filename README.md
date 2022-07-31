# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## How to run app

- check instalation of Git, Node.js and Docker
- open IDE and run

```
git clone https://github.com/Ksarelto/nodejs2022Q2-service.git
```

- checkout to **develop-database** branch

```
git checkout develop-database
```

- install dependencies

```
npm i
```

- (Optional) you can change PORT in _.env_ file setting PORT variable
- mount application in docker contaner:
  - if you want to use common mode use:
  ```
  docker-compose up
  ```
  - if you want to use detached mode use:
  ```
  docker-compose up -d
  ```

The application will start in docker container and will be available on port that was set in **.env** file.
Also app image is stored in [Docker Hub](https://hub.docker.com) you can download it using command:

```
docker pull artsiomusc72/rest-service:nest-typeorm
```

## How to use app

This app is a little music labrary where you can save, update delete tracks, albums, artists, add them to favourites.

For testing tjis application you can use _Postman_ or you can open **https://editor.swagger.io** and copied there data from doc/api.yaml
(if tou change **PORT** variable set new value to **url** field in **server** section)

#### Available requests

| Requests       | Responses                  |
| -------------- | -------------------------- |
| _*Users*_      |                            |
| GET            |                            |
| **/user**      | Return all users           |
| **/user/{id}** | Return user by id          |
| POST           |                            |
| **/user**      | Create new user            |
| PUT            |                            |
| **/user/{id}** | Change user by id with one |
| DELETE         |                            |
| **/user/{id}** | Delete user by id          |

| Requests        | Responses          |
| --------------- | ------------------ |
| _*Albums*_      |                    |
| GET             |                    |
| **/album**      | Return all albums  |
| **/album/{id}** | Return album by id |
| POST            |                    |
| **/album**      | Create new album   |
| PUT             |                    |
| **/album/{id}** | Change album by id |
| DELETE          |                    |
| **/album/{id}** | Delete album by id |

| Requests         | Responses           |
| ---------------- | ------------------- |
| _*Artists*_      |                     |
| GET              |                     |
| **/artist**      | Return all artists  |
| **/artist/{id}** | Return artist by id |
| POST             |                     |
| **/artist**      | Create new artist   |
| PUT              |                     |
| **/artist/{id}** | Change artist by id |
| DELETE           |                     |
| **/artist/{id}** | Delete user by id   |

| Requests        | Responses          |
| --------------- | ------------------ |
| _*Tracks*_      |                    |
| GET             |                    |
| **/track**      | Return all tracks  |
| **/track/{id}** | Return track by id |
| POST            |                    |
| **/track**      | Create new track   |
| PUT             |                    |
| **/track/{id}** | Change track by id |
| DELETE          |                    |
| **/track/{id}** | Delete track by id |

| Requests              | Responses                     |
| --------------------- | ----------------------------- |
| _*Favourites*_        |                               |
| GET                   |                               |
| **/favs**             | Return all favourites         |
| POST                  |                               |
| **/favs/track/{id}**  | Add new track to favourites   |
| **/favs/album/{id}**  | Add new album to favourites   |
| **/favs/artist/{id}** | Add new artist to favourites  |
| DELETE                |                               |
| **/favs/track/{id}**  | Delete track from favourites  |
| **/favs/album/{id}**  | Delete album from favourites  |
| **/favs/artist/{id}** | Delete artist from favourites |

## Testing

If you use detached mode after you run **docker-compose** you can use the same terminal for testing,
if you use common mode so you should open additional terminal and run command for testing there.
You can also scan for vulnearbilities application docker image using command:

```
npm run scan
```

After application running open new terminal and enter:
To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
