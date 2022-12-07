export default {
  components: {
    CalendarDay: {
      baseStyle: {
        color: 'black',
        rounded: 'full',
        p: 5,
        _hover: {
          rounded: 'full',
          bgColor: 'primaryLight',
        },
      },
      variants: {
        selected: {
          bgColor: 'primaryLight',
          color: 'black',
          _hover: {
            bgColor: 'primary',
            color: 'white',
          },
        },
      },
    },

    CalendarControl: {
      parts: ['button'],

      baseStyle: {
        button: {
          color: 'black',
          py: 0,

          _hover: {
            bgColor: 'primaryHover',
            color: 'white',
          },
        },
      },
    },
  },
}
