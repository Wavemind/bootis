export default {
  components: {
    Heading: {
      // style object for base or default style
      baseStyle: {},
      // styles for different sizes ("sm", "md", "lg")
      sizes: {},
      // styles for different visual variants ("outline", "solid")
      variants: {
        h1: {
          fontWeight: 'semibold',
          fontSize: '2xl',
        },
        h2: {
          fontWeight: 'semibold',
          fontSize: 'xl',
        },
        h3: {
          fontWeight: 'medium',
          fontSize: 'lg',
        },
      },
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {},
    },
  },
}
