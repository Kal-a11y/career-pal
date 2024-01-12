// Global Elements
const signupUsername = document.querySelector('#signup-username');
const signupnPassword = document.querySelector('#signup-password');
const jsearchKey = document.querySelector('#jsearch-key')
const signupBtn = document.querySelector('#signup-button');
const signupStatusText = document.querySelector('#signup-status-text');

//Logs in user
signupBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const username = signupUsername.value.trim();
  const password = signupnPassword.value.trim();
  const apiKey = jsearchKey.value.trim();

  if (username === '' || password === '') {
    signupStatusText.textContent = `Username or password cannot be empty`;
    signupStatusText.classList.add('text-red-600');
  } else {

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, apiKey }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      if (data.message !== 'Account creation successful') {
        signupStatusText.textContent = `User "${username}" already exists`;
        signupStatusText.classList.add('text-red-600');
      } else {
        signupUsername.value = '';
        signupnPassword.value = '';
        jsearchKey.value = '';
        signupStatusText.textContent = 'Account created successfully'
        signupStatusText.classList.add('text-green-600');

      }


    } else {
      signupStatusText.textContent = `Something went wrong `;
      signupStatusText.classList.add('text-red-600');

    }
  }

})