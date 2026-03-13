import giftImg from '../assets/gift.png';

interface GiftBoxProps {
    onClick: () => void;
}

const GiftBox = ({ onClick }: GiftBoxProps) => {
    return (
        <div className="gift-container" onClick={onClick}>
            <img src={giftImg} alt="Gift Box" className="gift-img" />
        </div>
    );
};

export default GiftBox;
