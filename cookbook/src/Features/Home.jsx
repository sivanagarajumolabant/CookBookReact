import React from 'react'
import Footer from '../Components/Footer'

import MenuAppBar from '../Components/header'
import PreviewCode from './Modules/PreviewCode'
export default function Home() {
    return (
        <div>


            <MenuAppBar>
                <PreviewCode />
            </MenuAppBar>
            {/* <Footer /> */}

        </div>
    )
}
