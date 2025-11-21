import Image from "next/image"
import Link from "next/link"
import SeedButton from "../dev/SeedButton"

const Navbar = () => {
  return (
    <header className="bg-gray-800 border-gray-700 border-b h-20 flex items-center px-4">
      <div className="max-w-7xl mx-auto w-full">
        <Link href="/" className="flex gap-2 items-center group transition-transform">
          <Image src="/logo.png" alt="Tarjeta logo" width={48} height={48} className="object-contain"></Image>
          <h1 className="text-2xl text-gray-100 font-bold antialiased group-hover:text-white">Decks</h1>
        </Link>
      </div>
      <SeedButton></SeedButton>
    </header>
  )
}

export default Navbar