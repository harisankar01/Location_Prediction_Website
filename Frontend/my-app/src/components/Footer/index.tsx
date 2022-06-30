import React from 'react'
import { Wrapper,Container } from './footer.styles'
import Hashnode from '../images/hashnode-icon-svgrepo-com.svg'
import Linode from '../images/linode-svgrepo-com.svg'
export function FooterContainer() {
    return (
        <Container>
            <Wrapper>
             <h2>The model used for prediction can only predict places in ASIA and is trained on <a href='https://ai.googleblog.com/2019/05/announcing-google-landmarks-v2-improved.html'>Google Landmarks Dataset V2</a></h2>
             <span>
             <h2>Built on Linode <img src={Linode} ></img> and Hashnode<img src={Hashnode} ></img> hackathon </h2>
             </span>
            </Wrapper>
        </Container>
    )
}