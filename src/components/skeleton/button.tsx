import { Skeleton } from "@mantine/core";

export interface SkeletonButtonProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export function SkeletonButton() {
  return <Skeleton height={32} width={64} radius="sm" />;
}
