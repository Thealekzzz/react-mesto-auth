import { addFormValidator, editFormValidator, avatarUpdateValidator, userInfo, api, cardsSection } from "../consts.js";
import { createCard } from "./cardUtils.js";

export function handleEditPopupSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    api.patchUserData(this.getInputValues())
    .then(recievedUserData => {
        userInfo.setUserInfo(recievedUserData);
        this.close();
    })
    .catch((err) => {
        console.log("Ошибка при изменении данных пользователя");
        console.error(err);
    })
    .finally(() => {
        this.setLoading(false);
    });

}

export function handleAddPopupSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    api.addCard(this.getInputValues())
    .then(recievedCardData => {
        cardsSection.setItem(createCard(recievedCardData));
        this.close();
    })
    .catch((err) => {
        console.log("Ошибка при добавлении фотографии");
        console.error(err);
    })
    .finally(() => {
        this.setLoading(false);
    });

}

export function handleAvatarUpdateSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    const avatarURL = this.getInputValues().link;

    api.updateAvatar(avatarURL)
    .then(recievedUserData => {
        userInfo.setUserInfo(recievedUserData);
        this.close();
    })
    .catch((err) => {
        console.log("Ошибка при обновлении аватара");
        console.error(err);
    })
    .finally(() => {
        this.setLoading(false);
    });

}

export function handleOpenEditPopup() {
    editFormValidator.resetValidation();
    this.fillFormWithData(userInfo.getUserInfo())
}

export function handleOpenAddPlacePopup() {
    addFormValidator.resetValidation();

}

export function handleOpenAvatarPopup() {
    avatarUpdateValidator.resetValidation();
}