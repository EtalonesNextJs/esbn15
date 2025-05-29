import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const NavbarPage = () => {
  // Состояние для отслеживания прокрутки
  const [isScrolled, setIsScrolled] = useState(false);

  // Хук для отслеживания прокрутки
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Если прокрутили больше 50px
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Очистка события при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mb-16">
      <nav
        className={`h-16 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary/80 backdrop-blur-sm"
            : "bg-primary"
        }`}
        style={{
          backdropFilter: isScrolled ? "blur(5px)" : "none",
          backgroundColor: isScrolled
            ? "rgba(135, 11, 11, 0.55)"
            : "rgba(135, 11, 11, 1)"
        }}
      >
        <div className="h-full flex items-center justify-between max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPage;
