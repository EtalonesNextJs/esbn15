import FormCallBack from "../FormCallBack/FormCallBack";
import Hero from "../Hero/Hero";
import Userfull from "../Userfull/Userfull";
import FormSubscribe from "../FormSubscribe/FormSubscribe";
import NewsList from "../News/NewsList/NewsList";
import { MyMarquee } from "../ReviewCard/ReviewCard";
import CurrentDateText from "../CurrentDateText/CurrentDateText";

export default function MainPage() {

    
  return (
    <div >    
    <Hero />
    <FormCallBack />
<CurrentDateText />
    <MyMarquee/>
    <Userfull/>
    <NewsList type="all_news" limit={3} />
    <FormSubscribe/>
    </div>
)}