import Card from "../components/Card";
import { userInfo, api, viewPopup, deletePopup } from "../consts";

export function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleCardClick, handleCardRemove, handleCardLike, userInfo._id);
    const cardItem = card.createCard();

    return cardItem;
}

export function handleCardClick() {
    viewPopup.open({ link: this.getCardData().link, cardName: this.getCardData().name });
}

export function handleCardRemove() {
    deletePopup.setHandleSubmit(() => {
        deletePopup.setLoading(true);

        api.removeCard(this.getCardId())
        .then(() => {
            this.deleteCard();

            deletePopup.close();
        })
        .catch((err) => {
            console.log("Ошибка при удалении фотографии");
            console.error(err);
        })
        .finally(() => {
            deletePopup.setLoading(false);
        });
    });

    deletePopup.open();
}

export function handleCardLike() {
    const apiFunction = (this.getCardData().likes.some(userLiked => (userLiked._id === userInfo._id)))
    ? api.unlikeCard.bind(api)
    : api.likeCard.bind(api);


    apiFunction(this.getCardId())
    .then(recievedCardData => {
        this.setCardData(recievedCardData);
        this.updateLikesCount();
        this.cardLikeButton.classList.toggle("card__like-button_active");
    })
    .catch((err) => {
        console.log("Ошибка обновления данных о лайке");
        console.error(err);
    })

}