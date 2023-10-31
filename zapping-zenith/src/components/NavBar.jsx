// Pensar como hacer este componente solo con astro

// Image
// Version original
import avatar from "../../public/img/avatar.png";
// Mia
//import avatar from "../../public/img/art 2.jfif";

// Porque este caso no funciona y a el si?
// import avatar from "/avatar.png";

// Framework
import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "../util/useMediaQuery";

export default function NavBar() {
  const [toogled, setToggled] = useState(false);
  const matches = useMediaQuery("(min-width: 1280px)");

  return (
    <nav className="relative mx-8 mb-24 flex justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32">
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 "
        width="250"
        height={4}
        viewBox="0 0 250 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L428 2"
          stroke="#282828"
          strokeLinecap="round"
          strokeWidth={2}
        />
      </svg>
      <div>
        <img
          // Version Original
          src={avatar.src}
          // src={avatar}
          alt="Profile picture of Profile"
          className="h-[46px] w-[44px] rounded-full "
        />
      </div>

      {/* Title */}

      <h1 className="xl:ml-52 text-lg font-bold">
        <a href="/">Avcc.</a>
      </h1>

      {/* Check if we are on mobile or not --> ( different pages ) */}
      {matches && (
        <div className="flex gap-12 ">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      )}

      {/* Indicamos que cuando pase el mediaQuery este desaparezca, pero xq no usa tailwind?  */}
      {!matches && (
        // Hamburger Vanilla
        <div
          // Preguntar xq preToggle? --> Esto es debido a que prevToggle se aseguro que el valor siempre sea el mas actualizado de manera que es mas robuta la func
          onClick={() => setToggled((prevToggle) => !prevToggle)}
          // El mediaQuery es otra opcion para esto?
          // className='space-y-1 cursor-pointer xl:hidden'
          className="space-y-1.5 cursor-pointer z-[51] "
        >
          {/* Hamburger transform Cross with framer-motion */}
          <motion.span
            animate={{
              rotateZ: toogled ? 45 : 0,
              y: toogled ? 8 : 0,
            }}
            className="block h-0.5 w-8 bg-black"
          ></motion.span>
          <motion.span
            animate={{ width: toogled ? 0 : 24 }}
            className="block h-0.5 w-6 bg-black"
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toogled ? -45 : 0,
              y: toogled ? -8 : 0,
              width: toogled ? 32 : 16,
            }}
            className="block h-0.5 w-4 bg-black"
          ></motion.span>
        </div>
      )}

      {/* Modal for Hamburger */}
      {toogled && !matches && (
        <div className="fixed bg-white bottom-0 left-0 w-full h-screen flex items-center justify-center z-50">
          <motion.div
            variants={navMotion}
            animate="visible"
            initial="hidden"
            className="flex flex-col gap-24 text-lg"
          >
            <motion.a variants={itemMotion} href="/">
              Home
            </motion.a>
            <motion.a variants={itemMotion} href="/services">
              Services
            </motion.a>
            <motion.a variants={itemMotion} href="/contact">
              Contact
            </motion.a>
          </motion.div>
        </div>
      )}

    </nav>
  );
}

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: -100,
  },
};

{
  /*  Asumo que esta animacion es otra manera de hacer la animacion sin las variables de arriba, pero las de arriba fueron sacadas de internet y son mjrs
  <motion.div
          animate={{
            opacity: 1,
            x: 0,
          }}
          initial={{
            opacity: 0,
            x: 25,
          }}
          className=" fixed bg-white bottom-0 left-0 w-full h-screen flex items-center justify-center"
        ></motion.div> */
}
