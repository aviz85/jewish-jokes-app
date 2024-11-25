module.exports = {
  expo: {
    name: "בדיחות יהודיות",
    slug: "jewish-jokes-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.aviz85.jewishjokes",
      versionCode: 1
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "255bcca3-ba76-43e1-bff4-52bae9de7062"
      },
      supabaseUrl: "https://fxvmowmuqidbywkigwft.supabase.co",
      supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dm1vd211cWlkYnl3a2lnd2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjQ5NjEsImV4cCI6MjA0ODE0MDk2MX0.Z6SC0fQWZcIe2taFkDno9CrrN0Zl-ezQs7MbALmKx8Y"
    }
  }
}; 