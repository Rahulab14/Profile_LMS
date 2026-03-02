import { useState, useCallback } from 'react';
import api from '../api/axios';

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/profile/me');
            setProfile(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile settings');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = async (updates) => {
        try {
            setError(null);
            const response = await api.put('/profile/me', updates);
            setProfile(response.data.profile); // Assuming backend returns updated profile
            return { success: true, message: 'Profile updated successfully' };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to update profile settings';
            setError(msg);
            return { success: false, message: msg };
        }
    };

    return { profile, loading, error, fetchProfile, updateProfile };
};
