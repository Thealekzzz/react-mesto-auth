import React, { useContext } from 'react';
import deleteIcon from '../images/deleteIcon.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = currentUser._id === card.owner._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleCardClick() {
        onCardClick(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <article className="card">
            <img src={card.link} alt={`${card.name}, фото`} onClick={handleCardClick} className="card__image" />
            <div className="card__caption-wrapper">
                <h2 className="card__caption">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button 
                        type="button" 
                        aria-label="Кнопка поставить лайк."
                        className={`card__like-button ${isLiked ? 'card__like-button_active' : ""} hoverable hoverable_level_medium`}
                        onClick={handleCardLike}
                    ></button>

                    <p className="card__like-count">{card.likes.length}</p>

                </div>
            </div>

            {isOwn && <img src={deleteIcon} alt="Кнопка удалить карточку" className="card__remove-button hoverable" onClick={handleCardDelete} />}

        </article>
    );
};

export default Card;