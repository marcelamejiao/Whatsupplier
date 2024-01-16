import React from 'react';
import {StyledFooter} from './styles/StyledFooter.styled'

function Footer () {
    return (
        <StyledFooter>
             <p>&copy; 2022 WhatSupplier. All rights reserved</p>
            <section>            
                <a href="https://github.com/marcelamejiao/Whatsupplier" target="_blank" rel="noreferrer" className="fa fa-github"> Github</a>

                <a href="https://www.linkedin.com/in/wmarcelamejia" target="_blank" rel="noreferrer" className="fa fa-linkedin"> Linkedin</a>
            
                <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer" className="fa fa-twitter"> Twitter</a>
            </section>
        </StyledFooter>
    );
}
export default Footer;