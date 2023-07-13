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

1. Clone o repositório do projeto: git clone https://github.com/inflowtop/inflow-platform-app
2. Navegue até o diretório do projeto: `cd inflow-platform-app`
3. Instale as dependências do projeto: `yarn`

### Configuração do Firebase

O projeto utiliza algumas ferramentas do firebase como o **firebase storage** para integrar a funcionalidade de envio das imagens (também serve para arquivos) durante a troca de mensagens entre os clientes da Inflow.

1. Entre no console do firebase da Inflow para ter acesso aos arquivos de configuração de cada ambiente (Android, iOS).
2. Para novas features ou correção de bugs, leia as docs do [<u>**react-native-firebase**</u>](https://rnfirebase.io/)

### Configuração do Sendbird

1. Entre na dashboard do sendbird da Inflow para ter acesso as credenciais.

### Variáveis de ambiente necessárias

**Produção**

A aplicação está na conta da Inflow dentro da plataforma da Expo. Todas as configurações de variáveis de ambiente estão na página de **secrets**. [<u>**Clique aqui para acessa**</u>](https://expo.dev/accounts/inflowusa/projects/inflow-platform-app/secrets)

**Desenvolvimento**

Para desenvolvimento local, é necessário configurar o [<u>**direnv**</u>](https://direnv.net/) no projeto, seguindo a documentação, e usar as e copiar as informações abaixo para o arquivo _env_ quer for criado.

```js
export FIREBASE_ANDROID_CLIENT=
export SENDBIRD_APP_ID=
export SENDBIRD_API_TOKEN=
```

## Executando a Aplicação

<ol>
  <li>Tenha instalado o <strong>emulador Android do Android Studio</strong> em sua máquina com o <strong>JDK 11 LTS</strong></li>
  <li>Execute o comando: <code>expo start --dev-client</code></li>
  <ol>
    <li>Em caso de erro, execute os comandos abaixo</li>
    <li><code>npx expo prebuild --clean</code></li>
    <li><code>npx expo run:android</code></li>
    <li>Isso será apenas na primeira vez</li>
  </ol>
</ol>
