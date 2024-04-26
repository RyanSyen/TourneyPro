import CustomContainer from "@/components/common/customContainer";

import ProfileFields from "./profileFields";

const ProfilePersonal = () => {
  return (
    <section className="pt-8">
      <CustomContainer>
        <div>
          <div className="flex items-center gap-4 pb-6">
            <p className="text-lg font-medium">Profile</p>
          </div>
          <ProfileFields />
        </div>
      </CustomContainer>
    </section>
  );
};
export default ProfilePersonal;
