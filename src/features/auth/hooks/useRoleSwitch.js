import { useAuth } from './useAuth';
import { useProfile } from '../../profile/hooks/useProfile';
import { useState } from 'react';
import { useTutorMode } from './useTutorMode';

export function useRoleSwitch() {
  const { auth, setAuth } = useAuth();
  const {data: tutorMode} = useTutorMode();
  const [isLoading, setIsLoading] = useState(false);
  
  const currentRole = auth?.role || sessionStorage.getItem('role');
  
  
  // Nếu đang ở tutor mode nhưng chưa có tutor status -> cần đăng ký
  const needsTutorRegistration = tutorMode?.status === 'tutor-register';
  
  // Có thể switch sang tutor nếu đã có tutor status
  const canSwitchToTutor = !!tutorMode?.canSwitch;

  const switchRole = (targetRole) => {
    if (targetRole === currentRole) return;
    if(!tutorMode) return;
    // Validate
    if (targetRole === 'tutor' && !canSwitchToTutor) {
      console.warn('Cannot switch to tutor: no tutor status');
      return false;
    }

    // Update auth context
    const newAuth = { token: tutorMode?.token, role: targetRole };
    setAuth(newAuth);
    sessionStorage.setItem('role', targetRole);
    sessionStorage.setItem('token', tutorMode?.token);
    return true;
  };

  return {
    currentRole,
    canSwitchToTutor,
    needsTutorRegistration,
    switchRole,
    isLoading
  };
}
