document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('table-body');
  const errorMsg = document.getElementById('error-message');
  const deleteAllBtn = document.querySelector('.delete-all');

  // Load existing data from localStorage
  const savedData = JSON.parse(localStorage.getItem('tableData')) || [];

  // Function to save data to localStorage
  function saveToLocalStorage(data) {
    localStorage.setItem('tableData', JSON.stringify(data));
  }

  function createNewRow(data = []) {
    const newRow = document.createElement('tr');
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('td');
      const inputWrapper = document.createElement('div');
      inputWrapper.classList.add('input-wrapper');
      const input = document.createElement('input');
      input.classList.add('input-box');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Enter your text');
      input.value = data[i] || ''; // Set input value from saved data if available
      const underline = document.createElement('span');
      underline.classList.add('underline');
      inputWrapper.appendChild(input);
      inputWrapper.appendChild(underline);
      cell.appendChild(inputWrapper);
      newRow.appendChild(cell);
    }
    const actionsCell = document.createElement('td');
    const saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
    saveBtn.textContent = 'Save';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    actionsCell.appendChild(saveBtn);
    actionsCell.appendChild(deleteBtn);
    newRow.appendChild(actionsCell);
    tableBody.appendChild(newRow);
  }

  // Populate existing data
  savedData.forEach(data => {
    createNewRow(data);
  });

  tableBody.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('save-btn')) {
      const inputs = target.closest('tr').querySelectorAll('.input-box');
      const values = Array.from(inputs).map(input => input.value);
      console.log('Values to save:', values);
      if (values.some(value => !value.trim())) {
        errorMsg.textContent = 'All fields must be filled';
        errorMsg.style.display = 'block';
      } else {
        errorMsg.style.display = 'none';
        saveToLocalStorage([...savedData, values]);
        createNewRow();
      }
    } else if (target.classList.contains('delete-btn')) {
      const row = target.closest('tr');
      const index = Array.from(tableBody.children).indexOf(row);
      const newData = savedData.slice(0, index).concat(savedData.slice(index + 1));
      saveToLocalStorage(newData);
      row.remove();
      // Update savedData after deleting the row
      savedData.splice(index, 1);
    }
  });
  deleteAllBtn.addEventListener('click', function () {
    tableBody.innerHTML = ''; // Remove all rows from table body
    localStorage.removeItem('tableData'); // Clear localStorage
    savedData.length = 0; // Clear the savedData array
  });
});

