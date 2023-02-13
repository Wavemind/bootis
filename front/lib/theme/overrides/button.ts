// Paddings are defined in sizes, as per this issue :
// https://github.com/chakra-ui/chakra-ui/issues/3293
export default {
  components: {
    Button: {
      // style object for base or default style
      baseStyle: {
        borderRadius: 'full',
        color: 'white',
        fontFamily: 'Noir Pro Medium, sans-serif',
      },
      // styles for different sizes ("sm", "md", "lg")
      sizes: {
        sm: {
          py: 0,
          px: 4,
          fontSize: 'sm',
          fontWeight: 'light',
          lineHeight: 0,
        },
        md: {
          py: 6,
          px: 8,
          fontSize: 'md',
        },
      },
      // styles for different visual variants ("outline", "solid")
      variants: {
        default: {
          bg: 'grey',
        },
        primary: {
          bg: 'blue',
          _hover: {
            bg: 'blueHover',
          },
        },
        teal: {
          bg: 'teal',
          _hover: {
            bg: 'grey',
          },
        },
        salmon: {
          bg: 'salmon',
          _hover: {
            bg: 'grey',
          },
        },
        turquoise: {
          bg: 'turquoise',
          _hover: {
            bg: 'grey',
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
