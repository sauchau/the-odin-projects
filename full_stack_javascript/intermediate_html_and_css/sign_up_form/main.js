const pwd_input = document.querySelector("#password");
const confirm_pwd_input = document.querySelector("#confirm_password");
const pwd_note = document.querySelector("#passwords-match-note");

function passwordsMatch() {
    return pwd_input.value === confirm_pwd_input.value;
}

function validatePasswords() {
    if (passwordsMatch()) {
        console.log("YES");
        pwd_input.classList.remove("passwords-not-matching");
        confirm_pwd_input.classList.remove("passwords-not-matching");
        pwd_input.classList.add("passwords-matching");
        confirm_pwd_input.classList.add("passwords-matching");
        pwd_note.textContent = "* Passwords match";
        pwd_note.style.color = "green";
    } else {
        console.log("NO");
        pwd_input.classList.remove("passwords-matching");
        confirm_pwd_input.classList.remove("passwords-matching");
        pwd_input.classList.add("passwords-not-matching");
        confirm_pwd_input.classList.add("passwords-not-matching");
        pwd_note.textContent = "* Passwords do not match";
        pwd_note.style.color = "red";
    }
}

pwd_input.addEventListener('input', validatePasswords);
confirm_pwd_input.addEventListener('input', validatePasswords);
