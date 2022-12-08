export default {
  components: {
    CalendarDay: {
      baseStyle: {
        color: 'black',
        rounded: 'full',
        p: 5,
        _hover: {
          rounded: 'full',
          bgColor: 'blueLight',
        },
      },
      variants: {
        selected: {
          bgColor: 'blueLight',
          color: 'black',
          _hover: {
            bgColor: 'blue',
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
            bgColor: 'blueHover',
            color: 'white',
          },
        },
      },
    },
  },
}
