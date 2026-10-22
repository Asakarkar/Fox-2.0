import { UserType, WorkspaceWithMembersType } from '@/types/api.type';
import { useMemo } from 'react';

const usePermissions = (
  user: UserType | undefined,
  workspace: WorkspaceWithMembersType | undefined
) => {
  return useMemo(() => {
    if (!user || !workspace) return [];

    const member = workspace.members.find(
      (member) => member.userId === user._id
    );
    return member?.role.permission ?? [];
  }, [user, workspace]);
};

export default usePermissions;
