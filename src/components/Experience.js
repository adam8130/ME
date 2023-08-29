import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { breakLinedText } from "../lib/formatText";
import db from '../static/db/experience.json';

export default function Experience() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className={`w-full h-full flex flex-col p-[10px] rounded-lg bg-white`}>
      <div className="h-[50%]">
        <motion.div
          className="p-[10px] text-[28px] border-b"
          initial={{ opacity: 0, x: '-40px' }}
          animate={{ opacity: 1, x: '0' }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-main mr-2">Work</span>
          <span>Experience</span>
        </motion.div>
        <div className="w-full p-[10px]">
          {Object.entries(db.experience).map((item, idx) =>
            <div key={idx} className="w-full flex justify-between my-[15px]">
              <div className="tracking-[2px]">{item[0]}</div>
              <div className="tracking-[2px]">{item[1]}</div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[50%]">
        <motion.div
          className="p-[10px] text-[28px] border-b"
          initial={{ opacity: 0, x: '-40px' }}
          animate={{ opacity: 1, x: '0' }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-main mr-2">Introduce</span>
          <span>Experience</span>
        </motion.div>
        <div className="w-full p-[10px] tracking-[2px]">
          {breakLinedText(t('experince.introduce'), { disabled: isMobile })}
        </div>
      </div>
    </div>
  )
}