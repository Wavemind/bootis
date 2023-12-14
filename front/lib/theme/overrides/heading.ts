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
          fontSize: 'xl',
        },
        h2: {
          fontSize: 'xl',
          fontWeight: 'medium',
        },
        h3: {
          fontSize: 'lg',
          fontWeight: 'medium',
        },
        h4: {
          fontSize: 'md',
          fontWeight: 'light',
          fontFamily: 'Arial, sans-serif',
        },
      },
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {},
    },
  },
}
