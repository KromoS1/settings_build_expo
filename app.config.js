import app_static_conf from "./app.json";
// import * as Localization from "expo-localization";

const versionCode = 1;
const version = "1.0.0";
const sdkVersion = "49.0.0";

const Identifier = {
  main: "configure_app_part_1.com",
  second: "configure_app_part_2.com",
};

function updateConfig(identifier) {
  return {
    ...app_static_conf,
    expo: {
      ...app_static_conf.expo,
      sdkVersion,
      version,
      versionCode,
      android: { package: identifier, },
      extra: {
        ...app_static_conf.expo.extra,
        name_app: `${app_static_conf.expo.name} ${identifier}`,
        // locale: Localization.locale.slice(0, 2),
      },
    },
  };
}

module.exports = () => {
  switch (process.env.APP_ENV) {
    case "VARIANT_1":
      return updateConfig(Identifier.main);
    case "VARIANT_2":
      return updateConfig(Identifier.second);
  }
};
