import React from 'react';
import {MainPageContainer, ImageContainer, FooterContainer } from '../components/styles/LandingPage.styled';

function LandingPage({ currentPage, handlePageChange }) {
    return (
        <MainPageContainer>
                <ImageContainer>
                    <p>
                        WhatSupplier provides a tool for organizing and optimizing the process of ordering, storing, and using a company’s inventory.
                        WhatSupplier selects the supplier with the lowest cost based on a specific material.
                    </p>
                </ImageContainer>
                <FooterContainer>
                    <p>
                        In the Supply Chain process the factory purchases the materials from diverse suppliers. 
                        Using WhatSupplier the manager can choose the best offer in price when placing  an order.
                    </p>
                    <p>
                        WhatSupplier uses a function to decide which supplier offers the lowest cost to place an order.
                        WhatSupplier uses a function to determine when an order needs to be placed because stocks are running too low. This function is called ROP “Reorder Point’. 
                    </p>
                </FooterContainer>
        </MainPageContainer>
    );
}

export default LandingPage;
