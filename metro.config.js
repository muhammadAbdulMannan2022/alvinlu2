const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Keep default transformer/resolver from Expo. We removed SVG handling because
// project will use PNG fallbacks for icons to avoid Metro svg/font asset issues.

module.exports = withNativeWind(config, { input: "./global.css" });
