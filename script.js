const toggleButton = document.getElementById('toggleDynamicBar');
const dynamicBar = document.getElementById('dynamicBar');

let isDynamicBarVisible = false;

toggleButton.addEventListener('click', function () {
    if (isDynamicBarVisible) {
        toggleButton.textContent = 'Show';
        dynamicBar.classList.add('invisible');
        dynamicBar.classList.remove('show');
    } else {
        toggleButton.textContent = 'Hide';
        dynamicBar.classList.remove('invisible');
        dynamicBar.classList.add('show');
    }
    isDynamicBarVisible = !isDynamicBarVisible;
});

const alignBtn = document.getElementById('alignBtn');
let alignMode = 1;
const alignModes = ['left', 'center', 'right'];

alignBtn.addEventListener('click', function () {
    alignMode = (alignMode % 3) + 1;
    document.body.style.textAlign = alignModes[alignMode - 1];

});

const spotlightBtn = document.getElementById('spotlightBtn');
const spotlightSection = document.getElementById('spotlights');
spotlightBtn.addEventListener('click', function () {
    content = prompt("Please enter a spotlight of the company:")

    if (content) {
        const newSpot = document.createElement('p');
        newSpot.textContent = content;
        spotlightSection.appendChild(newSpot);
    }
})

const toastTrigger = document.getElementById('toastBtn');
const toastLiveExample = document.getElementById('liveToast')
const toastContent = document.getElementById('toastBody')
const spanElement = toastBody.querySelector('span');

if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const spanElement = toastBody.querySelector('span');

        if (spanElement) {
            spanElement.remove();
        }

        const newSpan = document.createElement('span');
        newSpan.textContent = "Current time: " + datetime;
        toastBody.appendChild(newSpan);

        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

const forms = document.querySelectorAll('.needs-validation')


Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.classList.contains('form-operation')) { 
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }
    }, false)
})

document.addEventListener("DOMContentLoaded", function() {
    fetch('comments.txt')
    .then(response => response.text())
    .then(data => {
        let comments = data.split('\n\n');

        comments.forEach((comment, index) => {
            if (comment.trim() !== '') {
                let lines = comment.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
                let email = lines[0].split(': ')[1];
                let commentText = lines[1].split(': ')[1];
                let color = lines[2].split(': ')[1].trim().toLowerCase(); // Trim and convert to lowercase

                let newComment = document.createElement("div");
                newComment.innerHTML = `<svg class="col-2 comment-icon img-fluid p-0 mt-5" height="100" width="100"><circle cx="50" cy="50" r="40" fill="${color}"></circle></svg><div class="row col-9"><h3 class="col comment-header mt-5">${email}</h3><p>${commentText}</p><div class="col-12 mt-1"><span style="margin-left: 15px;"></span></div></div>`;
                newComment.className = "d-flex";
                newComment.id = 'c' + index;

                document.querySelector("#comment-wrapper").appendChild(newComment);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching comments:', error);
    });

    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        formOperation();
    });
});

function formOperation() {
    let email = document.querySelector("#emailInput").value;
    let comment = document.querySelector("#commentInput").value;
    let color = document.querySelector('input[name="flexRadioDefault"]:checked + label').innerHTML.trim().toLowerCase(); // Trim and convert to lowercase

    fetch('comments.txt')
    .then(response => response.text())
    .then(existingComments => {
        let newData = existingComments + `\nEmail: ${email}\nComment: ${comment}\nColor: ${color}\n`;

        fetch('comments.txt', {
            method: 'PUT',
            body: newData
        })
        .then(response => {
            if (response.ok) {
                console.log('Comment saved successfully');
            } else {
                console.error('Error saving comment');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching existing comments:', error);
    });

    let newComment = document.createElement("div");
    newComment.innerHTML = `<svg class="col-2 comment-icon img-fluid p-0 mt-5" height="100" width="100"><circle cx="50" cy="50" r="40" fill="${color}"></circle></svg><div class="row col-9"><h3 class="col comment-header mt-5">${email}</h3><p>${comment}</p><div class="col-12 mt-1"><span style="margin-left: 15px;"></span></div></div>`;
    newComment.className = "d-flex";
    
    let lastComment = document.querySelector("#comment-wrapper").lastElementChild;
    let lastCommentId = lastComment ? lastComment.id : "c0";
    let newCommentId = 'c' + (Number(lastCommentId.substring(1)) + 1);
    newComment.id = newCommentId;

    document.querySelector("#comment-wrapper").appendChild(newComment);
    document.querySelector("form").reset();
}



// document.addEventListener("DOMContentLoaded", function() {
//     fetch('fileComments.txt')
//     .then(response => response.text())
//     .then(data => {
//         let comments = data.split('\n\n');

//         comments.forEach((comment, index) => {
//             if (comment.trim() !== '') {
//                 let [email, commentText, color] = comment.split('\n').map(line => line.trim()); // Trim each line

//                 let newComment = document.createElement("div");
//                 newComment.innerHTML = `<svg class="col-2 comment-icon img-fluid p-0 mt-5" height="100" width="100"><circle cx="50" cy="50" r="40" fill="${color.toLowerCase()}"></circle></svg><div class="row col-9"><h3 class="col comment-header mt-5">${email}</h3><p>${commentText}</p><div class="col-12 mt-1"><span style="margin-left: 15px;"></span></div></div>`;
//                 newComment.className = "d-flex";
//                 newComment.id = 'c' + index;

//                 document.querySelector("#comment-wrapper").appendChild(newComment);
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching comments:', error);
//     });

//     document.querySelector("form").addEventListener("submit", function(event) {
//         event.preventDefault();
//         formOperation();
//     });
// });

// function formOperation() {
//     let email = document.querySelector("#emailInput").value;
//     let comment = document.querySelector("#commentInput").value;
//     let color = document.querySelector('input[name="flexRadioDefault"]:checked + label').innerHTML;

//     fetch('fileComments.txt')
//     .then(response => response.text())
//     .then(existingComments => {
//         let newData = existingComments + `\nEmail: ${email}\nComment: ${comment}\nColor: ${color}\n`;

//         fetch('fileComments.txt', {
//             method: 'PUT',
//             body: newData
//         })
//         .then(response => {
//             if (response.ok) {
//                 console.log('Comment saved successfully');
//             } else {
//                 console.error('Error saving comment');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching existing comments:', error);
//     });

//     let newComment = document.createElement("div");
//     newComment.innerHTML = `<svg class="col-2 comment-icon img-fluid p-0 mt-5" height="100" width="100"><circle cx="50" cy="50" r="40" fill="${color.toLowerCase()}"></circle></svg><div class="row col-9"><h3 class="col comment-header mt-5">${email}</h3><p>${comment}</p><div class="col-12 mt-1"><span style="margin-left: 15px;"></span></div></div>`;
//     newComment.className = "d-flex";
    
//     let lastComment = document.querySelector("#comment-wrapper").lastElementChild;
//     let lastCommentId = lastComment ? lastComment.id : "c0";
//     let newCommentId = 'c' + (Number(lastCommentId.substring(1)) + 1);
//     newComment.id = newCommentId;

//     document.querySelector("#comment-wrapper").appendChild(newComment);
//     document.querySelector("form").reset();
// }