import { ScrollArea } from "@/components/ui/scroll-area";
import AVATAR from "../../assets/avatar.jpg";
import {
  Baby,
  Bed,
  Calculator,
  Computer,
  LucideDrumstick,
  Plane,
  Shirt,
  ShoppingBasketIcon,
  ShoppingCart,
  Speech,
  Volleyball,
} from "lucide-react";
import { Star } from "lucide-react";
import LOGO from "../../assets/merchapp_logo.jpg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, NavLink } from "react-router-dom";
const sampledata = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
function UserPage() {
  const navLinks = [
    {
      label: "All Products Available",
      icon: <ShoppingCart />,
    },
    {
      label: "Hospitality Management",
      icon: <Bed />,
    },
    {
      label: "T-Shirts (Washday,NSTP,Anniversary Shirts)",
      icon: <Shirt />,
    },
    {
      label:
        "Information Technology, Computer Science, Computer Engineering(BSIT,BSCS,BScPE)",
      icon: <Computer />,
    },
    {
      label: "Tourism Management",
      icon: <Plane />,
    },
    {
      label: "Uniform And Pants",
      icon: <Shirt />,
    },
    {
      label: "Business Administration",
      icon: <Calculator />,
    },
    {
      label: "Physical Education",
      icon: <Volleyball />,
    },
    {
      label: "Misscellenous",
      icon: <ShoppingBasketIcon />,
    },
    {
      label: "Arts in Communication",
      icon: <Speech />,
    },
    {
      label: "Senior High School",
      icon: <Baby />,
    },
    {
      label: "Limited Edition Item",
      icon: <LucideDrumstick />,
    },
  ];

  return (
    <main className="flex h-screen flex-1 flex-col gap-3 overflow-hidden bg-primary p-2 text-accent lg:flex-col">
      {/* <span> UserPage</span>
      <Link className="btn" to="/login">
        Login
      </Link> */}
      <section className="navbar gap-2 rounded-2xl text-white">
        <div className="flex items-center">
          <img src={LOGO} className="btn btn-ghost w-full flex-1" />
        </div>
        <div className="flex flex-1 text-black">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-96 transition-all duration-200 ease-in-out hover:bg-opacity-90">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ScrollArea className="transition-transform duration-300 ease-in-out">
                    <div className="fixed bottom-2 left-2 right-2 top-16 flex flex-wrap content-evenly gap-10 rounded-2xl bg-primary p-10 outline outline-white transition-all duration-300 ease-in-out">
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.label}
                          className="btn btn-accent flex h-auto min-w-96 flex-1 flex-shrink-0 items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        >
                          <span>{link.icon}</span>{" "}
                          <div className="flex-1 text-lg">{link.label}</div>
                        </NavLink>
                      ))}
                    </div>
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <div className="indicator">
                <ShoppingCart className="h-5 w-5" />
                <span className="badge indicator-item badge-sm">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 text-black shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img src={AVATAR} alt="Avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-black shadow"
            >
              
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <ScrollArea className="rounded-2xl bg-white p-0.5 lg:p-2">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 text-white lg:items-center lg:justify-center lg:gap-5 lg:py-2">
          {sampledata.map((item) => (
            <div
              key={item}
              className="card w-[10rem] cursor-pointer bg-primary text-white shadow-xl hover:ring-2 hover:ring-black lg:w-[17rem]"
            >
              <figure className="p-2 lg:px-4 lg:pt-5">
                <img
                  src={AVATAR}
                  alt="Shoes"
                  className="h-auto rounded-xl object-contain lg:h-[15rem]"
                />
              </figure>
              <div className="card-body px-0.5 text-center lg:px-2">
                <div className="card-title text-start">
                  <h2 className="flex-1 text-start text-xs font-semibold lg:text-lg">
                    Batchelor of Science In Information Technology Pants
                  </h2>
                </div>
                <span className="text-start text-xs font-bold text-secondary lg:text-base">
                  $2312.24
                </span>

                <span className="text-start text-xs">
                  If a dog chews shoes whose shoes does he choose?
                </span>
                <div className="card-actions mt-1 flex justify-center text-xs">
                  <button className="btn h-2 flex-1 border-0 bg-accent p-0 text-black lg:text-lg">
                    Add To Cart
                  </button>
                  <button className="btn btn-accent h-2 border-0 bg-transparent text-white hover:text-black">
                    {<Star />}
                  </button>
                </div>
              </div>
            </div>
            // <div key={index} className="card w-96 bg-base-100 shadow-xl">
            //   Lorem ipsum dolor sit amet consectetur adipisicing elit.
            //   Blanditiis quia ipsa beatae perferendis neque sequi dolor quidem,
            //   pariatur sapiente magni, aperiam omnis explicabo numquam illo
            //   debitis veniam eos laboriosam. Sequi.
            // </div>
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}

export default UserPage;
