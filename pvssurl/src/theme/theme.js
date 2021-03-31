export const pvsTheme = {
    global: {
      drop:{
        background: '#444444',
        shadowSize: 'medium',
      },
      elevation: {
        dark: {
          medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        },
        light: {
          medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        },
      },
      colors: {
        brand: '#6496FA',
        test: 'red',
        text: {
          dark: 'light-1',
          light: 'dark-1'
        },
      },
      font: {
        family: 'Arial',
        size: '20px',
        height: '20px'
      },
      input: {
        weight: 400,
      },
    },
    checkBox:{
      hover:{
        border:{
          color:'brand'
        },
      },
      color:{
        dark: 'brand',
      },
      border:{
        color: 'brand'
      },
      toggle:{
        color:{
          light: 'brand'
        },
      },
    },
    card: {
      container: {
        background: {dark:'dark-2',
                    light: 'light-2'},
        elevation: 'none',
      },
      footer: {
        background: {dark: 'dark-3',
        light: 'light-3'}
      },
    },
    button: {
      border:{
        radius: '12px',
      },
      default: {
        background:{
          color: 'brand',
        },
        color:{dark:'light-1', light: 'dark-1'},
      },
      
    },
  };