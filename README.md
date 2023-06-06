# inflow-platform-app

## Mover o contexto de chat para as rotas do proprio chat

## Config

- [x] typescript, map path
- [x] styled-components, types styled-components
- [x] @expo/webpack-config
- [x] dotenv for react-native
- [x] eslint and prettier
- [x] husky, lint staged and commitlint
- [x] react navigation - stack

## Screens

- [x] Login
- [x] Home
- [] Chat

## Functions

- [x] Sign in with Google
- [x] Persistent authentication
- [ ] Integration with Sendbird
- [ ] Login with Sendbird

## All steps

- [x] Create expo project
- [x] Setup project with typescript, eslint and prettier
- [x] Using tailwindcss
- [x] Setup React Navigation
- [x] Implement Firebase authentication with google
- [ ] Integration with Sendbird
  - [ ] Install `yarn add @sendbird/chat`
  - [ ] Install `npx expo install @react-native-async-storage/async-storage`
  - [ ] Create connection to sendbird using **userId**
  - [ ] Create channel (private channel group)
  - [ ] Connect to the Sendbird server
    - [ ] Connect or create user on sendbird server: https://sendbird.com/docs/chat/v4/javascript/application/authenticating-a-user/authentication
  - [ ] Push notification
