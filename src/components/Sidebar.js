import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code2, ScrollText, User2, Projector, Settings, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTooltip } from '../hooks/useTooltip'
import i18n from 'i18next'

export default function Sidebar({ 
  activeItem,
  setActiveItem,
  setTabMenuVisible,
  isMobile
}) {

  const { t } = useTranslation();
  const [isENLng, setIsENLng] = useState(i18n.language === 'en');

  const { ref: settingsRef, Tooltip: SettingsTooltip } = useTooltip(t('Click here to change language'), { 
    offsetX: 10, offsetY: 10, disable: isMobile
  });
  const { ref: pptRef, Tooltip: PPTTooltip } = useTooltip(t('Click here to watch automatic slide show'), { 
    delay: 5000, offsetX: 10, offsetY: 10, disable: isMobile
  });

  const sidebarItem = [
    {
      index: 0,
      label: t('common.About'),
      icon: User2,
      function: () => setActiveItem(0)
    },
    {
      index: 3,
      label: t('common.Experience'),
      icon: ScrollText,
      function: () => setActiveItem(3)
    },
    {
      index: 1,
      label: t('common.Skills'),
      icon: Code2,
      function: () => setActiveItem(1)
    },
    {
      index: 2,
      label: t('common.Portfolio'),
      icon: BookOpen,
      function: () => setActiveItem(2)
    },
    {
      index: 4,
      label: t('common.PPT'),
      icon: Projector,
      function: () => setActiveItem(4)
    },
  ]

  return (
    <div
      className={`
        ${isMobile ? 'absolute' : 'relative'}
        ${isMobile && 'top-[10px]'}
        ${isMobile && 'left-[10px]'}
        flex
        flex-col 
        h-max 
        rounded-lg 
        bg-white
        z-[11]
      `}
    >
      {sidebarItem.map((item, idx) =>
        <motion.div
          ref={
            idx === 4 ? pptRef :
            idx === 5 ? settingsRef : null
          }
          key={idx}
          className={`
            m-[10px]
            text-center
            flex
            flex-col
            items-center
            gap-[5px]
            p-[5px]
            cursor-pointer
            rounded-lg
            transition
            text-[12px]
            font-light
            border-b
            whitespace-nowrap
            ${activeItem === item.index && 'bg-main/20'}
            ${activeItem === item.index && 'text-active'}
          `}
          whileHover={{
            scale: 1.1,
            boxShadow: '0px 0px 8px #60c6db',
            transition: { duration: 0.1 },
          }}
          onClick={() => {
            item.function();
            (idx !== 5 && isMobile) && setTabMenuVisible(false);
          }}
        >
          <item.icon className="text-sky-500" size={28} />
          <span>{item.label}</span>
          {idx === 4 && PPTTooltip}
          {idx === 5 && SettingsTooltip}
        </motion.div>
      )}
      <motion.div
        className={`
          flex flex-col items-center
          m-[10px] gap-[5px] p-[5px]
          text-[12px] font-light text-center
          rounded-lg border-b transition
          cursor-pointer
          ${isENLng && 'text-active'}
        `}
        whileHover={{
          scale: 1.1,
          boxShadow: '0px 0px 8px #60c6db',
          transition: { duration: 0.1 },
        }}
        onClick={() => {
          i18n.changeLanguage(!isENLng ? 'en' : 'zh');
          setIsENLng(prev => !prev);
          isMobile && setTabMenuVisible(false);
        }}
      >
        <Globe className={'text-sky-500'} size={28} />
        <span>
          {!isENLng ? t('common.English') : t('common.Chinese')}
        </span>
      </motion.div>
    </div>
  )
}