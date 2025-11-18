import Link from "next/link";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap w-full justify-between">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="text-4xl font-bold text-gray-100">Mis Tarjetas</h1>
          <p className="text-gray-300 text-lg font-medium">Controla y sigue el progreso de los mazos que tienes</p>
        </div>
        <div className="w-2/12">
          <Link href="/quiz/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded cursor-pointer w-full">
            Crear Tarjeta
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-3">
          <p className="text-xl text-gray-100 font-semibold">Tarjetas</p>          
          <span className="text-2xl text-orange-400 font-bold">6</span>
        </div>
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-3">
          <p className="text-xl text-gray-100 font-semibold">A revisar</p>
          <span className="text-2xl text-green-500 font-bold">2</span>
        </div>        
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="gap-1 flex flex-col">
              <p className="text-xl font-semibold">Japonés T1-T12</p>
              <span className="text-gray-400">245 revisiones</span>
            </div>
            <div className="flex gap-4">
              <button className="text-xl text-gray-400 font-semibold cursor-pointer">E</button>
              <button className="text-xl text-gray-400 font-semibold cursor-pointer">B</button>
            </div>                      
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-gray-400">Progreso</p>
              <span className="text-gray-100 font-semibold">77 %</span>
            </div>
            <div className="relative">
              <div className="w-full h-2 bg-gray-500 rounded-full"></div>
              <div className="absolute w-[77%] bg-blue-600 rounded-full left-0 top-0 h-2"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">            
            <p className="text-gray-400">Revisión en <span className="text-orange-400">2 horas</span></p>            
            <span className="bg-red-500 rounded-full px-2 text-sm font-semibold">Racha de 3</span>
          </div>
          <Link href="/quiz/1" className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer">Estudiar</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;