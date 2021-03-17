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
          dark: 'lightgrey',
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
          color:{dark:'brand'},
        },
      },
      color:{
        dark: 'brand',
      },
      border:{
        color:{dark:'brand'},
      },
      toggle:{
        color:{
          light: 'brand',
        },
      },
    },
    card: {
      container: {
        background: {dark:'#FFFFFF12'},
        elevation: 'none',
      },
      footer: {
        background: '#FFFFFF06',
      },
    },
    button: {
      border:{
        radius: '12px',
      },
      default: {
        background:{
          color: {dark:'brand'},
        },
        color:{dark:'lightgrey', light: 'lightgrey'},
      },
      
    },
  };