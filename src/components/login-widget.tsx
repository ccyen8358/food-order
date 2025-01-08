"use client";

import Link from "next/link";
import { IconLogout2, IconSettings, IconUser } from "@tabler/icons-react";
import { Menu, Button, Avatar, rem } from "@mantine/core";
import { authClient } from "@/lib/auth/auth-client";
import { useIsClient } from "usehooks-ts";
import { SkeletonButton } from "./skeleton/button";
import { SessionStorageKeys } from "@/lib/vars/session-storage";

export default function LoginWidget() {
  const session = authClient.useSession();
  const isClient = useIsClient();

  if (!isClient) {
    return <SkeletonButton />;
  }

  if (!session.data) {
    return (
      <Button
        component={Link}
        variant="filled"
        href="/sign-in"
        disabled={session.isPending}
      >
        Login
      </Button>
    );
  }

  const handleLogOut = async () => {
    try {
      await authClient.signOut();
      sessionStorage.removeItem(SessionStorageKeys.verify_email);
    } catch (err) {}
  };

  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <Avatar radius="xl" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label className="flex gap-2 items-center">
          <IconUser size={16} />
          {session.data.user.name}
        </Menu.Label>
        <Menu.Divider />
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item
          leftSection={
            <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={handleLogOut}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
