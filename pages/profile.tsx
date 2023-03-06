import AuthGuard from "features/auth/components/AuthGuard";
import ProfileForm from "features/users/components/ProfileForm";

const profile = () => {
  return (
    <AuthGuard>
      <div className="mx-8">
        <ProfileForm />
      </div>
    </AuthGuard>
  );
};

export default profile;
