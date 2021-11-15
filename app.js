const formValidator = (form, fieldsConfig, onValidateSuccess, onValidationError) => {

    const validateField = (fieldElement, fieldConfig) => {
      const value = fieldElement.value;
      const rules = fieldConfig.rules;
      const formGroup = fieldElement.closest('.form-group');
      const errorElement =  formGroup.querySelector('.form-error-message');
  
      const fieldValidationResult = {name: fieldConfig.name, value: value, errors: []};
      rules.forEach(rule => {
        if (rule.required && !value) {
          fieldValidationResult.errors.push(rule.message);
        }
        if (rule.maxLength && `${value}`.length > rule.maxLength) {
          fieldValidationResult.errors.push(rule.message);
        }
        if (rule.mobileNumber && value) {
          if (value.startsWith('+') && value.length !== 13) {
            fieldValidationResult.errors.push(rule.message);
          }
          if (!value.startsWith('+') && value.length !== 9) {
            fieldValidationResult.errors.push(rule.message);
          }
        }
        if (rule.pn && value) {
          if (value.length !== 11) {
            fieldValidationResult.errors.push(rule.message);
          }
          // if(isNaN(Number(value))) {
          //   fieldValidationResult.errors.push(rule.message);
          // }
          if (/^[0-9]+$/.test(value) === false) {
            fieldValidationResult.errors.push(rule.message);
          }
        }
      });
  
      if (fieldValidationResult.errors.length > 0) {
        errorElement.innerText = fieldValidationResult.errors.join('\n');
      } else {
        errorElement.innerText = '';
      }
      // console.log(fieldValidationResult);
  
      return fieldValidationResult;
    }
  
    const validateOnChange = () => {
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        fieldElement.addEventListener('input', e => {
          validateField(e.target, fieldConfig);
        });
      })
    }
  
    const validateOnSubmit = () => {
      const validatedFields = [];
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        validatedFields.push(validateField(fieldElement, fieldConfig));
      });
  
      return validatedFields;
    }
  
    const listenFormSubmit = () => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('submit');
        const errors = [];
        const values = {};
        const validationResult = validateOnSubmit();
        validationResult.forEach(result => {
          values[result.name] = result.value;
          errors.push(...result.errors);
        });
        if (errors.length === 0) {
          onValidateSuccess(values);
        } else {
          onValidationError(errors);
        }
        console.log(values);
      });
    }
    listenFormSubmit();
    validateOnChange();
  
    function setFields(dataObject){
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        fieldElement.value = dataObject.hasOwnProperty(fieldConfig.name) ? dataObject[fieldConfig.name]: '';
      })
    }
  
    return {
      setFields,
    }
  }
  
  const fieldsConfig = [
    {name: 'id', rules: [{required: false}]},
    {
      name: 'first_name',
      rules: [
        {required: true, message: 'First name is required.'},
        {maxLength: 10, message: 'სიბოლოების რაოდენობა უნდა იყოს 10 ზე ნაკლები ან ტოლი'},
      ]
    },
    {
      name: 'last_name',
      rules: [
        {required: true, message: 'Last name is required.'},
      ]
    },
    {
      name: 'zip',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    },
    {
      name: 'mobile',
      rules: [
        {required: true, message: 'Mobile is required.'},
        {mobileNumber: true, message: 'lorem mobile'},
      ]
    },
    {
      name: 'pn',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
        {pn: true, message: 'lorem pn'},
      ]
    },
    {
      name: 'email',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    },
    {
      name: 'status',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    },
    {
      name: 'gender',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    }
  ];
  
  const form = document.querySelector('#user-registraion-form');
  
  const onFormSubmitSuccess = (fields) => {
    if(fields.id){
      updateUser(fields);
    }else {
      createUser(fields);
    }
  }
  const onFormSubmitError = (fields) => {
    console.log('Error', fields);
  }
  
  const formManager = formValidator(form, fieldsConfig, onFormSubmitSuccess, onFormSubmitError);
  
// 4.
const userModalId = ('#user-form-modal');
function modal(modalId){
    const modalWrapper = document.querySelector(modalId);
    const modalContent = modalWrapper.querySelector('.modal-content');
    const closeBtn= modalContent.querySelector('.close');

    modalWrapper.style.display='block';

    modalContent.addEventListener('click', e => {
        e.stopPropagation();
      });
      modalWrapper.addEventListener('click', e => {
        modalWrapper.style.display = 'none';
      });
     closeBtn.addEventListener('click', e => {
     modalWrapper.style.display='none';
});


function close(){
    modalWrapper.style.display = 'none';
  }

  return {
    close
  }
}

const modalButtons= document.querySelectorAll('[data-modal-target]');

modalButtons.forEach((btn) => {
    btn.addEventListener('click', e =>{
        console.log(e.target.dataset.modalTarget);
           modal(e.target.dataset.modalTarget);
    })

})
console.log(modalButtons);

// 1.
function getUsers(){
    fetch('http://api.kesho.me/v1/user-test/index')
    .then(resp => {
     return resp.json();
    })
    .then(data=>{
        console.log(data);
    }). catch(error=>{
        console.log(error);
    })
        
}
getUsers();

// 3.
  
    async function getUsers(){
        try {
          const response = await fetch('http://api.kesho.me/v1/user-test/index');
          const users = await response.json();
          renderUsers(users);
        } catch (e){
          console.log('Error - ', e);
        }
      }
      getUsers();
      
      function renderUser(){
        const userTableContainer = document.querySelector('#user-list');
        const userTableBody = userTableContainer.querySelector('tbody');
     }

    const userItems = users.map(user => {
      return `<tr>
                  <td>${user.id}</td>
                  <td>${user.email}</td>
                  <td>${user.first_name}</td>
                  <td>${user.last_name}</td>
                  <td>${user.gender}</td>
                  <td>${user.mobile}</td>
                  <td>${user.personal_number}</td>
                  <td>${user.zip_code}</td>
                  <td>${user.actions}</td>
                  <td><button data-user-id="${user.id}" class="user-edit" type="button">Edit</button></td>
                  <td><button data-user-id="${user.id}" class="user-remove" type="button">Delete</button></td>
              </tr>`;
    });
    console.log(userItems);
    userTableBody.innerHTML = userItems.join('');
  
  
  getUsers();
  const removeBtns = document.querySelectorAll('.user-remove');
  const editBtn=document.querySelectorAll('.user-edit');
  
//   5.
removeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tr = e.target.parentNode.parentNode;
      tr.remove();
      console.log(tr);
    })
  })
  console.log(removeBtns);
  console.log(editBtn);

  const removeBtns = document.querySelectorAll('.user-remove');

  removeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tr = e.target.parentNode.parentNode;
      tr.remove();
      console.log(tr);
    })
  })


  async function createUser(userData){
    try {
      const response = await fetch('http://api.kesho.me/v1/user-test/create', {
        method: 'post',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'}
      });
      await response.json();
      getUsers();
    }catch (e){
      console.log('Error - ', e);
    }
  }
 
  async function getUser(userId, cb) {
    try {
      `http://api.kesho.me/v1/user-test/view?id=${userId}`
       const data = await response.json();
       cb(data)
    } catch (e) {
      console.log('Error - ', e);
    }
  }

  async function updateUser(userObject) {
    POST 'http://api.kesho.me/v1/user-test/update?id=userObject.id'
  }
  async function deleteUser(userId) {
 DELETE `http://api.kesho.me/v1/user-test/delete?id=${userId}`
  }
  
   const btn = document.querySelector('#get-users');
  btn.addEventListener('click', e => {
    getUsers();
   }) 
