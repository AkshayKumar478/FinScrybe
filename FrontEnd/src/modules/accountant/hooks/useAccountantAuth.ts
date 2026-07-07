import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../common/stores/authStore";
import { loginSchema, type LoginFormValues } from "../schemas/auth";

export function useAccountantLogin() {
  const navigate = useNavigate();
  const setClientUser = useAuthStore((state) => state.setClientUser);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "sarah.johnson@enterprise.com",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.email === "sarah.johnson@enterprise.com" && data.password === "password123") {
        return { email: data.email, fullName: "Sarah Johnson" };
      } else {
        throw new Error("Invalid accountant email or password.");
      }
    },
    onSuccess: (user) => {
      setClientUser(user);
      navigate("/accountant/dashboard");
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
    formError: mutation.error ? (mutation.error as Error).message : null,
  };
}
