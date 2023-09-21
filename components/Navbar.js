import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'


export default function Navbar(props) {
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        function handleResize() {
            setWidth(typeof window === 'undefined' ? 0 : window.innerWidth)
            setIsMobile(width > 1000 ? false : true)
            if (!isMobile) {
                // close the hamburger menu if we are no longer mobile
                setOpen(false)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    },)

    useEffect(() => {
        function handleOutsideClick(event) {
            if (buttonRef.current?.contains(event.target)) {
                return
            }
            if (!ref.current?.contains(event.target)) {
                setOpen(false)
              }
        }
        // handleOutsideClick()
        window.addEventListener("mousedown", handleOutsideClick)
        return () => window.removeEventListener("mousedown", handleOutsideClick)
    }, [ref])



    return (<>
        {/* <header className={styles.navbar}> */}
        <header className={styles.navbar}>
            <div className={styles.navitemwrapper}>
                <ul>
                    <Link href={props.currentSeason == 6 ? "/" : `/s${props.currentSeason}`}>
                        <div className={styles.navitem}>
                            200cc lounge
                        </div>
                    </Link>
                </ul>
            </div>
            <div className={styles.navitemwrapper2} ref={buttonRef}>
                {isMobile ? <>
                    <div className={styles.navitem3}>
                        <Image src='/icons8-menu.svg' alt='navigation' width='30px' height='30px' onClick={() => setOpen(!open)} />
                    </div>

                </> : <>

                    <Link href={props.currentSeason == 6 ? "/" : `/s${props.currentSeason}`}>
                        {/* onClick={(e) => e.stopPropogation()} */}
                        <a className={styles.navitem}>
                            leaderboard
                        </a>
                    </Link>
                    <Link href={props.currentSeason == 6 ? "/records" : `/s${props.currentSeason}/records`}>
                        {/* onClick={(e) => e.stopPropogation()}> */}
                        <a className={styles.navitem}>
                            records
                        </a>
                    </Link>
                    <Link href='/stats'>
                        {/* onClick={(e) => e.stopPropogation()} */}
                        <a className={styles.navitem}>
                            stats
                        </a>
                    </Link>
                    <Link href='/rules'>
                        {/* onClick={(e) => e.stopPropogation()} */}
                        <a className={styles.navitem}>
                            rules
                        </a>
                    </Link>
                    <a href="https://discord.gg/uR3rRzsjhk">
                        {/* onClick={(e) => e.stopPropogation()}> */}
                        <a className={styles.navitem}>
                            discord
                        </a>
                    </a>
                    
                    </>}
            </div>
        </header>
        {open ?
            <div className={styles.navdropdown} ref={ref}>
                <Link href="/">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        leaderboard
                    </a>
                </Link>
                <Link href="/records">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        records
                    </a>
                </Link>
                <Link href='/stats'>
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        stats
                    </a>
                </Link>
                <Link href='/rules'>
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        rules
                    </a>
                </Link>
                <a href="https://discord.gg/uR3rRzsjhk">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        discord
                    </a>
                </a>
                
            </div>
            : <></>}
    </>

    )
}