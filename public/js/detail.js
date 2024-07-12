const deleteButton = document.getElementById('deleteButton');
const renameButton = document.getElementById('renameButton');
const fileName = document.querySelector('h1').getAttribute('fileName');
const feedbackMessage = document.querySelector('.feedback-message');
const renameInput = document.getElementById('renameInput');

deleteButton.addEventListener('click', () => {
    fetch(`http://127.0.0.1/api/files/${fileName}`, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) {
                feedbackMessage.innerHTML = 'File deleted successfully.';
                feedbackMessage.classList.add('positive');
            }
        })
        .catch((err) => {
            feedbackMessage.innerHTML = 'Something wrong happened.';
            console.log(err);
        });
});

renameButton.addEventListener('click', () => {
    const requestBody = {
        oldName: fileName,
        newName: renameInput.value,
    };
    fetch(`http://127.0.0.1/api/files/rename`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(requestBody),
    })
        .then((response) => {
            if (response.ok) {
                feedbackMessage.innerHTML = 'File renamed successfully.';
                feedbackMessage.classList.add('positive');
            }
            else {
                feedbackMessage.innerHTML = response.statusText;
            }
        })
        .catch((err) => {
            console.log('Something is wrong');
            feedbackMessage.innerHTML = 'Something wrong happened.';
            console.log(err);
        });
});
