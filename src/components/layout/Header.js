import React from 'react';
import styled from 'styled-components';
import { Hash, Image, Code, Wifi, WifiOff } from 'lucide-react';

const HeaderBar = styled.header`
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: var(--primary-bg);
    border-bottom: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    z-index: 10;
`;

const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #fff;
    svg { color: #80848e; }
`;

const StatusIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: ${props => props.online ? '#23a559' : '#f23f43'};
    svg { width: 14px; height: 14px; }
`;

export const Header = ({ channel, status }) => {
    const icons = { Hash, Image, Code };
    const Icon = icons[channel.icon] || Hash;

    return (
        <HeaderBar>
            <ChannelInfo>
                <Icon size={20} />
                {channel.name}
            </ChannelInfo>
            <StatusIndicator online={status === 'connected'}>
                {status === 'connected' ? <Wifi /> : <WifiOff />}
                {status === 'connected' ? 'Connected' : 'Syncing...'}
            </StatusIndicator>
        </HeaderBar>
    );
};
