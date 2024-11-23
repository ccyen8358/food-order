/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // allow @import CSS at-rule to consume local files, node modules or web_modules for inline import 
    'postcss-import': {},
    // default tailwindcss settings by nextjs
    tailwindcss: {},
    // postcss setup for mantine
    // source1: https://mantine.dev/guides/next/#postcss-setup
    // source2: https://mantine.dev/styles/postcss-preset
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};

export default config;
