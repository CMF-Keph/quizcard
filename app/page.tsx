const Home = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap w-full justify-between">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="text-4xl font-bold text-gray-100">Mis Quizcards</h1>
          <p className="text-gray-300 text-lg font-medium">Controla y sigue el progreso de los mazos que tienes</p>
        </div>
        <div className="w-2/12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded cursor-pointer w-full">
            Crear nuevo Quizcard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;