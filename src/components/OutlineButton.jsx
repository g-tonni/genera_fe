function OutlineButton({ text }) {
  return (
    <button className="font-semibold text-gray-50 text-xl border-3 border-gray-50 py-4 px-10 hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer">
      {text}
    </button>
  )
}

export default OutlineButton
