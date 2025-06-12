import Waves from "@/components/not-found-page/NotFoundPageComponent";
import Link from "next/link";

 
export default function NotFound() {
  return (
    <div className="h-full min-h-screen bg-black flex flex-col items-center justify-center gap-10">
        <h1 className="text-center text-white text-3xl font-bold z-50">404</h1>
        <p className="text-center text-white text-3xl font-bold z-50">Страница не найдена</p>
        <Link href='/' className="text-center text-white text-md font-medium z-50">Перейдите на главную страницу </Link>
        <Link href='/' className="text-center text-white text-md font-medium z-50">www.etalones.com</Link>
     <Waves
  lineColor="#870B0B"
  backgroundColor="black"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/>
    </div>
  )
}