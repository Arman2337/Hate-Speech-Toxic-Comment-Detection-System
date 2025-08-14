// import { useState, useCallback } from 'react'
// import axios from 'axios'

// const useApi = (baseURL = '/api') => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const request = useCallback(async (endpoint, options = {}) => {
//     try {
//       setLoading(true)
//       setError(null)

//       const config = {
//         url: `${baseURL}${endpoint}`,
//         headers: {
//           'Content-Type': 'application/json',
//           ...options.headers
//         },
//         ...options
//       }

//       const token = localStorage.getItem('authToken')
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }

//       const response = await axios(config)
//       return { data: response.data, error: null }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message
//       setError(errorMessage)
//       return { data: null, error: errorMessage }
//     } finally {
//       setLoading(false)
//     }
//   }, [baseURL])

//   const get = useCallback((endpoint, options = {}) => {
//     return request(endpoint, { method: 'GET', ...options })
//   }, [request])

//   const post = useCallback((endpoint, data, options = {}) => {
//     return request(endpoint, { method: 'POST', data, ...options })
//   }, [request])

//   const put = useCallback((endpoint, data, options = {}) => {
//     return request(endpoint, { method: 'PUT', data, ...options })
//   }, [request])

//   const del = useCallback((endpoint, options = {}) => {
//     return request(endpoint, { method: 'DELETE', ...options })
//   }, [request])

//   return {
//     loading,
//     error,
//     request,
//     get,
//     post,
//     put,
//     delete: del
//   }
// }

// export default useApi


// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      toast.error(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
};