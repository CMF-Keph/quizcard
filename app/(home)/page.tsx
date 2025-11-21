import Link from "next/link";
import DeckGrid from "./DeckGrid";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap w-full justify-between">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="text-4xl font-bold text-gray-100">Mis mazos</h1>
          <p className="text-gray-300 text-lg font-medium">Controla y sigue el progreso de los mazos que tienes</p>
        </div>
        <div className="w-2/12 text-right">
          <Link href="/deck/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded cursor-pointer inline-block">
            Crear mazo
          </Link>
        </div>
      </div>
      <DeckGrid></DeckGrid>
    </div>
  )
}

export default Home;