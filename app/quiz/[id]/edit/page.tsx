
const Edit = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="text-4xl font-bold text-gray-100">Título</h1>
          <p className="text-gray-300 text-lg font-medium">34 cartas</p>
        </div>
        <div className="w-2/12">
          <button className="bg-red-800 text-xl hover:bg-red-900 p-2 rounded-lg cursor-pointer w-full">Borrar Quiz</button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="px-4 py-2 gap-4 grid grid-cols-5 border border-gray-700 text-gray-300 font-semibold bg-gray-950 rounded-t-lg">
          <p>Anverso</p>
          <p>Reverso</p>
          <p>Estado</p>
          <p>Etiquetas</p>
          <p>Acciones</p>
        </div>
        <div className="grid grid-cols-5 border-b odd:bg-gray-800 border-x p-4 gap-4 last:rounded-b-lg border-gray-700 text-gray-100 text-medium bg-gray-900 items-center">
          <p>わたし</p>
          <p>Yo</p>
          <p>Nueva</p>
          <p className="grid grid-cols-3 gap-2 overflow-auto text-xs">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Minna no Nihongo</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
          </p>
          <p className="text-right">
            <button className="hover:bg-blue-800 cursor-pointer bg-blue-700 p-2 text-xs rounded-lg">Editar</button>
          </p>
        </div>
        <div className="grid grid-cols-5 border-b odd:bg-gray-800 border-x p-4 gap-4 last:rounded-b-lg border-gray-700 text-gray-100 text-medium bg-gray-900 items-center">
          <p>わたし</p>
          <p>Yo</p>
          <p>Nueva</p>
          <p className="grid grid-cols-3 gap-2 overflow-auto text-xs">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Minna no Nihongo</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
          </p>
          <p className="text-right">
            <button className="hover:bg-blue-800 cursor-pointer bg-blue-700 p-2 text-xs rounded-lg">Editar</button>
          </p>
        </div>
        <div className="grid grid-cols-5 border-b odd:bg-gray-800 border-x p-4 gap-4 last:rounded-b-lg border-gray-700 text-gray-100 text-medium bg-gray-900 items-center">
          <p>わたし</p>
          <p>Yo</p>
          <p>Nueva</p>
          <p className="grid grid-cols-3 gap-2 overflow-auto text-xs">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Minna no Nihongo</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
          </p>
          <p className="text-right">
            <button className="hover:bg-blue-800 cursor-pointer bg-blue-700 p-2 text-xs rounded-lg">Editar</button>
          </p>
        </div>
        <div className="grid grid-cols-5 border-b odd:bg-gray-800 border-x p-4 gap-4 last:rounded-b-lg border-gray-700 text-gray-100 text-medium bg-gray-900 items-center">
          <p>わたし</p>
          <p>Yo</p>
          <p>Nueva</p>
          <p className="grid grid-cols-3 gap-2 overflow-auto text-xs">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Minna no Nihongo</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis bg-blue-950 p-1 rounded">Tema 1</span>
          </p>
          <p className="text-right">
            <button className="hover:bg-blue-800 cursor-pointer bg-blue-700 p-2 text-xs rounded-lg">Editar</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Edit