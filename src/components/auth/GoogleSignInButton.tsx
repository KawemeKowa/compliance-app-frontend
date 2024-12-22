import { FcGoogle } from 'react-icons/fc';
import { AuthButton } from './AuthButton';

interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function GoogleSignInButton({ onClick, isLoading }: GoogleSignInButtonProps) {
  return (
    <AuthButton
      type="button"
      onClick={onClick}
      isLoading={isLoading}
      className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Continue with Google
    </AuthButton>
  );
}