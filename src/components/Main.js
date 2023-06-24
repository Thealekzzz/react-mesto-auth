import React, { useContext } from 'react';
import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) => {
	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			<main>
				<section className="profile">
					<div className="profile__info-wrapper">
						<div className="profile__avatar-wrapper">
							<img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
							<button type="button" onClick={onEditAvatar} className="profile__update-avatar"></button>

						</div>
						<div className="profile__info">
							<div className="profile__name-wrapper">
								<h1 className="profile__name">{currentUser.name}</h1>
								<button onClick={onEditProfile} className="profile__edit-button hoverable" type="button"
									aria-label="Редактировать профиль"></button>
							</div>
							<p className="profile__about">{currentUser.about}</p>
						</div>
					</div>

					<button onClick={onAddPlace} className="profile__add-button hoverable" type="button" aria-label="Кнопка добавить фото"></button>
				</section>

				<section aria-label="Места">
					<ul className="cards">
						{cards.map(card => (
							<li key={card._id} className="card-list-item">
								<Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
							</li>
						))}
					</ul>
				</section>
			</main>
		</>
	);
};

export default Main;