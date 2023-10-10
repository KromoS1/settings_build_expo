// !! ВАЖНО - выносить функции если они будут нельзя, во время выполнения кода в этом файле, доступа к другим файлам нет.

const versionCode = 1;
const version = "1.0.0";
const sdkVersion = "48.0.0";

const isDev = false;

const Identifier = {
  main: "by.incubator",
  second: "by.incubator.second",
};

const configAndroid = {
  adaptiveIcon: {
    backgroundColor: "#FFFFFF",
  },
};

const applyConfigAndroid = (config, identifier) => ({
  ...config,
  expo: {
    ...config.expo,
    platforms: ["android"],
    plugins: [
      "expo-community-flipper",
      "expo-build-properties",
      "expo-localization",
      {
        android: {
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          buildToolsVersion: "33.0.0",
        },
      },
    ],
    icon: `./assets/${config.expo.extra.logo}/icon_android.png`, //при наличии разных приложений

    version,
    sdkVersion,

    android: {
      package: identifier,
      versionCode,

      permissions: ["CAMERA", "ACCESS_FINE_LOCATION"],
      adaptiveIcon: {
        ...configAndroid.adaptiveIcon,
        foregroundImage: `./assets/${config.expo.extra.logo}/adaptive-icon.png`,
      },
    },
    extra: {
      ...config.expo.extra,
      version,
      isDev, //здесь можно записать любые переменные к которым вы хотите иметь доступ уже после сборки(запуска проекта)
    },
  },
});

const applyConfigIos = (config, identifier) => ({
  ...config,
  expo: {
    ...config.expo,
    platforms: ["ios"],
    plugins: [
      "expo-community-flipper",
      "expo-build-properties",
      "expo-localization",
      {
        ios: {
          deploymentTarget: "14.0",
        },
      },
    ],

    ios: {
      jsEngine: "jsc",
      infoPlist: {
        NSCameraUsageDescription: "",
        NSMicrophoneUsageDescription: "",
      },
      bundleIdentifier: identifier,
      buildNumber: `${versionCode}`, // для ios номер сборки должен обязательно быть строкой
    },

    icon: `./assets/${config.expo.extra.logo}/icon_ios.png`, //при наличии разных приложений

    version,
    sdkVersion,

    extra: {
      ...config.expo.extra,
      version,
      isDev, //здесь можно записать любые переменные к которым вы хотите иметь доступ уже после сборки(запуска проекта)

      baseApiUrl: config.expo.extra.baseApiUrlIos,
    },
  },
});

module.exports = () => {
  switch (process.env.APP_ENV) {
    case "ANDROID":
      return applyConfigAndroid(config_file_main, Identifier.main);

    case "IOS":
      return applyConfigIos(config_file_main, Identifier.main);
  }
};
