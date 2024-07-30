// Create the Dog class here
class Dog {
    constructor(name, avatar, age, bio) {
        this.name = name;
        this.avatar = avatar;
        this.age = age;
        this.bio = bio;
        this.hasBeenSwiped = false;
        this.hasBeenLiked = false;
    }

    setName(name) {
        this.name = name;
    }

    setAge(age) {
        this.age = age;
    }

    setBio(bio) {
        this.bio = bio;
    }

    setHasBeenSwiped() {
        this.hasBeenSwiped = true;
    }

    setHasBeenLiked(liked) {
        this.hasBeenLiked = liked;
    }

    getDogHtml() {
        const { name, avatar, age, bio } = this;

        return `
            <img class="dog-profile-image" src="./${avatar}">
            <div class="dog-profile-details">
                <p class="dog-profile-name">${name}, ${age}</p>
                <p class="dog-profile-bio">${bio}</p>
            </div>
            <img class="dog-profile-badge" id="liked" src="./images/badge-like.png">
            <img class="dog-profile-badge" id="disliked" src="./images/badge-nope.png">
          `;
    }
}

export default Dog;