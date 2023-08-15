import React from 'react'

const ThemeContext = React.createContext({
  isMode: false,
  changeMode: () => {},
  saveVideoList: [],
  addToSave: () => {},
})

export default ThemeContext
