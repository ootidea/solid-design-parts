import url from '@rollup/plugin-url'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import withSolid from 'rollup-preset-solid'

export default withSolid({
  input: 'library/index.tsx',
  targets: ['esm', 'cjs'],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    url(),
  ],
})
