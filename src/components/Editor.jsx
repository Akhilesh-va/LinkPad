import React, { useCallback, useRef, useEffect } from 'react'
import { encodeText, MAX_HASH_LENGTH } from '../utils/urlCodec'

const DEBOUNCE_MS = 300
/** Inserted when user presses Tab (use \t for code-style indentation). */
const TAB_INSERT = '\t'

export function Editor({ value, onChange, onUrlSync, urlTooLong }) {
  const textareaRef = useRef(null)
  const debounceRef = useRef(null)

  // Debounced URL sync: update hash only after user stops typing for DEBOUNCE_MS
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
      onUrlSync(value)
    }, DEBOUNCE_MS)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, onUrlSync])

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleKeyDown = useCallback(
    (e) => {
      const ta = e.target
      if (!ta || ta !== textareaRef.current) return

      if (e.key === 'Tab') {
        e.preventDefault()
        const start = ta.selectionStart
        const end = ta.selectionEnd
        const before = value.slice(0, start)
        const after = value.slice(end)
        const inserted = TAB_INSERT
        const newValue = before + inserted + after
        onChange(newValue)
        requestAnimationFrame(() => {
          const newPos = start + inserted.length
          ta.setSelectionRange(newPos, newPos)
          ta.focus()
        })
        return
      }

      if (e.key === 'Enter') {
        const start = ta.selectionStart
        const lineStart = value.lastIndexOf('\n', start - 1) + 1
        const lineSoFar = value.slice(lineStart, start)
        const indent = lineSoFar.match(/^[\t ]*/)?.[0] ?? ''
        if (indent) {
          e.preventDefault()
          const before = value.slice(0, start)
          const after = value.slice(start)
          const newValue = before + '\n' + indent + after
          onChange(newValue)
          requestAnimationFrame(() => {
            const newPos = start + 1 + indent.length
            ta.setSelectionRange(newPos, newPos)
            ta.focus()
          })
        }
      }
    },
    [value, onChange]
  )

  const charCount = value.length
  const encodedLength = value ? encodeText(value).length + 1 : 0
  const atLimit = encodedLength >= MAX_HASH_LENGTH

  return (
    <div className="editor-wrap">
      {urlTooLong && (
        <div className="editor-warning" role="alert">
          Text too long to fit in URL. Please shorten it.
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="editor editor--code"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here… Your text is stored in the URL. Share the link to share the content. Use Tab to indent."
        spellCheck="false"
        aria-label="Editor content"
      />
      <div className="editor-meta">
        <span className="editor-meta__chars">{charCount} characters</span>
        <span className={`editor-meta__url ${atLimit ? 'editor-meta__url--warn' : ''}`}>
          URL length: {encodedLength} / {MAX_HASH_LENGTH}
        </span>
      </div>
    </div>
  )
}
