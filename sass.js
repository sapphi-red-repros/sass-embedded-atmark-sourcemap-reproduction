const dartSass = require('sass')
const sassEmbedded = require('sass-embedded')
const path = require( 'path' );

const run = (s, doResolve) =>
  new Promise((resolve, reject) => {
    s.render(
      {
        file: doResolve ? path.resolve('src/foo.scss') : 'src/foo.scss',
        outFile: doResolve ? path.resolve('dist/foo.css') : 'dist/foo.css',
        sourceMap: true
      },
      (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      }
    )
  })

;(async () => {
  console.log('[dart-sass] with resolve')
  const res1 = await run(dartSass, true)
  console.log(res1.map.toString())
  console.log()
  console.log('-----------')

  console.log('[sass-embedded] with resolve')
  const res2 = await run(sassEmbedded, true)
  console.log(res2.map.toString())
  console.log()
  console.log('-----------')

  console.log('[dart-sass] without resolve')
  const res11 = await run(dartSass, false)
  console.log(res11.map.toString())
  console.log()
  console.log('-----------')

  console.log('[sass-embedded] without resolve')
  const res12 = await run(sassEmbedded, false)
  console.log(res12.map.toString())
})()
