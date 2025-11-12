const Create = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex flex-col gap-2 w-6/12">
          <h1 className="text-4xl font-bold text-gray-100">Crea un nuevo mazo</h1>
          <p className="text-gray-300 text-lg font-medium">¡Rellena los campos y listo!</p>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center">
        <form className="flex flex-col gap-8 w-6/12 text-gray-100">
          <div className="flex flex-col gap-2">
            <label htmlFor="deckName" className="text-lg font-semibold">Nombre del mazo</label>
            <input type="text" name="deckName" id="deckName" placeholder="Ej: Japonés - Minna no Nihongo" className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg"></input>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="deckDescription" className="text-lg font-semibold">Descripción <span className="text-sm text-gray-400">(opcional)</span></label>
            <textarea name="deckDescription" id="deckDescription" placeholder="Mazo para estudiar el volabulario del Minna no Nihongo 1" className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg max-h-26 min-h-12"></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="deckDefaultEasiness" className="text-lg font-semibold">Facilidad inicial</label>
            <input type="number" name="deckDefaultEasiness" id="deckDefaultEasiness" value={2.5} placeholder="Ej: 2,5" disabled step={0.1} className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg"></input>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded cursor-pointer w-full">
            Crear Quizcard
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create