"use client";

// import DotPattern from "@/components/ui/dot-pattern";
// import Particles from "@/components/ui/particles";
export const BackgroundPattern = () => {

  return (
    <>
    <div
      className="inset-0"
      style={{ backgroundImage: 'url(/main/primary_sh.jpg)', backgroundSize: 'cover', backgroundPosition: 'right' }}
    ></div>
    {/* <Image src="/main/primary_sh.jpg" 
    className="absolute inset-0 object-cover left-0"
    alt={""} width={1600} height={1600} /> */}
      {/* <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]",
          "dark:fill-slate-700"
        )}
      />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={isLightTheme ? "#000" : "#fff"}
        refresh
      /> */}
    </>
  );
};
