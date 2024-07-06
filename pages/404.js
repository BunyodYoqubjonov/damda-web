import Link from 'next/link'
import cls from "../styles/pageNotFound.module.scss"
import {common} from "../locales/common";
import {useRouter} from "next/router";

export default function FourOhFour() {
    const {locale} = useRouter()
    return (
        <div className={cls.container}>
            <h1>404 - {common[locale].pageNotFound}</h1>
            <Link href="/">
                <a className={cls.link}>
                    {common[locale].goBack}
                </a>
            </Link>
        </div>
    )
}