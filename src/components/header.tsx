import Link from "next/link";
import LoginWidget from "./login-widget";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-2 px-10 gap-5 border">
      <div>
        <Link href="/" className="font-bold text-lg">
          <div className="flex justify-between items-center">
            <Image
              src="foodord_black.svg"
              alt="Foodord Icon"
              width={140}
              height={50}
            />
          </div>
        </Link>
      </div>
      <div className="flex gap-2">
        <LoginWidget />
      </div>
    </div>
  );
}
