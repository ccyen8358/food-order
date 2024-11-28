import Link from "next/link";
import { IconLogin2, IconChefHat, IconPepper } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-2 px-10 gap-5 border">
      <div>
        <Link href="/" className="font-bold text-lg">
          <div className="flex justify-between items-center">
            <IconPepper
              className="text-red-800 mr-0.5 rounded-full p-1"
              size={36}
            />
            <div>
              <span className="">Meal</span> Hub
            </div>
          </div>
        </Link>
      </div>
      <div className="flex-1"></div>
      <div>
        <Button leftSection={<IconLogin2 size={18} />} variant="filled">
          Login
        </Button>
      </div>
    </div>
  );
}
