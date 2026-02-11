import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { CodeSnippet } from './CodeSnippet';
import { PhotoCard } from './PhotoCard';

const MessageRow = styled.div`
    display: flex;
    padding: 8px 16px;
    gap: 16px;
    transition: background 0.1s;
    &:hover {
        background: rgba(0,0,0,0.05);
    }
    
    &.is-mention {
        background: rgba(250, 166, 26, 0.1);
        border-left: 2px solid #faa61a;
    }
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
`;

const ContentArea = styled.div`
    flex-grow: 1;
`;

const Meta = styled.div`
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 4px;
`;

const Author = styled.span`
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    &:hover { text-decoration: underline; }
`;

const Time = styled.span`
    font-size: 0.7rem;
    color: #949ba4;
`;

const MessageBody = styled.div`
    color: var(--text-main);
    line-height: 1.5;
    word-break: break-word;
    
    .mention {
        color: #e9c46a;
        background: rgba(233, 196, 106, 0.1);
        padding: 0 2px;
        border-radius: 3px;
        font-weight: 500;
    }
`;

export const MessageItem = ({ msg, currentUser, type }) => {
    const isMention = msg.text?.includes(`@${currentUser.name}`);
    
    const renderContent = () => {
        if (type === 'code') {
            return <CodeSnippet code={msg.text} language={msg.language || 'javascript'} />;
        }
        
        if (type === 'media' || msg.imageUrl) {
            return <PhotoCard url={msg.imageUrl || msg.text} caption={msg.imageUrl ? msg.text : ''} />;
        }

        const sanitized = DOMPurify.sanitize(msg.text);
        // Basic mention highlighting
        const withMentions = sanitized.replace(
            new RegExp(`@${currentUser.name}`, 'g'),
            `<span class="mention">@${currentUser.name}</span>`
        );

        return <div dangerouslySetInnerHTML={{ __html: withMentions }} />;
    };

    return (
        <MessageRow className={isMention ? 'is-mention' : ''}>
            <Avatar src={msg.avatar} alt={msg.author} />
            <ContentArea>
                <Meta>
                    <Author>{msg.author}</Author>
                    <Time>{new Date(msg.createdAt * 1).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Time>
                </Meta>
                <MessageBody>
                    {renderContent()}
                </MessageBody>
            </ContentArea>
        </MessageRow>
    );
};
