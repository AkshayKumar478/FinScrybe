import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../common/stores/authStore";
import { loginSchema, type LoginFormValues } from "../schemas/auth";

export function useSuperAdminLogin() {
  const navigate = useNavigate();
  const setSuperAdminToken = useAuthStore((state) => state.setSuperAdminToken);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@finscrybe.io",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await fetch("http://localhost:5000/api/auth/super-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Invalid super administrator email or password.");
      }

      return responseData.accessToken;
    },
    onSuccess: (token) => {
      setSuperAdminToken(token);
      navigate("/admin/dashboard");
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
