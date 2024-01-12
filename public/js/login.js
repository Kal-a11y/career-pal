// Global Elements
const popup = document.querySelector('#jsearch-key-popup');
const popupBtn = document.querySelector('#jsearch-key-popup-button');
const jsearchInstruction = document.querySelector('#jsearch-instructions');

const loginUsername = document.querySelector('#login-username');
const loginPassword = document.querySelector('#login-password');
const loginBtn = document.querySelector('#login-button');
const loginStatusText = document.querySelector('#login-status-text');

// Toggles view of jsearch instructions popup
const jsearchPopupToggle = ()=> {
    popup.classList.toggle('hidden');   
}

// Event listeners
popupBtn.addEventListener('click', jsearchPopupToggle);
jsearchInstruction.addEventListener('click', jsearchPopupToggle);

//Logs in user
loginBtn.addEventListener('click', async (event)=> {
    event.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    console.log(username)

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/job-search');
      } else {
        loginStatusText.textContent = 'Invalid username or password';
        loginStatusText.classList.add('text-red-600');

      }
})