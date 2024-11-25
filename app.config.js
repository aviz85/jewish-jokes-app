module.exports = ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    eas: {
      projectId: "255bcca3-ba76-43e1-bff4-52bae9de7062"
    }
  }
}); 