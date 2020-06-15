'use strict';

(function () {
  const userList = document.getElementById('users-list');
  const generatePwLink = document.getElementById('generate-password');
  const userNameField = document.getElementById('user-name');
  const userEmailField = document.getElementById('email');
  const userPasswordField = document.getElementById('password');
  const form = document.getElementById('add-user-form');
  const alertContainer = document.getElementById('alerts');

  window.addEventListener('load', async () => {
    try {
      const res = await axios(`http://${window.location.hostname}:5003/users`);
      const users = res.data;

      await updateUIwithFetchedData(userList, users);
      showAlert('Data successfully fetched from server!', 'info');
    } catch (error) {
      const errorMsg = error.response.data.msg;

      if (errorMsg) {
        showAlert(error.response.data.msg, 'danger');
      } else {
        showAlert(error, 'danger');
      }
    }
  });

  userList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del-btn')) {
      const id = e.target.dataset.userid;

      try {
        const res = await axios.delete(
          `http://${window.location.hostname}:5003/users/${id}`,
        );
        console.log(res);
        const users = res.data;
        await updateUIwithFetchedData(userList, users);

        showAlert('User deleted!', 'danger');
      } catch (error) {
        const errorMsg = error.response.data.msg;
        if (errorMsg) {
          showAlert(error.response.data.msg, 'danger');
        } else {
          showAlert(error, 'danger');
        }
      }
    } else if (e.target.classList.contains('edit-btn')) {
      const id = e.target.dataset.userid;

      const infoRow = document.querySelector(
        `tr[data-userid="${id}"]:not(.hidden)`,
      );
      const editRow = document.querySelector(`tr[data-userid="${id}"].hidden`);

      infoRow.classList.add('hidden');
      editRow.classList.remove('hidden');
    } else if (e.target.classList.contains('cancel-edit-btn')) {
      const id = e.target.dataset.userid;

      const editRow = document.querySelector(
        `tr[data-userid="${id}"]:not(.hidden)`,
      );
      const infoRow = document.querySelector(`tr[data-userid="${id}"].hidden`);

      infoRow.classList.remove('hidden');
      editRow.classList.add('hidden');
    } else if (e.target.classList.contains('save-edit-btn')) {
      const id = e.target.dataset.userid;

      const userNameInput = document.querySelector(
        `tr[data-userid="${id}"] #edit-username-${id}`,
      );
      const emailInput = document.querySelector(
        `tr[data-userid="${id}"] #edit-email-${id}`,
      );
      const passwordInput = document.querySelector(
        `tr[data-userid="${id}"] #edit-password-${id}`,
      );

      try {
        const res = await axios(
          `http://${window.location.hostname}:5003/users/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              username: userNameInput.value,
              email: emailInput.value,
              password: passwordInput.value,
            },
          },
        );

        const users = res.data;

        userNameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';

        const editRow = document.querySelector(
          `tr[data-userid="${id}"]:not(.hidden)`,
        );
        const infoRow = document.querySelector(
          `tr[data-userid="${id}"].hidden`,
        );

        infoRow.classList.remove('hidden');
        editRow.classList.add('hidden');

        showAlert(
          'User data successfully edited and saved to database!',
          'success',
        );

        await updateUIwithFetchedData(userList, users);
      } catch (error) {
        const errorMsg = error.response.data.msg;
        if (errorMsg) {
          showAlert(error.response.data.msg, 'danger');
        } else {
          showAlert(error, 'danger');
        }
      }
    }
  });

  generatePwLink.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://${window.location.hostname}:5003/generatePassword`,
      );
      const password = res.data;

      userPasswordField.value = password;
      $('#password').pwstrength('forceUpdate');
    } catch (error) {
      const errorMsg = error.response.data.msg;
      if (errorMsg) {
        showAlert(error.response.data.msg, 'danger');
      } else {
        showAlert(error, 'danger');
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const res = await axios(`http://${window.location.hostname}:5003/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: userNameField.value,
          email: userEmailField.value,
          password: userPasswordField.value,
        },
      });

      const users = res.data;

      showAlert('User successfully added!', 'success');
      await updateUIwithFetchedData(userList, users);

      userNameField.value = '';
      userEmailField.value = '';
      userPasswordField.value = '';
    } catch (error) {
      const errorMsg = error.response.data.msg;
      if (errorMsg) {
        showAlert(error.response.data.msg, 'danger');
      } else {
        showAlert(error, 'danger');
      }
    }
  });

  async function updateUIwithFetchedData(uiElement, userData) {
    if (uiElement) {
      uiElement.innerHTML = '';

      if (!userData || userData.length === 0) {
        uiElement.innerHTML = '<p>No data available</p>';
      } else {
        uiElement.innerHTML += `<table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody></tbody>
            </table>`;

        const tableBody = document.querySelector('#users-list tbody');

        userData.forEach((user) => {
          tableBody.innerHTML += `
            <tr data-userId=${user.id}>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.password}</td>
              <td class="text-align-right"><button class="btn btn-info edit-btn" data-userId=${user.id}><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
              <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
            </svg></button><button class="btn btn-danger del-btn" data-userId=${user.id}><svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
        </svg></button></td>
            </tr>
            <tr data-userId=${user.id} class="hidden">
              <td><label for="edit-username"><strong>First Name:</strong></label>&nbsp;<input type="text" name="edit-username" id="edit-username-${user.id}" required value="${user.username}"></td>
              <td><label for="edit-email"><strong>Last Name:</strong></label>&nbsp;<input type="text" name="edit-email" id="edit-email-${user.id}" required value="${user.email}"></td>
              <td><label for="edit-password"><strong>Last Name:</strong></label>&nbsp;<input type="text" name="edit-password" id="edit-password-${user.id}" required value="${user.password}"></td>
              <td class="text-align-right"><button class="btn btn-info save-edit-btn" data-userId=${user.id}><svg class="bi bi-check2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg></button><button class="btn btn-danger cancel-edit-btn" data-userId=${user.id}><svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
        </svg></button></td>
            </tr>
            `;
        });
      }
    }
  }

  function showAlert(text, type) {
    const alertId = generateUUID();

    alertContainer.innerHTML += `
      <div class="alert alert-${type} alert-dismissible fade show" data-alertid="${alertId}" role="alert">
        ${text}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;

    setTimeout(() => {
      document.querySelector(`[data-alertid="${alertId}"]`).remove();
    }, 3000);
  }

  function generateUUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
})();
