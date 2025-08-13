import React from 'react'

const Switch = ({ checked, onChange, label, disabled = false }) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-white/20'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      {label && (
        <span className="ml-3 text-sm text-white/80">{label}</span>
      )}
    </div>
  )
}

export default Switch
