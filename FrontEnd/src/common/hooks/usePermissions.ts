import { useAuthStore } from "../stores/authStore";
import { ActorType, CompanyAdminRole } from "../constants/enums";

export function usePermissions() {
  const clientUser = useAuthStore((state) => state.clientUser);

  const isExecutive = 
    clientUser?.actorType === ActorType.COMPANY_ADMIN && 
    clientUser?.role === CompanyAdminRole.EXECUTIVE;

  const isAdmin = 
    clientUser?.actorType === ActorType.COMPANY_ADMIN && 
    clientUser?.role === CompanyAdminRole.ADMIN;

  const isAccountant = clientUser?.actorType === ActorType.ACCOUNTANT;

  return {
    canInviteUsers: isAdmin,
    canEditSettings: isAdmin,
    canDeleteItems: isAdmin,
    isExecutive,
    isAccountant
  };
}
