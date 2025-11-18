const Quiz = () => {
	return (
		<div className="mx-auto max-w-7xl flex flex-col gap-8">
			<div className="flex flex-wrap w-full justify-between">
				<div className="flex flex-col gap-2 w-full">
					<h1 className="text-4xl font-bold text-gray-100">Título de la Tarjeta</h1>
					<p className="text-gray-300 text-lg font-medium">1 de 34 aprendidas</p>
				</div>
			</div>
			<div className="bg-gray-800 border border-gray-700 p-12 rounded-lg flex flex-col gap-3 w-full h-[calc(100vh-80px-96px-32px-76px)] items-center justify-between">
				<p className="text-gray-100 text-5xl font-medium">Palabro a adivinar</p>
				<div className="flex gap-2">
					<button className="w-30 bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-red-200">Difícil</button>
					<button className="w-30 bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-orange-200">Normal</button>
					<button className="w-30 bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-green-200">Muy fácil</button>
				</div>
			</div>			
		</div>
	)
}

export default Quiz