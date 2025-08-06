import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token'); // Read token from cookies
const fetcher = (url) =>
  axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => res.data);

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/user', fetcher);

  const createUser = async ({name,mobile, email, password, roleId }) => {
    const res = await axios.post(
      '/api/admin/user',
      {name,mobile, email, password, roleId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    mutate();
    return res.data;
  };

  const updateUser = async (id, {name,mobile, email, roleId }) => {
    const res = await axios.put(
      `/api/admin/user/${id}`,
      {name, mobile, email, roleId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    mutate();
    return res.data;
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    mutate();
  };

  return {
    users: data,
    isLoading,
    isError: error,
    createUser,
    updateUser,
    deleteUser,
    refresh: mutate,
  };
}
