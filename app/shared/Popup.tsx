interface PopupProps {
  children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({children}) => {
  return (
    <div className="bg-black/40 w-screen h-screen absolute top-0 left-0 flex flex-wrap justify-between items-center z-50">
      <div className="w-3/6 h-3/6 bg-gray-900 border border-gray-700 rounded-lg">
        <div className="border-b border-gray-700 p-4">
          <h2>Título del Popup</h2>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Popup