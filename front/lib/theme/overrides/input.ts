export default {
  components: {
    Input: {
      // style object for base or default style
      baseStyle: {},
      // styles for different sizes ("sm", "md", "lg")
      sizes: {
        md: {
          field: {
            borderRadius: '2xl',
          },
        },
      },
      // styles for different visual variants ("outline", "solid")
      variants: {
        outline: {
          field: {
            borderColor: 'blue',
            borderWidth: 2,
            _hover: {
              borderColor: 'salmon',
            },
          },
        },
      },
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {},
    },
  },
}
