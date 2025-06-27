// import React from "react";

// export interface GlassIconsItem {
//   icon: React.ReactElement;
//   color: string;
//   label: string;
//   customClass?: string;
// }

// export interface GlassIconsProps {
//   items: GlassIconsItem[];
//   className?: string;
// }

// const gradientMapping: Record<string, string> = {
//   redOne: "linear-gradient(90deg,rgba(191, 36, 65, 1) 0%, rgba(138, 0, 25, 1) 100%)",
//   redTwo: "linear-gradient(90deg,rgba(191, 4, 19, 1) 0%, rgba(82, 20, 24, 1) 100%)",
//   grayOne: "linear-gradient(90deg,rgba(28, 29, 38, 1) 0%, rgba(77, 81, 105, 1) 100%)",
//   grayTwo: "linear-gradient(90deg,rgba(132, 140, 139, 1) 0%, rgba(209, 209, 209, 1) 100%)",
//   indigoOne: "linear-gradient(90deg,rgba(99, 139, 191, 1) 0%, rgba(6, 63, 138, 1) 100%)",
//   indigoTwo: "linear-gradient(90deg,rgba(143, 175, 217, 1) 0%, rgba(0, 66, 153, 1) 100%)",
//   indigoThree: "linear-gradient(90deg,rgba(63, 91, 115, 1) 0%, rgba(0, 59, 115, 1) 100%)",
// };

// const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
//   const getBackgroundStyle = (color: string): React.CSSProperties => {
//     if (gradientMapping[color]) {
//       return { background: gradientMapping[color] };
//     }
//     return { background: color };
//   };

//   return (
//     <div
//       className={`grid gap-[5em] md:gap-[10em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible ${
//         className || ""
//       }`}
//     >
//       {items.map((item, index) => (
//         <button
//           key={index}
//           type="button"
//           aria-label={item.label}
//           className={`relative bg-transparent outline-none w-[7em] h-[7em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
//             item.customClass || ""
//           }`}
//         >
//           <span
//             className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
//             style={{
//               ...getBackgroundStyle(item.color),
//               boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
//             }}
//           ></span>

//           <span
//             className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
//             style={{
//               boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
//             }}
//           >
//             <span
//               className="m-auto w-full h-hull flex items-center justify-center drop-shadow-[0_0_1px_#870B0B]"
//               aria-hidden="true"
//             >
//               {item.icon}
//             </span>
//           </span>

//           <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base  md:opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)] ">
//             {item.label}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default GlassIcons;
import { formatLabel } from "@/lib/labels";
import Link from "next/link";
import React from "react";

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  href: string;        
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  redOne: "linear-gradient(90deg,rgba(191, 36, 65, 1) 0%, rgba(138, 0, 25, 1) 100%)",
  redTwo: "linear-gradient(90deg,rgba(191, 4, 19, 1) 0%, rgba(82, 20, 24, 1) 100%)",
  grayOne: "linear-gradient(90deg,rgba(28, 29, 38, 1) 0%, rgba(77, 81, 105, 1) 100%)",
  grayTwo: "linear-gradient(90deg,rgba(132, 140, 139, 1) 0%, rgba(209, 209, 209, 1) 100%)",
  indigoOne: "linear-gradient(90deg,rgba(99, 139, 191, 1) 0%, rgba(6, 63, 138, 1) 100%)",
  indigoTwo: "linear-gradient(90deg,rgba(143, 175, 217, 1) 0%, rgba(0, 66, 153, 1) 100%)",
  indigoThree: "linear-gradient(90deg,rgba(63, 91, 115, 1) 0%, rgba(0, 59, 115, 1) 100%)",
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div
      className={`grid gap-[5em] md:gap-[10em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible ${
        className || ""
      }`}
    >
      {items.map((item, index) => (
        <Link key={index} href={item.href} passHref>
          <div
            aria-label={item.label}
            className={`relative bg-transparent outline-none w-[7em] h-[7em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
              item.customClass || ""
            }`}
          >
            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
              style={{
                ...getBackgroundStyle(item.color),
                boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
              }}
            ></span>

            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
              style={{
                boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
              }}
            >
              <span
                className="m-auto w-full h-hull flex items-center justify-center drop-shadow-[0_0_1px_#870B0B]"
                aria-hidden="true"
              >
                {item.icon}
              </span>
            </span>

            <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base  md:opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)] ">
              {formatLabel(item.label)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GlassIcons;
