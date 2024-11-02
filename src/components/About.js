import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { breakLinedText, textWithIndentSymbol } from '../lib/formatText';
import db from '../static/db/about';

export default function About() {

  const { t } = useTranslation();
  const fieldItems = t('about.field', { returnObjects: true });

  return (
    <div className={`flex h-full gap-[10px]`}>
      <motion.div
        className={`
          w-[30%]
          h-full
          md:flex
          flex-col
          rounded-lg
          items-center
          bg-white
          hidden
        `}
        initial={{ scale: 1 }}
        animate={{ scale: 1.03 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div
          className={`
            h-[55%]
            w-full
            overflow-hidden
            rounded-lg
          `}
        // style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
        >
          <img
            className="object-cover object-[0_-100px]"
            src={require('../static/images/Me.jpg')}
            alt=''
          />
        </div>
        <h2 className="mt-[15px] text-[36px] tracking-[2px]">
          {db.name}
        </h2>
        <h3 className="mb-[5px] font-[500] tracking-[1px] text-main">
          {db.title}
        </h3>
        <div className="flex gap-[15px]">
          <motion.div
            className="cursor-pointer rounded-[50%] p-[10px]"
            whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px #60c6db', transition: { duration: 0.1 } }}
            onClick={() => window.open(db.github, '_blank')}
          >
            <Github />
          </motion.div>
          <motion.div
            className="cursor-pointer rounded-[50%] p-[10px]"
            whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px #60c6db', transition: { duration: 0.1 } }}
            onClick={() => window.open(db.linkedin, '_blank')}
          >
            <Linkedin />
          </motion.div>
          <motion.div
            className="cursor-pointer rounded-[50%] p-[10px]"
            whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px #60c6db', transition: { duration: 0.1 } }}
            onClick={() => window.location.href = `mailto:${db.email}`}
          >
            <Mail />
          </motion.div>
          <motion.div
            className="cursor-pointer rounded-[50%] p-[10px]"
            whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px #60c6db', transition: { duration: 0.1 } }}
            onClick={() => window.location.href = `tel:${db.phobe}`}
          >
            <Phone />
          </motion.div>
        </div>
      </motion.div>
      <div
        className={`
          w-full
          md:w-[70%]
          h-full
          p-[10px]
          rounded-lg
          bg-white
          flex
          flex-col
          overflow-y-auto
        `}
      >
        <div className="flex-1">
          <motion.div
            className="p-[10px] text-[28px] border-b"
            initial={{ opacity: 0, x: '-40px' }}
            animate={{ opacity: 1, x: '0' }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-main mr-2">About</span>
            <span>Me</span>
          </motion.div>
          <div className="p-[10px] font-light tracking-[1px]">
            <div className="flex justify-around mt-[10px] mb-[20px]">
              <img
                className="h-[40vw] md:hidden"
                src={require('../static/images/Me.jpg')}
                alt=''
              />
              <ul className="text-center flex flex-col justify-around md:hidden">
                <li>{db.name}</li>
                <li>{db.title}</li>
                <li>{db.email}</li>
                <li
                  className="cursor-pointer" 
                  onClick={() => window.open(db.github, '_blank') }
                >
                  Github
                </li>
              </ul>
            </div>
            {breakLinedText(t('about.me'))}
            {fieldItems.map((item, idx) => 
              textWithIndentSymbol(t(item), ' - ', idx)
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <motion.div
            className="p-[10px] text-[28px] border-b"
            initial={{ opacity: 0, x: '-40px' }}
            animate={{ opacity: 1, x: '0' }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-main mr-2">My</span>
            <span>Services</span>
          </motion.div>
          <div className="py-[10px] h-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-[50%] p-[10px] flex flex-col items-center md:border-r">
              <div className="w-[80px] h-[80px] rounded-[50%] flex justify-center items-center bg-main">
                <Code size={45} color='white' />
              </div>
              <h2 className="my-[10px] text-[20px] tracking-[1px] text-center">Web Development</h2>
              <h3 className="text-gray-400 text-center">Modern and mobile-ready website</h3>
              <div className="flex flex-col gap-[5px] mt-[10px] md:hidden">
                <a 
                  className="border border-solid border-gray-400 rounded-lg text-center p-[5px]" 
                  href={`mailto:${db.email}`}
                >
                  Send me an email
                </a>
              </div>
            </div>
            <div className="w-full md:w-[50%] p-[10px] md:block hidden">
              {Object.entries(db.info).map((item, idx) =>
                <div key={idx} className="flex justify-between items-center">
                  <div className="py-[5px] px-[10px] my-[5px] rounded-md bg-active text-gray-100">
                    {t(item[0])}{' : '}
                  </div>
                  <div className="text-gray-700">{t(item[1])}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}