import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../schemas/auth";
import { useAuthStore } from "../../../common/stores/authStore";
import { adminApi } from "../api";
export function useSuperAdminLogin() {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@finscrybe.io",
      password: "admin12345"
    }
  });

const mutation = useMutation({
  mutationFn: adminApi.loginSuperAdmin,

  onSuccess: (data) => {
    
    useAuthStore.getState().setSuperAdmin(data.user);
    useAuthStore.getState().setSuperAdminSessionChecked(true);
    navigate("/admin/dashboard", { replace: true });
  },
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
