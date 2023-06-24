import { useEffect, useState } from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';

import api from '../utils/api';

import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

import ValidationOptionsContext from '../contexts/ValidationOptionsContext';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);
  const [isDeleteCardPopupLoading, setIsDeleteCardPopupLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleDeleteCardClick(card) {
    setCardToDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsDeleteCardPopupOpen(false);

    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log("Ошибка обновления данных о лайке");
      });
  }

  function handleCardDelete(card) {
    setIsDeleteCardPopupLoading(true);
    api.removeCard(card._id)
      .then(() => {
        setCards(prev => prev.filter((c) => c._id !== card._id));
        setCardToDelete({});
        closeAllPopups();
      })
      .catch(err => {
        console.log("Ошибка удаления карточки");
      })
      .finally(() => {
        setIsDeleteCardPopupLoading(false);
      });
  }

  function handleUpdateUser(userData) {
    setIsEditProfilePopupLoading(true);

    api.patchUserData(userData)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log("Ошибка обновления данных пользователя");

      })
      .finally(() => {
        setIsEditProfilePopupLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsEditAvatarPopupLoading(true);
    api.updateAvatar(data.avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log("Ошибка обновления аватара");
      })
      .finally(() => {
        setIsEditAvatarPopupLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsAddPlacePopupLoading(true);
    api.addCard(newCard)
      .then(data => {
        setCards(prev => [data, ...prev]);
        closeAllPopups();
      })
      .catch(err => {
        console.log("Ошибка добавления карточки");
      })
      .finally(() => {
        setIsAddPlacePopupLoading(false);
      });
  }

  useEffect(() => {
    api.getUserData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log("Ошибка получения данных пользователя");
      });

    api.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.log("Ошибка получения фотографий");
      });
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          onUpdateUser={handleUpdateUser}
          cards={cards}
          selectedCard={selectedCard}
        />
        <Footer />

        <ValidationOptionsContext.Provider value={{
          formSelector: '.popup__form',
          inputSelector: '.popup__input',
          submitButtonSelector: '.popup__submit-button',
          inactiveButtonClass: 'popup__submit-button_disabled',
          inputErrorClass: 'popup__input_invalid',
          errorClass: 'popup__input-error_visible'
        }}>
          <EditProfilePopup isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} isLoading={isEditProfilePopupLoading} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpened} onClose={closeAllPopups} isLoading={isAddPlacePopupLoading} onSubmit={handleAddPlaceSubmit} />

          <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />

          <ConfirmPopup isLoading={isDeleteCardPopupLoading} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onSubmit={() => handleCardDelete(cardToDelete)} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpened} onClose={closeAllPopups} isLoading={isEditAvatarPopupLoading} onUpdateAvatar={handleUpdateAvatar} />

        </ValidationOptionsContext.Provider>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
