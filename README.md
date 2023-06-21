# Documentação do Inflow Chat

## Visão Geral

O projeto consiste em uma aplicação de chat 1-1 que conecta usuários de uma plataforma existente da empresa Inflow. A plataforma permite que pessoas que fornecem serviços se cadastrem para oferecer seus serviços, enquanto pessoas em busca desses serviços podem se conectar com os prestadores através do chat. A aplicação utiliza o SDK JavaScript do Sendbird para facilitar a comunicação entre os usuários.

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript

## Dependências

Certifique-se de ter as seguintes dependências instaladas para executar o projeto:

- Node.js
- EAS CLI
- Firebase
- Sendbird

## Configuração

### Instalação

1. Clone o repositório do projeto: git clone <URL_DO_REPOSITÓRIO>
2. Navegue até o diretório do projeto: `cd inflow-platform-app`
3. Instale as dependências do projeto: `yarn`

### Configuração do Firebase

1. Crie um projeto no Firebase (https://firebase.google.com) e obtenha as credenciais necessárias.

### Configuração do Sendbird

1. Crie uma conta no Sendbird (https://sendbird.com) e crie um novo aplicativo.

### Env variables

```js
  FIREBASE_ANDROID_CLIENT=""
  SENDBIRD_APP_ID=""
  SENDBIRD_API_TOKEN=""
```

## Executando a Aplicação

1. Execute o comando: `expo start --dev-client`
2. Acesse o aplicativo através do Expo Developer Tools no navegador.
3. Utilize um emulador de dispositivo móvel ou instale o aplicativo Expo Go em um dispositivo físico para testar a aplicação.

## Funcionalidades

A aplicação possui as seguintes funcionalidades:

- Autenticação com o Google através do Firebase.
  Conexão entre usuários da plataforma Inflow através do chat 1-1.
- Envio de mensagens em tempo real utilizando o - SDK JavaScript do Sendbird.
  Listagem de conversas e histórico de mensagens.
