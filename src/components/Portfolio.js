import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Globe2 } from 'lucide-react';
import { useScrollFullpage } from '../hooks/useScrollFullpage';
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '../hooks/useMediaQuery';
import db from '../static/db/portfolio.json';

const Portfolio = forwardRef((_, rootRef) => {
  const isXsMobile = useMediaQuery('(max-width: 420px)');
  const { ref } = useScrollFullpage();
  const { t } = useTranslation();

  return (
    <div
      ref={rootRef}
      className="w-full h-full"
    >
      <div
        ref={ref}
        className={`
          w-full h-full
          rounded-lg bg-white
          overflow-y-auto
          p-[10px]
        `}
      >
        {db.portfolio.map((item, idx) =>
          <div key={idx} className={`w-full h-full flex flex-col`}>
            <div className="p-[10px] border-b">
              <span className="text-[28px] text-main">
                {item.name}
              </span>
            </div>
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-[60%] p-[10px] mt-[10px] mr-[10px] flex flex-col">
                <div className="flex flex-wrap items-start justify-around">
                  {item.images.map((item, idx) =>
                    <img
                      key={idx}
                      src={require('../static/images/' + item.file)}
                      style={{ width: item.size }}
                      alt="Portfolio"
                    />
                  )}
                </div>
                <div className="w-full h-full flex md:mt-0 mt-[20px] justify-around items-center sh">
                  <motion.button
                    className="flex px-[20px] py-[5px] md:py-[10px] gap-[15px] rounded-[25px] border border-gray-500"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 8px #60c6db', border: '1px solid #60c6db' }}
                    onClick={() => item.github && window.open(item.github, '_blank')}
                  >
                    <Github />
                    <span>{item.github ? 'Github' : 'Not Available'}</span>
                  </motion.button>
                  <motion.button
                    className="flex px-[20px] py-[5px] md:py-[10px] gap-[15px] rounded-[25px] border border-gray-500"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 8px #60c6db', border: '1px solid #60c6db' }}
                    onClick={() => item.website && window.open(item.website, '_blank')}
                  >
                    <Globe2 />
                    <span>{item.website ? 'Website' : 'Not Available'}</span>
                  </motion.button>
                </div>
              </div>
              <div className="w-full md:w-[40%] pl-[20px] pr-[10px] flex flex-col my-[10px] md:border-l">
                <div className="flex-1">
                  <span className="text-[28px] text-main">
                    Introduce
                  </span>
                  <p className="mt-[10px] tracking-[2px] font-light">
                    {t(`portfolio.${item.description}`)}
                  </p>
                </div>
                {!isXsMobile && (
                  <div className='mt-[20px] md:mt-0 flex-1 shrink-[2]'>
                    <span className="text-[28px] text-main">
                      Badges
                    </span>
                    <div className="flex flex-wrap justify-around mt-[10px]">
                      {item.badges.map((item, idx) =>
                        <img
                          key={idx}
                          src={`https://img.shields.io/badge/${item.label}-gray?style=social&logo=${item.logo}&color=rgb(32%2C%2035%2C%2043)`}
                          alt="tech-badge"
                          className={`
                            h-[20px]
                            md:h-[30px]
                            m-[10px]
                            xl:h-[40px]
                          `}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default Portfolio;
