import React from 'react';
import styled from 'styled-components';
import { Hash, Image, Code, Settings } from 'lucide-react';
import { CHANNELS } from '../../api/endpoints';

const SidebarContainer = styled.aside`
    width: 240px;
    background: var(--sidebar-bg);
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-shrink: 0;
`;

const Brand = styled.div`
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-weight: 800;
    color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.2);
`;

const NavList = styled.div`
    padding: 12px 8px;
    flex-grow: 1;
    overflow-y: auto;
`;

const NavItem = styled.div`
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.active ? '#fff' : '#8e9297'};
    background: ${props => props.active ? 'rgba(255,255,255,0.06)' : 'transparent'};
    
    &:hover {
        background: rgba(255,255,255,0.04);
        color: #dbdee1;
    }

    svg { 
        width: 20px; 
        height: 20px;
        color: #80848e;
    }
`;

const UserPanel = styled.div`
    background: #232428;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Ident = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    img { width: 32px; height: 32px; border-radius: 50%; }
    div { font-size: 0.85rem; font-weight: 600; color: #fff; }
`;

const IconButton = styled.button`
    background: transparent;
    border: none;
    color: #b5bac1;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    &:hover { background: rgba(255,255,255,0.1); color: #fff; }
`;

const PresenceList = styled.div`
    padding: 16px 8px;
`;

const SectionHeader = styled.div`
    font-size: 0.7rem;
    font-weight: 700;
    color: #949ba4;
    text-transform: uppercase;
    margin-bottom: 8px;
    padding-left: 8px;
`;

const UserItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    color: #8e9297;
    font-size: 0.9rem;
    
    .status-dot {
        width: 10px;
        height: 10px;
        background: #23a559;
        border-radius: 50%;
        box-shadow: 0 0 4px #23a559;
    }
`;

export const Sidebar = ({ currentChannelId, setChannelId, user, onlinePlayers, onOpenSettings }) => {
    const icons = { Hash, Image, Code };

    return (
        <SidebarContainer>
            <Brand>NOTCORD</Brand>
            <NavList>
                <SectionHeader>Channels</SectionHeader>
                {CHANNELS.map(ch => {
                    const Icon = icons[ch.icon];
                    return (
                        <NavItem 
                            key={ch.id} 
                            active={currentChannelId === ch.id}
                            onClick={() => setChannelId(ch.id)}
                        >
                            <Icon />
                            {ch.name}
                        </NavItem>
                    );
                })}

                <PresenceList>
                    <SectionHeader>Online — {onlinePlayers.length}</SectionHeader>
                    {onlinePlayers.map(p => (
                        <UserItem key={p.id}>
                            <div className="status-dot" />
                            {p.name}
                        </UserItem>
                    ))}
                </PresenceList>
            </NavList>

            <UserPanel>
                <Ident>
                    <img src={user.avatar} alt="Me" />
                    <div>{user.name}</div>
                </Ident>
                <IconButton onClick={onOpenSettings} title="User Settings">
                    <Settings size={20} />
                </IconButton>
            </UserPanel>
        </SidebarContainer>
    );
};
