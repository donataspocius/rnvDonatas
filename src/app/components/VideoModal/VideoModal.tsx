import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import style from './VideoModal.module.scss';
import { useDispatch } from 'react-redux';
import { setPlayVideo } from '../../state/content/contentSlice';

interface VideoModalProps {
    videoUrl: string;
}

const VideoModal = ({ videoUrl }: VideoModalProps) => {
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    const closeVideo = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            const videoElement = modalRef.current.querySelector('video');
            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0;
                dispatch(setPlayVideo(false));
            }
        }
    };

    useEffect(() => {
        const handleEscKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                dispatch(setPlayVideo(false));
            }
        };
        document.addEventListener('keydown', handleEscKeyDown);
        return () => {
            document.removeEventListener('keydown', handleEscKeyDown);
        };
    }, [dispatch]);

    return (
        <div className={style.backdrop} onClick={closeVideo}>
            <div className={style.modal} ref={modalRef}>
                <button className={style.closeButton} onClick={() => dispatch(setPlayVideo(false))}>
                    <AiOutlineClose size={20} className={style.icon} />
                </button>
                <video src={videoUrl} autoPlay controls>
                    Sorry, your browser doesn't support embedded videos
                </video>
            </div>
        </div>
    );
};

export default VideoModal;
