import React from 'react';
import {MainPageContainer, ImageContainer, FooterContainer } from '../components/styles/LandingPage';

function LandingPage({ currentPage, handlePageChange }) {
    return (
        <MainPageContainer>
                <ImageContainer>
                    <p>
                        WhatSupplier provides a tool for organizing and optimizing the process of ordering, storing, and using a company’s inventory.
                        WhatSupplier also guides you with the selection process of choosing the supplier's lowest cost.
                    </p>
                </ImageContainer>
                <FooterContainer>
                    <p>
                        In the Supply Chain process the factory purchases the raw materials from diverse suppliers.
                        Using the software the supplier’s manager can choose the best offer in price without sacrificing quality when needed to place a raw materials order.
                    </p>
                    <p>
                        In the Supply Chain process the factory purchases the raw materials from diverse suppliers.
                        Using the software the supplier’s manager can choose the best offer in price without sacrificing quality when needed to place a raw materials order.
                    </p>
                </FooterContainer>
        </MainPageContainer>
    );
}

export default LandingPage;
