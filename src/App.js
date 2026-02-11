import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ChatContainer } from './components/chat/ChatContainer';
import { SettingsModal } from './components/settings/SettingsModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useHeartbeat } from './hooks/useHeartbeat';
import { CHANNELS } from './api/endpoints';

const AppLayout = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    color-scheme: dark;
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const MainContent = () => {
    const { user } = useAuth();
    const [channelId, setChannelId] = useState('general');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { onlinePlayers, status } = useHeartbeat(user);

    const channel = CHANNELS.find(c => c.id === channelId);

    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }, []);

    return (
        <AppLayout>
            <Sidebar 
                currentChannelId={channelId} 
                setChannelId={setChannelId}
                user={user}
                onlinePlayers={onlinePlayers}
                onOpenSettings={() => setSettingsOpen(true)}
            />
            <ContentWrapper>
                <Header channel={channel} status={status} />
                <ChatContainer channel={channel} user={user} />
            </ContentWrapper>
            
            <SettingsModal 
                isOpen={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
            />
        </AppLayout>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <MainContent />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
