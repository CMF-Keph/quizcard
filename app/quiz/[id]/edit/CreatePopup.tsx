const CreatePopup = () => {
  return (
    <form className="flex flex-col gap-8 w-full text-gray-100">
      <div className="flex flex-col gap-2">
        <label htmlFor="front" className="text-lg font-semibold">Anverso</label>
        <input type="text" name="front" id="front" placeholder="Piscina" className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-lg"></input>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="back" className="text-lg font-semibold">Reverso</label>
        <input type="text" name="back" id="back" placeholder="Pool" className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-lg"></input>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="back" className="text-lg font-semibold">Etiquetas</label>
        <input type="text" name="back" id="back" placeholder="Tema 1" className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-lg"></input>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded cursor-pointer w-full">
        Crear tarjeta
      </button>
    </form>
  )
}

export default CreatePopup