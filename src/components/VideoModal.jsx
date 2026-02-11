import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import './VideoModal.css'

export default function VideoModal({ isOpen, onClose, videoSrc }) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="video-modal-overlay" onClick={onClose}>
                    <motion.div
                        className="video-modal-content"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="video-modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>
                        <div className="video-wrapper">
                            <video
                                src={videoSrc || "/logo-animation.webm"}
                                controls
                                autoPlay
                                className="video-player"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
