import { StyledSocialIcons } from './styles/SocialIcons.styled'

export default function SocialIcons() {
  return (
    <StyledSocialIcons>
      <li>
      <a href="https://github.com/dorisliu333/whatsupplier" target="_blank" rel="noreferrer" className="fa fa-github"> Github</a>
      </li>
      <li>
      <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer" className="fa fa-linkedin"> Linkedin</a>
      </li>
      <li>
      <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer" className="fa fa-twitter"> Twitter</a>
      </li>
    </StyledSocialIcons>
  )
}