import React, { useState, useCallback } from 'react'

const APP_NAME = 'LinkPad'

export function Header({ onClear, theme, onThemeToggle }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = useCallback(() => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {}
    )
  }, [])

  return (
    <header className="header">
      <h1 className="header__title">{APP_NAME}</h1>
      <div className="header__actions">
        {onThemeToggle && (
          <button
            type="button"
            className="header__btn header__btn--icon"
            onClick={onThemeToggle}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        )}
        <button
          type="button"
          className="header__btn"
          onClick={handleCopyLink}
          title="Copy current URL to clipboard"
        >
          {copied ? 'Copied!' : 'Copy Share Link'}
        </button>
        <button
          type="button"
          className="header__btn header__btn--secondary"
          onClick={onClear}
          title="Clear editor and reset URL"
        >
          Clear
        </button>
      </div>
    </header>
  )
}
