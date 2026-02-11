import React, { useEffect } from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { Copy, Check } from 'lucide-react';

const SnippetContainer = styled.div`
    background: #0d0d0d;
    border-radius: 8px;
    margin: 8px 0;
    border: 1px solid #333;
    overflow: hidden;
    max-width: 100%;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
`;

const LangTag = styled.span`
    color: #888;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
`;

const CopyBtn = styled.button`
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    &:hover { color: #fff; }
`;

const Pre = styled.pre`
    margin: 0 !important;
    padding: 16px !important;
    background: transparent !important;
    span { font-family: 'Fira Code', monospace !important; font-size: 13px; }
`;

export const CodeSnippet = ({ code, language = 'javascript' }) => {
    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <SnippetContainer>
            <Header>
                <LangTag>{language}</LangTag>
                <CopyBtn onClick={handleCopy}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                </CopyBtn>
            </Header>
            <Pre className={`language-${language}`}>
                <code>{code}</code>
            </Pre>
        </SnippetContainer>
    );
};
