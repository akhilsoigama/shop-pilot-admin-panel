// hooks/useRoles.js
import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = ([url, token]) =>
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

export const useRoles = (token) => {
    const { data, error, isLoading } = useSWR(token ? ["/api/admin/role", token] : null, fetcher);

    const createRole = async (roleData) => {
        try {
            const res = await axios.post("/api/admin/role", roleData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            mutate(["/api/admin/role", token]);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const updateRole = async (id, roleData) => {
        try {
            const res = await axios.put(`/api/admin/role/${id}`, roleData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            mutate(["/api/admin/role", token]);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const deleteRole = async (id) => {
        try {
            await axios.delete(`/api/admin/role/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            mutate(["/api/admin/role", token]);
        } catch (err) {
            throw err;
        }
    };

    return {
        roles: data || [],
        isLoading,
        isError: error,
        createRole,
        updateRole,
        deleteRole,
    };
};
