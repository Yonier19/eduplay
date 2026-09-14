import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'eduplay',
    themes: {
      eduplay: {
        dark: false,
        colors: {
          primary: '#6750A4',
          secondary: '#625B71',
          accent: '#7D5260',
          background: '#F7F5FA',
          surface: '#FFFFFF',
          success: '#4CAF50',
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3',
        },
      },
    },
  },

  icons: {
    defaultSet: 'mdi',
  },
})
