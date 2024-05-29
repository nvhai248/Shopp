import NavBarUser from "./navbar";
import FormProfile from "./profile";

export default function Profile() {
  return (
    <div className="w-full flex">
      <NavBarUser />
      <main className="w-3/4 p-8">
        <div className="w-full mx-auto p-6 mt-10 bg-white rounded-none shadow-lg">
          <div className="text-start mb-6">
            <h1 className="text-3xl">Profile Management</h1>
            <h2 className="tex-sm">
              Add more information to protect your account
            </h2>
          </div>

          <FormProfile />
        </div>
      </main>
    </div>
  );
}
