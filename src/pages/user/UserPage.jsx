import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const sampledata = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
function UserPage() {
  return (
    <main className="flex h-screen flex-1 flex-col gap-3 overflow-hidden bg-primary p-5 text-accent lg:flex-col">
      <span> UserPage</span>
      <Link className="btn" to="/login">
        Login
      </Link>
      <ScrollArea className="">
        <div className="flex w-full flex-wrap justify-evenly gap-5 text-black">
          {sampledata.map((item, index) => (
            <div className="card w-72 bg-base-100 shadow-xl" key={index}>
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="justify-end">
                  <button className="btn btn-primary">Buy Now</button>
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
