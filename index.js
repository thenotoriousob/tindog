// Remember to import the data and Dog class!
import { dogs } from "./data.js";
import Dog from "./Dog.js";

const profileModal = document.querySelector("dialog");
const profileForm = document.getElementById("user-profile-form");
const mainEl = document.getElementById("main");
const likedProfilesEl = document.getElementById("liked-profiles");
const dogProfiles = [];
const userProfile = new Dog("Shenanigans", "dog-shenanigans.png", 4, "Shenanigans by name, shenanigans by nature");

let currentDogIndex = 0;
let currentDog = new Dog(dogs[currentDogIndex].name,
                         dogs[currentDogIndex].avatar,
                         dogs[currentDogIndex].age,
                         dogs[currentDogIndex].bio);

document.addEventListener("click", (e) => {

    if (e.target.id === "btn-like") {
        handleSwipedClick("liked");
    }
    else if (e.target.id === "btn-dislike") {
        handleSwipedClick("disliked");
    }
    else if (e.target.id === "logo-btn") {
        handleLogoClick();
    }
    else if(e.target.id === "chat-btn") {
        renderLikedDogs();
    }
    else if(e.target.id === "profile-btn") {
        openOrCloseModal(true);
    }
    else if(e.target.id === "modal-close-btn") {
        openOrCloseModal(false);
    }

});

profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleProfileSubmit();
});

function handleSwipedClick(isSwiped) {

    const swipedEl = document.getElementById(isSwiped);
    const isLiked = isSwiped === "liked";

    swipedEl.style.display = "inline";

    currentDog.setHasBeenSwiped();
    currentDog.setHasBeenLiked(isLiked);
    /* Keep track of the dogs for the chat page */
    dogProfiles.push(currentDog);

    getNewDog();
};

function handleLogoClick() {

    /* If the logo is clicked and we are not at the end of the
    array of dogs then display the current dog, otherwise reset game */
    if (currentDogIndex === dogs.length) {
        // Reset gane
        dogProfiles.length = 0;
        // Set to -1 as it gets incremented in getNewDog so will end as 0
        currentDogIndex = -1;
        getNewDog();
    }
    else {
        // Display current dog
        renderDogs(currentDog);
    };
};

function openOrCloseModal(openModal) {

    if (openModal) {
        profileModal.showModal();
        document.getElementById("name").focus();
    } else {
        profileModal.close();
    }

    mainEl.classList.toggle("blur-background");

};

function handleProfileSubmit() {

    const profileFormData = new FormData(profileForm);
    const name = profileFormData.get('name');
    const age = profileFormData.get('age');
    const bio = profileFormData.get('bio');
    const avatar = profileFormData.get('avatar-loc');

    profileForm.reset();

    userProfile.setName(name);
    userProfile.setAge(age);
    userProfile.setBio(bio);
    userProfile.setAvatar(avatar)

    renderUser(userProfile.name, userProfile.age, userProfile.bio, userProfile.avatar);

    openOrCloseModal(false);

};

function renderDogs(dog) {
    document.getElementById("dogs").innerHTML = dog.getDogHtml();

    showMainFrame(true);
};

function renderLikedDogs() {

    const likedProfiles = dogProfiles.filter(dog => dog.hasBeenLiked === true);

    showMainFrame(false);

    /* If there are any dogs that have been liked then
      display them, otherwise a message saying there are none liked */
    likedProfilesEl.innerHTML = "<h2>Messages</h2>";

    if (likedProfiles.length > 0) {
        likedProfiles.filter(profile => {
            likedProfilesEl.innerHTML += `
            <div class="liked-profile-header">
                <img src="${profile.avatar}" class="liked-profile-avatar"
                  onerror="this.src='./images/blank-profile.png'">
                <p>${profile.name}</p>
            </div>
            `
        });
    }
    else {
        likedProfilesEl.innerHTML += `
          <p>You haven't liked any profiles at this moment.</p>
        `
    };
};

function showMainFrame(mainFrame) {

    /* There are 2 frames, the main frame and the liked profiles frame,
      decide which on should be displayed */
    if (mainFrame) {
        likedProfilesEl.style.display = "none";
        mainEl.style.display = "block";
    } else {
        likedProfilesEl.style.display = "flex";
        mainEl.style.display = "none";
    };
};

function getNewDog() {

    setTimeout(function() {

        currentDogIndex++;

        if (currentDogIndex >= dogs.length) {
            renderLikedDogs();
        } else {

            currentDog = new Dog(dogs[currentDogIndex].name,
                                  dogs[currentDogIndex].avatar,
                                  dogs[currentDogIndex].age,
                                  dogs[currentDogIndex].bio);

            renderDogs(currentDog);

            showMainFrame(true);
        }

    },500);

};

function renderUser(name, age, bio, avatar) {

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("bio").value = bio;
    document.getElementById("bio").value = bio;
    document.getElementById("avatar-loc").value = avatar;
    document.getElementById("avatar").src = `./images/${avatar}`;
    document.getElementById("profile-btn").src = `./images/${avatar}`;
};

renderDogs(currentDog);

renderUser(userProfile.name, userProfile.age, userProfile.bio, userProfile.avatar);