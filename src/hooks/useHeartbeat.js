import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../api/endpoints';

export const useHeartbeat = (user) => {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState('connecting');

    const sendPulse = async () => {
        try {
            // Logic: Try to find existing player by ID, if exists update, otherwise create
            const { data: currentPlayers } = await axios.get(ENDPOINTS.players);
            const existing = currentPlayers.find(p => p.userId === user.id);

            const payload = {
                userId: user.id,
                name: user.name,
                avatar: user.avatar,
                lastSeen: Date.now()
            };

            if (existing) {
                await axios.put(`${ENDPOINTS.players}/${existing.id}`, payload);
            } else {
                await axios.post(ENDPOINTS.players, payload);
            }
            setStatus('connected');
        } catch (error) {
            console.error('Heartbeat failed', error);
            setStatus('error');
        }
    };

    const fetchPlayers = async () => {
        try {
            const { data } = await axios.get(ENDPOINTS.players);
            setPlayers(data);
        } catch (error) {
            console.error('Failed to fetch players', error);
        }
    };

    useEffect(() => {
        sendPulse(); // Initial
        fetchPlayers();

        const pulseInterval = setInterval(sendPulse, 10000); // 10s Heartbeat
        const fetchInterval = setInterval(fetchPlayers, 5000); // 5s Refresh list

        return () => {
            clearInterval(pulseInterval);
            clearInterval(fetchInterval);
        };
    }, [user.id, user.name, user.avatar]);

    const onlinePlayers = players.filter(p => (Date.now() - p.lastSeen) < 30000);

    return { onlinePlayers, status };
};
