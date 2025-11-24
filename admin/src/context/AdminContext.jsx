// 
import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext';

// Context create
export const AdminDataContext = createContext();

const AdminContext = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  // Admin data fetch function
  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/admin/getadmin`, {
        withCredentials: true
      });
      setAdminData(result.data);
      console.log("✅ Admin data fetched:", result.data);
    } catch (error) {
      setAdminData(null);
      console.error("❌ Failed to fetch admin:", error);
    }
  };

  // Fetch admin data when component mounts
  useEffect(() => {
    getAdmin();
  }, []);

  // Value for context
  const value = {
    adminData,
    setAdminData,
    getAdmin
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export default AdminContext;
