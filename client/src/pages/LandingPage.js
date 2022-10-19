import React from 'react';

function LandingPage ({currentPage, handlePageChange}) {
    return (
        <div className='landing-page'>
            <section className='container-fluid'>                
                <article>               
                    <p>
                        <strong className='d-block about-welcome mb-2 text-center w-100'>WhatSupplier provides a tool for organizing and optimizing the process of ordering, storing, and using a company’s inventory.
                        WhatSupplier also guides you with the selection process of choosing the supplier's lowest cost.</strong>
                    </p>
                </article>
                <article>
                    <p>
                        <strong className='d-block about-welcome mb-2 text-center w-100'>In the Supply Chain process the factory purchases the raw materials from diverse suppliers. Using the software the supplier’s manager can choose the best offer in price without sacrificing quality when needed to place a raw materials order. </strong>
                    </p>
                </article>
            </section>
        </div>
    );
}

export default LandingPage;
