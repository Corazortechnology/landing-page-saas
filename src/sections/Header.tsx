import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
import MenuIcon from "@/assets/menu.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="size-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas Logo" height={40} width={40} />
            <MenuIcon className="size-4 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <Link href="/about">About</Link>
              <Link href="/features">Features</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/customers">Customers</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/book-appointment">Book an Appointment</Link>
              <Button className="tracking-tight">Get for free</Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
// export const Header = () => {
//   return (
//     <header className="sticky top-0 backdrop-blur-sm z-20">
//       <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
//         <p className="text-white/60 hidden md:block">
//           Streamline your workflow and boost your productivity
//         </p>
//         <div className="inline-flex gap-1 items-center">
//           <p>Get started for free</p>
//           <ArrowRight className="size-4 inline-flex justify-center items-center" />
//         </div>
//       </div>
//       <div className="py-5">
//         <div className="container">
//           <div className="flex items-center justify-between">
//             <Image src={Logo} alt="Saas Logo" height={40} width={40} />
//             <MenuIcon className="size-4 md:hidden" />
//             <nav className="hidden md:flex gap-6 text-black/60 items-center">
//               <a href="./ProductShowcase.tsx">About</a>
//               <a href="#">Features</a>
//               <a href="#">Projects</a>
//               <a href="#">Customers</a>
//               <a href="#">Contact</a>
//               <Button className="tracking-tight">Get for free</Button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// import ArrowRight from "@/assets/arrow-right.svg";
// import Logo from "@/assets/logosaas.png";
// import MenuIcon from "@/assets/menu.svg";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { Link as ScrollLink } from "react-scroll"; // Import react-scroll Link

// export const Header = () => {
//   return (
//     <header className="sticky top-0 backdrop-blur-sm z-20">
//       <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
//         <p className="text-white/60 hidden md:block">
//           Streamline your workflow and boost your productivity
//         </p>
//         <div className="inline-flex gap-1 items-center">
//           <p>Get started for free</p>
//           <ArrowRight className="size-4 inline-flex justify-center items-center" />
//         </div>
//       </div>
//       <div className="py-5">
//         <div className="container">
//           <div className="flex items-center justify-between">
//             <Image src={Logo} alt="Saas Logo" height={40} width={40} />
//             <MenuIcon className="size-4 md:hidden" />
//             <nav className="hidden md:flex gap-6 text-black/60 items-center">
//               <ScrollLink to="about" smooth={true} duration={500}>
//                 <a>About</a>
//               </ScrollLink>
//               <ScrollLink to="features" smooth={true} duration={500}>
//                 <a>Features</a>
//               </ScrollLink>
//               <ScrollLink to="projects" smooth={true} duration={500}>
//                 <a>Projects</a>
//               </ScrollLink>
//               <ScrollLink to="testimonials" smooth={true} duration={500}>
//                 <a>Customers</a>
//               </ScrollLink>
//               <ScrollLink to="contact" smooth={true} duration={500}>
//                 <a>Contact</a>
//               </ScrollLink>
//               <Button className="tracking-tight">Get for free</Button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
