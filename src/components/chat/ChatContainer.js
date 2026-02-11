import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Send, Upload, PlusCircle } from 'lucide-react';
import { MessageItem } from './MessageItem';
import { ENDPOINTS } from '../../api/endpoints';

const Main = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: var(--primary-bg);
    position: relative;
    overflow: hidden;
`;

const ScrollableArea = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 20px;
    
    /* Scrollbar */
    &::-webkit-scrollbar { width: 8px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: #1a1b1e; border-radius: 10px; }
`;

const InputWrapper = styled.div`
    padding: 0 16px 24px 16px;
`;

const InputBar = styled.form`
    background: #383a40;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 12px;
`;

const StyledInput = styled.input`
    flex-grow: 1;
    background: transparent;
    border: none;
    padding: 11px 0;
    color: #dbdee1;
    outline: none;
    font-size: 1rem;
    &::placeholder { color: #6d6f78; }
`;

const ToolButton = styled.button`
    background: transparent;
    border: none;
    color: #b5bac1;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.1s;
    &:hover { color: #fff; }
`;

export const ChatContainer = ({ channel, user }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [fileInputUrl, setFileInputUrl] = useState('');
    const scrollRef = useRef(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    const fetchMessages = async () => {
        try {
            const endpoint = ENDPOINTS[channel.id];
            const { data } = await axios.get(endpoint);
            // Sort by creation date if not already sorted
            const sorted = data.sort((a,b) => a.createdAt - b.createdAt);
            
            // Check for new messages to trigger notifications
            if (messages.length > 0 && sorted.length > messages.length) {
                const latest = sorted[sorted.length-1];
                if (latest.author !== user.name && document.hidden) {
                    new Notification("Notcord", {
                        body: `${latest.author}: ${latest.text.substring(0, 50)}`,
                        icon: latest.avatar
                    });
                }
            }
            
            setMessages(sorted);
        } catch (e) {
            console.error("Failed to fetch messages", e);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [channel.id]);

    useEffect(() => {
        if (shouldAutoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, shouldAutoScroll]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // If user is within 100px of bottom, sticky scroll is active
        const isAtBottom = scrollHeight - (scrollTop + clientHeight) < 100;
        setShouldAutoScroll(isAtBottom);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!text.trim() && !fileInputUrl) return;

        const payload = {
            author: user.name,
            avatar: user.avatar,
            text: text,
            createdAt: Date.now().toString(),
            channel: channel.id
        };

        if (channel.id === 'photos' && (text.startsWith('http') || fileInputUrl)) {
            payload.imageUrl = fileInputUrl || text;
            if (fileInputUrl) payload.text = "Uploaded an image";
        }

        if (channel.id === 'code') {
            payload.language = text.match(/^\s*(\w+)/)?.[1] || 'javascript';
        }

        setText('');
        setFileInputUrl('');
        
        try {
            await axios.post(ENDPOINTS[channel.id], payload);
            fetchMessages();
        } catch (err) {
            console.error("Message send error", err);
        }
    };

    const handleFilePrompt = () => {
        const url = prompt("Enter Image URL for path upload:");
        if (url) setFileInputUrl(url);
    };

    return (
        <Main>
            <ScrollableArea ref={scrollRef} onScroll={handleScroll}>
                {messages.map(msg => (
                    <MessageItem 
                        key={msg.id} 
                        msg={msg} 
                        currentUser={user} 
                        type={channel.type}
                    />
                ))}
            </ScrollableArea>
            
            <InputWrapper>
                <InputBar onSubmit={handleSend}>
                    <ToolButton type="button" onClick={handleFilePrompt}>
                        <PlusCircle />
                    </ToolButton>
                    <StyledInput 
                        placeholder={fileInputUrl ? `Image selected: ${fileInputUrl}` : `Message #${channel.name}`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <ToolButton type="submit">
                        <Send size={20} />
                    </ToolButton>
                </InputBar>
            </InputWrapper>
        </Main>
    );
};
