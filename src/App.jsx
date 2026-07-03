import React from 'react'
import SocialMediaDemo from './SocialMediaDemo'
import './styles/index.css'
import './styles/App.css'
function App() { return <SocialMediaDemo onBack={() => window.history.back()} /> }
export default App
