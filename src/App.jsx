import React, { useState, useCallback, useEffect } from 'react'
import { getTextFromHash, setHashFromText, encodeText, MAX_HASH_LENGTH } from './utils/urlCodec'
import { Header } from './components/Header'
import { Editor } from './components/Editor'

function getInitialText() {
  return getTextFromHash()
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [text, setText] = useState(getInitialText)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const urlTooLong =
    text.length > 0 && encodeText(text).length + 1 > MAX_HASH_LENGTH

  const onUrlSync = useCallback((value) => {
    setHashFromText(value)
  }, [])

  const onClear = useCallback(() => {
    setText('')
    setHashFromText('')
  }, [])

  const onThemeToggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <div className="app">
      <Header
        onClear={onClear}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main className="main">
        <Editor
          value={text}
          onChange={setText}
          onUrlSync={onUrlSync}
          urlTooLong={urlTooLong}
        />
      </main>
      <footer className="footer">
        Your text is stored in the URL. Share the link to share the content.
      </footer>
    </div>
  )
}

export default App
