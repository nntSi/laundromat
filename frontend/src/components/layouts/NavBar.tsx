import Logo from "../../assets/logo.png";
import AuthBtn from "../AuthBtn";

const NavBar = () => {
  return (
    <div className="sticky top-0 w-full bg-white scale-100 z-50">
      <div className="h-16 border-b flex items-center justify-between px-4 sm:px-16 md:px-24 lg:px-32 font-semibold">
        <div className="flex space-x-2.5 items-center">
          <img className="w-8 h-8" src={Logo} />
          <p>LAUNDROMAT</p>
        </div>
        <AuthBtn/>
      </div>
    </div>
  );
};

export default NavBar;
