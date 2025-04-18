// AdminUploadPage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../db/Superbase-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Auth/useAuth";
import AdminLogin from "./AdminLogin";

const AdminUploadPage = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  
  // Form and data states
  const [file, setFile] = useState(null);
  const [courseType, setCourseType] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [resourceUrl, setResourceUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedResources, setUploadedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Course options
  const courses = [
    "Frontend Development",
    "Backend Development",
    "Cybersecurity",
    "Data Science",
    "UI/UX",
    "Artificial Intelligence",
    "Machine Learning",
  ];

  // Initial resources fetch when user is authenticated
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      fetchResources();
    }
  }, [authLoading, user, isAdmin]);

  // Fetch resources for a specific course
  const fetchResources = async () => {
    if (!user || !isAdmin) return;
    if (!courseType) {
      await fetchAllResources();
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("course_resources")
        .select("*")
        .eq("course_type", courseType)
        .order("created_at", { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setUploadedResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to fetch resources");
    } finally {
      setLoading(false);
    }

    try {
      const { data, error } = await supabase
        .from('course_resources')
        .select('*')
        .order('timestamp', { ascending: false });
  
      if (error) throw error;
      setResourceUrl(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    }
    };
  };

  // Fetch all resources
  const fetchAllResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("course_resources")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setUploadedResources(data || []);
    } catch (error) {
      console.error("Error fetching all resources:", error);
      toast.error("Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  // Fetch resources when course selection changes
  useEffect(() => {
    if (user && isAdmin() && courseType !== undefined) {
      fetchResources();
    }
  }, [courseType]);

  // Handle file upload or video link submission
  const handleUpload = async () => {
    // Validation
    if (!courseType) {
      toast.error("Please select a course type");
      return;
    }
    
    if (!title) {
      toast.error("Please enter a title for the resource");
      return;
    }
    
    if (resourceType === "PDF" && !file) {
      toast.error("Please select a PDF file to upload");
      return;
    }
    
    if (resourceType === "Video" && !resourceUrl) {
      toast.error("Please enter a video URL");
      return;
    }
    
    setLoading(true);
    
    try {
      let finalResourceUrl = resourceUrl;
      
      // If it's a PDF, upload to storage
      if (resourceType === "PDF" && file) {
        const fileExt = file.name.split(".").pop();
        if (fileExt.toLowerCase() !== 'pdf') {
          toast.error("Only PDF files are allowed");
          setLoading(false);
          return;
        }
        
        const filePath = `${courseType}/${Date.now()}-${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from("pdf-resources")
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: urlData } = supabase.storage
          .from("pdf-resources")
          .getPublicUrl(filePath);
          
        finalResourceUrl = urlData.publicUrl;
      }
      
      // Insert into course_resources table
      const { error: insertError } = await supabase
        .from("course_resources")
        .insert([
          {
            title: title,
            description: description,
            course_type: courseType,
            resource_type: resourceType,
            resource_url: finalResourceUrl,
            uploaded_by: user.email
          }
        ]);
        
      if (insertError) {
        throw insertError;
      }
      
      toast.success("Resource uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setResourceUrl("");
      setFile(null);
      
      // Refresh resources list
      await fetchResources();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle resource deletion
  const handleDelete = async (resource) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) {
      return;
    }
    
    setLoading(true);
    
    try {
      // If it's a PDF stored in Supabase, delete the file first
      if (resource.resource_type === "PDF" && resource.resource_url && resource.resource_url.includes("/pdf-resources/")) {
        const path = resource.resource_url.split("/pdf-resources/")[1];
        
        const { error: storageError } = await supabase.storage
          .from("pdf-resources")
          .remove([path]);
          
        if (storageError) {
          console.warn("Error removing file:", storageError);
          // Continue with DB deletion even if file removal fails
        }
      }
      
      // Delete from database
      const { error } = await supabase
        .from("course_resources")
        .delete()
        .eq("id", resource.id);
        
      if (error) {
        throw error;
      }
      
      toast.success("Resource deleted successfully");
      
      // Refresh resources list
      await fetchResources();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Delete failed: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while authenticating
  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-md text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Resource Upload
        </h2>
        <AdminLogin />
        <ToastContainer position="bottom-right" />
      </div>
    );
  }

  // Redirect or show unauthorized message if user is not an admin
  if (!isAdmin()) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Unauthorized Access
        </h2>
        <p className="mb-6 text-gray-600">
          Your account ({user.email}) is not authorized to access the admin area.
        </p>
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition"
        >
          Sign Out
        </button>
        <ToastContainer position="bottom-right" />
      </div>
    );
  }

  // Admin dashboard view
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📂 Admin Resource Upload
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user.email}</span>
          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Type*</label>
            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type*</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video Link</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Resource title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Brief description of the resource"
            rows="2"
          />
        </div>
        
        {resourceType === "PDF" ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">PDF File*</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL*</label>
            <input
              type="url"
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              required
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload Resource"}
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          🗂 {courseType ? `Resources for ${courseType}` : "All Uploaded Resources"}
        </h3>

        {loading ? (
          <div className="text-center py-6">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading resources...</p>
          </div>
        ) : uploadedResources.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">No resources uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {uploadedResources.map((res) => (
              <li
                key={res.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border"
              >
                <div>
                  <p className="font-medium text-gray-800">{res.title}</p>
                  <div className="flex gap-2 text-xs text-gray-500 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {res.course_type}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {res.resource_type}
                    </span>
                    <span>
                      {new Date(res.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {res.description && (
                    <p className="text-xs text-gray-600 mt-1">{res.description}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <a
                    href={res.resource_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(res)}
                    className="text-red-600 hover:text-red-800 hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdminUploadPage;