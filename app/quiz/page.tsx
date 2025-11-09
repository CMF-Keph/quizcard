const Quiz = () => {
	return (
		<div className="mx-auto max-w-7xl flex flex-col gap-8">
			<div className="flex flex-wrap w-full justify-between">
				<div className="flex flex-col gap-2 w-10/12">
					<h1 className="text-4xl font-bold text-gray-100">Título de la Quizcard</h1>
					<p className="text-gray-300 text-lg font-medium">1 de 34 aprendidas</p>
				</div>
			</div>
			<div className="bg-gray-800 border border-gray-700 px-6 py-24 rounded-lg flex flex-col gap-3 w-full h-[calc(100vh-80px-96px-32px-76px)] items-center justify-start">
				<p className="text-gray-100 text-5xl font-medium">Palabro a adivinar</p>
			</div>			
		</div>
	)
}

export default Quiz