import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
    
    return (
        <div className={styles.headerContainer}>
            <Link href="/">
                <a>
                <Image src="/Recipe-Keeper-logo.svg" alt="logo" width="220" height="120" layout="intrinsic" className={styles.logo}/>
                </a>
            </Link>
        </div>
    )
}