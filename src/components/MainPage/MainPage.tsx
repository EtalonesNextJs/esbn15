import FormCallBack from "../FormCallBack/FormCallBack";
import Hero from "../Hero/Hero";
import Userfull from "../Userfull/Userfull";
import FormSubscribe from "../FormSubscribe/FormSubscribe";
import NewsList from "../News/NewsList/NewsList";
import CurrentDateText from "../CurrentDateText/CurrentDateText";
import { VacancyType } from "@/lib/types/vacancy";
import { MyMarquee } from "../MyMarquee/MyMarquee";

export default async function MainPage() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/all`, {
    cache: "force-cache", 
  });

  const vacancies: VacancyType[] = await res.json();
    
  return (
    <div >    
    <Hero />
    <FormCallBack />
<CurrentDateText />
    <MyMarquee vacancies={vacancies}/>
    <Userfull/>
    <NewsList type="all_news" limit={3} />
    <FormSubscribe/>
    </div>
)}