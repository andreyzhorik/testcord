import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background: #2b2d31;
    border-radius: 12px;
    overflow: hidden;
    margin: 12px 0;
    border: 1px solid #3f4147;
    max-width: 500px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-2px);
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    min-height: 200px;
    background: #1e1f22;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
    display: block;
`;

const Content = styled.div`
    padding: 12px;
`;

const Caption = styled.p`
    margin: 0;
    color: #dbdee1;
    font-size: 0.95rem;
`;

export const PhotoCard = ({ url, caption }) => {
    return (
        <Card>
            <ImageWrapper>
                <Img src={url} alt={caption} loading="lazy" />
            </ImageWrapper>
            {caption && (
                <Content>
                    <Caption>{caption}</Caption>
                </Content>
            )}
        </Card>
    );
};
