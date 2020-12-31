document.addEventListener('DOMContentLoaded', () => {
    User.currentUser; // class variable
    const createUserForm = document.querySelector("#create-user-form")
    createUserForm.addEventListener("submit", User.postForm);
})
