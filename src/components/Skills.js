import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next'
import db from '../static/db/skills.json'

export default function Skills() {
  const { t } = useTranslation();
  return (
    <div 
      className={`
        w-full h-full 
        flex flex-col 
        p-[10px] bg-white
        rounded-lg overflow-y-auto
      `}
    >
      <div className="md:h-[60%]">
        <motion.div
          className="p-[10px] text-[28px] border-b"
          initial={{ opacity: 0, x: '-40px' }}
          animate={{ opacity: 1, x: '0' }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-main mr-2">Development</span>
          <span>Skills</span>
        </motion.div>
        <div className="w-full p-[10px]">
          {Object.entries(db.skills).map((item, idx) =>
            <div 
              key={idx} 
              className={`
                w-full
                flex flex-col md:flex-row 
                justify-between 
                text-center md:text-left
                my-[25px] md:my-[15px]
              `}
            >
              <div className="tracking-[2px]">{t(item[0])}</div>
              <div className="tracking-[2px]">{item[1]}</div>
            </div>
          )}
        </div>
      </div>
      <div className="md:h-[40%] flex flex-col">
        <motion.div
          className="p-[10px] text-[28px] border-b"
          initial={{ opacity: 0, x: '-40px' }}
          animate={{ opacity: 1, x: '0' }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-main mr-2">Skills</span>
          <span>Badges</span>
        </motion.div>
        <div className="w-full h-full p-[10px] flex flex-wrap">
          <div className="w-full h-full p-[10px] flex flex-wrap content-start gap-2">
            {db.badges.map((badge, idx) =>
              <img
                key={idx}
                src={badge}
                alt="tech-badge"
                className={`
                  h-[25px]
                  md:h-[20%]
                  lg:h-[22%]
                `}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}