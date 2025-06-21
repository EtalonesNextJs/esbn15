
import { CustomIcons } from '@/components/icons/iconsHome';

export const links = [
  {
    name: 'Начало',
    hash: '#home',
  },
  {
    name: 'О работе',
    hash: '#about',
  },
  {
    name: 'Блог',
    hash: '#experience',
  },
  {
    name: 'Похожие вакансии',
    hash: '#projects',
  },
  {
    name: 'Анкета',
    hash: '#contact',
  },
] as const;





export const skillsData = [
  { icon: <CustomIcons.mashineWash className="size-12"  /> },
  { icon: <CustomIcons.harness className="size-12" /> },
  { icon: <CustomIcons.recliner className="size-12" /> },
  { icon: <CustomIcons.homeChecked className="size-12" /> },
  { icon: <CustomIcons.homeConected className="size-12" /> },
  { icon: <CustomIcons.shitOnHanger className="size-12" /> },
  { icon: <CustomIcons.briberi className="size-12" /> },
  { icon: <CustomIcons.soda className="size-12" /> },
  { icon: <CustomIcons.hTemperature className="size-12" /> },
  { icon: <CustomIcons.ladle className="size-12" /> },
  { icon: <CustomIcons.postCode className="size-12" /> },
  { icon: <CustomIcons.piping className="size-12" /> },
 
] as const;
