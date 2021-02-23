import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
    
    return (
        <div className={styles.headerContainer}>
            {/* Logo links to home page */}
            <Link href="/">
                <a>
                <Image src="/Recipe-Keeper-logo.svg" alt="logo" width="220" height="150" layout="intrinsic"/>
                </a>
            </Link>
        </div>
    )
}