function OutlineButton({ text, size }) {
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
    xl: 'text-lg px-10 py-4',
  }

  return (
    <button
      className={`font-semibold text-gray-50 border-3 border-gray-50 hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer ${sizes[size]}`}
    >
      {text}
    </button>
  )
}

export default OutlineButton
