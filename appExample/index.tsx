import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppExample } from './AppExample'

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<AppExample />)