function BlackButton({ text }) {
  return (
    <button className="bg-black border-3 border-black text-gray-50 font-semibold text-xl py-4 px-10 shadow-2xl hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer">
      {text}
    </button>
  )
}

export default BlackButton
