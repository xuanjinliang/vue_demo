/**
 * Created by xuanjinliang on 2019/04/29.
 */

module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: process.env.NODE_ENV === 'production'
          }
        }
      ]
    }
  }
}
