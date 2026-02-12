import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        console.log("Preloader mounted, setting timer...");

        // Slightly longer duration to ensure user sees it
        const timer = setTimeout(() => {
            console.log("Timer finished, hiding Preloader...");
            setIsVisible(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    // Initial render might return null if not mounted for portal, 
    // but in CRA/Vite usually document.body is available.
    // We use a portal to ensure it is outside of any overflow:hidden containers or z-index traps.
    if (!mounted) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="preloader"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 99999, /* Very high z-index */
                        display: 'flex',
                        pointerEvents: 'none' /* Allow clicks to pass through after it visually disappears if something goes wrong, but conceptually opaque div blocks clicks */
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.9 }}
                >
                    {/* Block clicks while visible */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }} />

                    {/* Left Panel */}
                    <motion.div
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundColor: '#121212',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            position: 'relative'
                        }}
                        initial={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <motion.div
                            style={{
                                marginRight: '12px',
                                color: 'white',
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontWeight: 400,
                                fontSize: 'clamp(2rem, 5vw, 5rem)',
                                letterSpacing: '0.1em',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            BRIANNA
                        </motion.div>
                    </motion.div>

                    {/* Right Panel */}
                    <motion.div
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundColor: '#121212',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            position: 'relative'
                        }}
                        initial={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <motion.div
                            style={{
                                marginLeft: '12px',
                                color: 'white',
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontWeight: 400,
                                fontSize: 'clamp(2rem, 5vw, 5rem)',
                                letterSpacing: '0.1em',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            DAWES STUDIOS
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
