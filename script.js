'use strict';

const url = 'https://jsonplaceholder.typicode.com/posts';

const getInfo = (link, func) => {
  fetch(link)
    .then((response) => response.json())
    .then((data) => func(data))
    .catch((error) => console.log(new Error(error)));
};

const createComments = (data) => {
  const newPost = document.querySelector(`[post-id = "${data[0].postId}"]`);
  const commentsWrapper = newPost.querySelector('.comments__wrapper');
  commentsWrapper.classList.add('active');

  data.forEach(({ name, email, body, postId }) => {
    commentsWrapper.insertAdjacentHTML('beforeend', `
      <div class="comment" comment-id = ${postId}>
          <h3 class="comment__title">${name}</h3>
          <div class="comment__mail">${email}</div>
          <div class="comment__body">${body}</div>
      </div>
      `);
  });

  commentsWrapper.insertAdjacentHTML('beforeend', `
      <button class="comments__btn-back btn">Back</button>
  `);

  document.querySelectorAll('.comments__btn-back').forEach((el) => {
    el.style.display = 'block';
  });

  const btnBack = document.querySelectorAll('.comments__btn-back');

  btnBack.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const targetCommentsBlock = event.target.closest('.comments__wrapper');
      targetCommentsBlock.classList.remove('active');
      targetCommentsBlock.replaceChildren();
    });
  });
};

const getCommentsUrl = (e) => {
  const idPost = e.target.closest('[post-id]').getAttribute('post-id');
  const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${idPost}/comments`;

  getInfo(commentsUrl, createComments);
};

const createCard = (data) => {
  data.forEach(({ title, body, id }) => {
    if (id <= 10) {
      const element = document.createElement('div');
      element.setAttribute('post-id', id);

      element.classList.add('post');

      element.innerHTML = `
        <h3 class="post__title">${title}</h3>
        <div class="post__body">${body}</div>
        <button class="post__btn btn">Comments</button>
        <div class="comments__wrapper"></div>
          `;
      document.querySelector('.blogs').append(element);
    }

    const btnComments = document.querySelectorAll('.post__btn');

    btnComments.forEach((element) => {
      element.addEventListener('click', getCommentsUrl);
    });
  });
};

getInfo(url, createCard);
