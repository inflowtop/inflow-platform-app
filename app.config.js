module.exports = {
  name: 'Inflow',
  slug: 'inflow-platform-app',
  scheme: 'inflow-platform-app',
  owner: 'inflowusa',
  version: '1.0.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.inflowusa.inflowplatformapp',
    googleServicesFile: './GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.inflowusa.inflowplatformapp',
    googleServicesFile: './google-services.json',
    permissions: ['android.permission.RECORD_AUDIO'],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'b62e6d1c-454f-41be-a79b-aafd14ae9d93',
    },
    apiUrl: process.env.API_URL ?? 'https://127.0.1.1:3333',
    sendbirdAppId: process.env.SENDBIRD_APP_ID,
    sendbirdApiToken: process.env.SENDBIRD_API_TOKEN,
    enableHiddenFeatures: false,
  },
  plugins: [
    '@react-native-firebase/app',
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
  ],
}
