import React from 'react';
import {StyledFooter} from './styles/StyledFooter.styled'

function Footer () {
    return (
        <StyledFooter>
            <p>Created @2022</p>
            <section>            
                <a href="https://github.com/dorisliu333/whatsupplier" target="_blank" rel="noreferrer" className="fa fa-github"> Github</a>

                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer" className="fa fa-linkedin"> Linkedin</a>
            
                <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer" className="fa fa-twitter"> Twitter</a>
            </section>
        </StyledFooter>
    );
}
export default Footer;