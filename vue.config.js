module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "publicPath": process.env.NODE_ENV === 'production' ? '/library' : '/',
  "outputDir": process.env.NODE_ENV === 'production' ? 'dist/library' : 'dist/',
}
