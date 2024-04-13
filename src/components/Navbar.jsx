import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"
 
const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width items-center justify-between ">
        <img src={appleImg} alt="Logo"  width={18} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <a key={item} href="#" className="mx-4 text-pointer text-white hover:text-gray-400 transition-all">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-7">
          <img src={searchImg} alt="Search" width={18} height={18}/>
          <img src={bagImg} alt="bag" width={18} height={18}/>

        </div>
      </nav>
    </header>
  )
}

export default Navbar
