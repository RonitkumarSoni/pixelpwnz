export default {
  expo: {
    name: 'Signet',
    slug: 'signet-clone',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#0A0A0A',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.pixelpwnz.signet',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundColor: '#0A0A0A',
      },
      package: 'com.pixelpwnz.signet',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-font'],
    // NOTE: eas config is removed for Expo Go compatibility.
    // Add it back when switching to a development build (EAS).
  },
};
