import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." })
    .trim()
    .min(1, { message: "Please enter your work email." }),
  password: z
    .string()
    .min(1, { message: "Please enter your password." }),
  rememberDevice: z.boolean().default(true),
});

export type LoginFormData = z.infer<typeof loginSchema>;
