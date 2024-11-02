import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { breakLinedText } from "../lib/formatText";
import db from '../static/db/experience.json';

export default function Experience() {
  const { t } = useTranslation();

  return (
    <div className={`w-full h-full flex flex-col p-[10px] rounded-lg bg-white overflow-y-auto`}>
      <div>
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
          {db.experience.map((item, idx) =>
            <div key={idx} className="w-full flex justify-between my-[20px]">
              <div className="tracking-[1px] md:tracking-[2px] flex items-end">
                <div class="flex items-center gap-[8px]">
                  <span>{item.company}</span>
                  <span class="text-[12px] sm:text-[14px] text-[gray]">{item.title}</span>
                </div>
              </div>
              <div className="flex gap-2 md:gap-6">
                <div 
                  class="flex gap-[6px] items-center cursor-pointer" 
                  onClick={() => window.open(item.product, '_blank')}
                >
                  <span class="text-[12px] sm:text-[16px] text-green-500">{item.productName}</span>
                </div>
                <div className="md:block hidden">/</div>
                <div className="tracking-[1px] md:tracking-[2px] flex items-center gap-[6px]">
                  {item.period !== '(接案)' && (
                    <span className="text-[12px] md:text-[14px]">{item.date}</span>
                  )}
                  <span class="text-[12px] sm:text-[14px] text-[gray]">{item.period}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[45%]">
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
          {breakLinedText(t('experince.introduce'))}
        </div>
      </div>
    </div>
  )
}