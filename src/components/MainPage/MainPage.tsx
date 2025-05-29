import FormCallBack from "../FormCallBack/FormCallBack";
import Hero from "../Hero/Hero";
import Userfull from "../Userfull/Userfull";
import FormSubscribe from "../FormSubscribe/FormSubscribe";
import NewsList from "../News/NewsList/NewsList";
import { MyMarquee } from "../ReviewCard/ReviewCard";

export default function MainPage() {

    function getCurrentDate() {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
      }
    const text= `Актуальные вакансии на ${getCurrentDate()}`
  return (
    <div >    
    <Hero />
    <FormCallBack />
    <div className="text-2xl font-bold text-center text-primary p-2 md:px-10 py-3 md:text-3xl">{text}</div>
    {/* <VacancyList type="all" limit={3} /> */}
    <MyMarquee/>
    <Userfull/>
    <NewsList type="all_news" limit={3} />
    <FormSubscribe/>
    </div>
)}