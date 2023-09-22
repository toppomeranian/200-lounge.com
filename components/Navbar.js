import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SeasonPreservingLink from './SeasonPreservingLink'


export default function Navbar(props) {
    const router = useRouter()
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const buttonRef = useRef(null)

    const changeSeason = () => {
        let newPath = `${router.pathname}?season=${props.season}`;
        Object.keys(router.query).forEach(key => {
          if (key !== 'season') {
            newPath += `&${key}=${router.query[key]}`;
          }
        });
        router.push(newPath);
      };

    // Window resize listener
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

    // Click outside navbar listener
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
                    <Link href='/'>
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
                    
                    <SeasonPreservingLink to="/">
                        <a className={styles.navitem}>leaderboard</a>
                    </SeasonPreservingLink>

                    <SeasonPreservingLink to="/records">
                        <a className={styles.navitem}>records</a>
                    </SeasonPreservingLink>

                    <SeasonPreservingLink to="/stats">
                        <a className={styles.navitem}>stats</a>
                    </SeasonPreservingLink>

                    <SeasonPreservingLink to="/rules">
                        <a className={styles.navitem}>rules</a>
                    </SeasonPreservingLink>

                    <a href="https://discord.gg/uR3rRzsjhk">
                        {/* onClick={(e) => e.stopPropogation()}> */}
                        <ul className={styles.navitem}>
                            discord
                        </ul>
                    </a>
                    </>}
            </div>
        </header>
        {open ?
            <div className={styles.navdropdown} ref={ref}>
                <SeasonPreservingLink to="/">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        leaderboard
                    </a>
                </SeasonPreservingLink>
                <SeasonPreservingLink to="/records">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        records
                    </a>
                </SeasonPreservingLink>
                <SeasonPreservingLink to="/stats">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        stats
                    </a>
                </SeasonPreservingLink>
                <SeasonPreservingLink to="/rules">
                    <a className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        rules
                    </a>
                </SeasonPreservingLink>
                <a href="https://discord.gg/uR3rRzsjhk">
                    <ul className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        discord
                    </ul>
                </a>
                
            </div>
            : <></>}
    </>

    )
}