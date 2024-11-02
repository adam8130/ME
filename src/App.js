import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useMediaQuery } from './hooks/useMediaQuery'
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import PPT from "./components/PPT";

export default function App() {

  const [activeItem, setActiveItem] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [tabMenuVisible, setTabMenuVisible] = useState(!isMobile)

  useEffect(() => {
    setTabMenuVisible(!isMobile)
  }, [isMobile])

  return (
    <div
      className={`
        w-[100vw]
        h-[100svh]
        flex
        relative
        bg-gradient-to-br from-[rgb(48,168,163)] to-[rgb(16,204,128)]
        p-[10px]
        md:p-[40px_40px]
        gap-[10px]
        overflow-hidden
        text-sm md:text-basic
      `}
    >
      {(tabMenuVisible || !isMobile) && (
        <Sidebar 
          activeItem={activeItem} 
          setActiveItem={setActiveItem}
          setTabMenuVisible={setTabMenuVisible}
          isMobile={isMobile}
        />
      )}
      {isMobile && tabMenuVisible && (
        <div
          className={`
            w-full h-full
            absolute
            top-0 left-0
            right-0 bottom-0
            z-10
          `}
          onClick={() => setTabMenuVisible(!tabMenuVisible)}
        />
      )}
      <motion.div
        key={activeItem}
        className={`
          w-[100%]
          h-full
          rounded-lg
          relative
        `}
        initial={{
          opacity: 0,
          y: '100vh'
        }}
        animate={{
          opacity: 1,
          y: '0',
          transition: { duration: 0.6, type: 'spring' }
        }}
      >
        <button
          className="md:hidden absolute top-[10px] right-[10px] z-[100]"
          onClick={(prev) => setTabMenuVisible(!tabMenuVisible)}
        >
          <Menu/>
        </button>
        {
          activeItem === 0 ? <About /> :
          activeItem === 1 ? <Skills /> :
          activeItem === 2 ? <Portfolio /> :
          activeItem === 3 ? <Experience /> :
          activeItem === 4 ? <PPT /> : <About />
        }
      </motion.div>
    </div>
  );
}