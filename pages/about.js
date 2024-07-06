import React from 'react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import AboutUs from '../components/aboutUs/aboutUs'
import {navigation} from "../locales/navigation"
import {useRouter} from "next/router";
import {common} from "../locales/common";

export default function About() {
    const {locale} = useRouter()
    return (
        <div style={{minHeigth: '50vh'}}>
            <SEO/>
            <Breadcrumbs
                prevs={[
                    {
                        title: common[locale].Home,
                        link: '/',
                    },
                ]}
                current={navigation[locale].about_us}
            />
            <AboutUs/>
        </div>
    )
}
