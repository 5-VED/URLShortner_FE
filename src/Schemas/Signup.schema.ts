import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your full name." }),
  email: z
    .email({ message: "Please enter a valid email address." })
    .trim()
    .min(1, { message: "Please enter your work email." }),
  password: z
    .string()
    .min(1, { message: "Please enter your password." })
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[\d!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one number or symbol.",
    }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy.",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

