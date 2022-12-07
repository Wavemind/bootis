// Paddings are defined in sizes, as per this issue :
// https://github.com/chakra-ui/chakra-ui/issues/3293
export default {
  components: {
    Button: {
      // style object for base or default style
      baseStyle: {
        borderRadius: 'full',
        color: 'white',
      },
      // styles for different sizes ("sm", "md", "lg")
      sizes: {
        md: {
          py: 6,
          px: 8,
        },
      },
      // styles for different visual variants ("outline", "solid")
      variants: {
        primary: {
          bg: 'primary',
          _hover: {
            bg: 'primaryHover',
          },
        },
        secondary: {
          bg: 'secondary',
          _hover: {
            bg: 'secondaryHover',
          },
        },
        black: {
          bg: 'black',
          _hover: {
            bg: 'blackHover',
          },
        },
      },
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {},
    },
  },
}
