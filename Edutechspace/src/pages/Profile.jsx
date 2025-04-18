import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) return <div className="text-center mt-20 text-lg">Loading profile...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative">
      {/* Blue Panel Background */}
      <div className="absolute top-10 left-0 right-0 h-[300px] bg-blue-950 rounded-3xl z-0 mx-4"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
        {/* Left Column - Profile Picture and Status */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={user.picture || "https://i.pravatar.cc/300"}
              alt={user.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-blue-950"
            />
            <h2 className="text-2xl font-semibold mt-4 text-blue-950">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>

            <div className="flex justify-between gap-10 mt-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-950 rounded-full bg-yellow-500 w-1/2">{user.ongoingCourses|| 2}</h3>
                <p className="text-gray-600">Ongoing Courses</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-950 rounded-full bg-green-500 w-1/2">{user.completedCourses|| 2}</h3>
                <p className="text-gray-600">Completed Courses</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Link className="bg-blue-950 text-white px-6 py-2 rounded-md hover:bg-blue-900" to="admin/resource-upload">
                Resouce Upload
              </Link>
              <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Details */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-950">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First name</label>
              <input
                type="text"
                value={user.family_name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Last name</label>
              <input
                type="text"
                value={user.given_name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                value={user.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={user.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Weekly Goal</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value="Mon,Wed,Thur"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  readOnly
                />
                <button className="text-blue-950 font-medium underline hover:text-blue-800">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;