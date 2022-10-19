import React from 'react';

function Footer () {
    return (
        <div className='container-fluid'>
            <section className='d-flex justify-content-around'>            
                <a href="https://github.com/dorisliu333/whatsupplier" target="_blank" rel="noreferrer" className="fa fa-github"> Github</a>

                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer" className="fa fa-linkedin"> Linkedin</a>
            
                <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer" className="fa fa-twitter"> Twitter</a>
            </section>
        </div>
    );
}
export default Footer;