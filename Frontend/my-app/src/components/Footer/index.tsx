import React from 'react'
import { Wrapper,Container } from './footer.styles'

export function FooterContainer() {
    return (
        <Container>
            <Wrapper>
             <h2>The model used for prediction can only predict places in ASIA and is trained on <a href='https://ai.googleblog.com/2019/05/announcing-google-landmarks-v2-improved.html'>Google Landmarks Dataset V2</a></h2>
            </Wrapper>
        </Container>
    )
}