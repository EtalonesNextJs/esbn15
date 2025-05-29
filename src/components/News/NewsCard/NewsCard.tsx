import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { NewsType } from "@/lib/types/interfaces"
import Link from "next/link"

export default function NewsCard( { news }: { news: NewsType }) {
  return (
<Link href={`/news/${news._id}`}>
    <Card className="w-full max-w-[400px] h-full relative">
      <AspectRatio ratio={1 / 1} >
      <Image src={`data:${news.image.contentType};base64,${Buffer.from(news.image.data).toString('base64')}`}
       alt={"Vacancy"} width={400} height={200} />
      </AspectRatio>
      <CardHeader className="my-6">
        <CardTitle className="text-xl">{news?.title}</CardTitle>
        <CardDescription>
          {news?.description}
          </CardDescription>
      </CardHeader >
      {/* <CardContent className="font-semibold flex flex-col gap-2 justify-between mb-7">
        <div className="flex items-center gap-2">
          <MapPinned  className="text-[var(--color-primary)]" />
          <p className="text-xl">{vacancy?.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <HandCoins  />
          <p className="text-xl">{vacancy?.salary}</p>
        </div>
        <div className="flex items-center gap-2">
          <Home/>
        <p>{vacancy?.homePrice}</p>
        </div>
        {vacancy?.drivePermis?.length > 0 && (
  <p>Требуется водительское удостоверение категории: {vacancy.drivePermis.join('; ')}</p>
)}
      {vacancy?.documents?.length > 0 && (
  <p>
    Документы:{" "}
    {vacancy.documents
      .join('; ')
      .split('; ')
      .map((doc:any, index: any) => (
        <span key={index}>
          {doc}
          <br />
        </span>
      ))}
  </p>
)}

      </CardContent> */}
      <CardFooter className="absolute bottom-2 w-full">
      <Button >Подробнее</Button>
    
      </CardFooter>
    </Card>
    </Link>
)}