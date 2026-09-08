import { useEffect } from "react";
import type { ReactNode } from "react";

import { useAuthStore } from "../../../common/stores/authStore";
import { adminApi } from "../api";

interface SuperAdminSessionBootstrapProps {
  children: ReactNode;
}

export const SuperAdminSessionBootstrap = ({
  children,
}: SuperAdminSessionBootstrapProps) => {
  const checked = useAuthStore((state) => state.isSuperAdminSessionChecked);

  useEffect(() => {
    if (checked) {
      return;
    }

    const restoreSession = async () => {
      try {
        const { user } = await adminApi.getCurrentSuperAdmin();
        useAuthStore.getState().setSuperAdmin(user);
      } catch {
        if (!useAuthStore.getState().isSuperAdminSessionChecked) {
          useAuthStore.getState().logoutSuperAdmin();
        }
      } finally {
        useAuthStore.getState().setSuperAdminSessionChecked(true);
      }
    };

    void restoreSession();
  }, [checked]);

  return <>{children}</>;
};
