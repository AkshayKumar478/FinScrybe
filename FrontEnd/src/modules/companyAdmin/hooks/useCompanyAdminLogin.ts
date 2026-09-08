import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuthStore } from "../../../common/stores/authStore";
import { companyAdminApi } from "../api";

const companyAdminLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type CompanyAdminLoginForm = z.infer<typeof companyAdminLoginSchema>;

export const useCompanyAdminLogin = () => {
  const navigate = useNavigate();
  const form = useForm<CompanyAdminLoginForm>({
    resolver: zodResolver(companyAdminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: companyAdminApi.login,
    onSuccess: ({ user }) => {
      useAuthStore.getState().setCompanyAdmin({
        ...user,
        actorType: "COMPANY_ADMIN",
      });
      navigate("/company-admin/dashboard");
    },
  });

  return {
    form,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
    isSubmitting: mutation.isPending,
    formError: mutation.error instanceof Error ? mutation.error.message : null,
  };
};
