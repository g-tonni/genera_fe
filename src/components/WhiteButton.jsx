function WhiteButton({ text, size }) {
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
    xl: 'text-lg px-10 py-4',
  }

  return (
    <button
      className={`w-full bg-white border-3 border-white text-black font-semibold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer ${sizes[size]}`}
    >
      {text}
    </button>
  )
}

export default WhiteButton
