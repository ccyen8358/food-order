import { parseBoolean } from "@/lib/utils";
import { UseFormReturnType } from "@mantine/form";

// Note that during build stage process.env.FORM_DEBUG will be undefined
// Therefore, we need to provide a fallback value of 0 to prevent build from crashing
const enabled = parseBoolean(process.env.FORM_DEBUG || 0);

export interface FormDebugProps extends React.ComponentPropsWithoutRef<"div"> {
  form: UseFormReturnType<any>;
}

export default function FormDebug(props: FormDebugProps) {
  if (!enabled) {
    return null;
  }

  return (
    <div>
      <pre>{JSON.stringify(props.form.getValues(), undefined, 2)}</pre>
    </div>
  );
}
