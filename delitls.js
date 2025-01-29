    // Employee data (initial set)
    let employees = [
        { name: "Praveen", age: 23, salary: 45000 },
        { name: "Surendhar", age: 24, salary: 47000 },
        { name: "Gowtham", age: 23, salary: 49900 }
    ];
    let editIndex = -1; // To track the index of the employee being edited

    // Sort employees array in descending order by salary
    function sortEmployees() {
        employees.sort((a, b) => b.salary - a.salary);
        displayEmployees();
    }
     // Sort employees array in ascending order by salary
    function sortaEmployees() {
        employees.sort((a, b) => a.salary - b.salary);
        displayEmployees();
    }
    
    // Insert a new employee into the table
    function toggleInsertForm() {
        const form = document.getElementById("insertForm");
        form.style.display = form.style.display === "none" ? "block" : "none";
    }
    
    function insertEmployee() {
        const name = document.getElementById("newName").value;
        const age = document.getElementById("newAge").value;
        const salary = document.getElementById("newSalary").value;
    
        // Validate input
        if (name && age && salary) {
            // Insert the new employee at the top of the list
            employees.unshift({ name, age: parseInt(age), salary: parseInt(salary) });
            // Re-sort employees after inserting to maintain descending order
            sortEmployees();
            toggleInsertForm(); // Close form after inserting
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Filter employees by salary greater than 100000
    function filterEmployees() {
        const filtered = employees.filter(emp => emp.salary > 100000);
        displayEmployees(filtered);
    }

    // Search employee by name
    function searchEmployee() {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const filtered = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm));
        displayEmployees(filtered);
    }

    // Edit employee details via a form (now uses the form instead of prompt)
    function editEmployee(index) {
        const employee = employees[index];
        // Pre-fill the edit form with the current employee data
        document.getElementById("editName").value = employee.name;
        document.getElementById("editAge").value = employee.age;
        document.getElementById("editSalary").value = employee.salary;
        // Show the edit form
        document.getElementById("editForm").style.display = "block";
        editIndex = index; // Store the index of the employee being edited
    }

    // Update the employee after editing
    function updateEmployee() {
        const newName = document.getElementById("editName").value;
        const newAge = document.getElementById("editAge").value;
        const newSalary = document.getElementById("editSalary").value;

        if (newName && newAge && newSalary) {
            const employee = employees[editIndex];
            employee.name = newName;
            employee.age = parseInt(newAge);
            employee.salary = parseInt(newSalary);
            // Close the edit form and update the table
            cancelEdit();
            displayEmployees();
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Cancel the edit and hide the form
    function cancelEdit() {
        document.getElementById("editForm").style.display = "none";
    }

    // Delete employee row
    function deleteEmployee(index) {
        if (confirm(`Are you sure you want to delete ${employees[index].name}?`)) {
            employees.splice(index, 1); // Remove employee from the array
            displayEmployees();
        }
    }

    // View employee details (show in alert)
    function viewEmployee(index) {
        const employee = employees[index];
        alert(`Employee Details:
Name: ${employee.name}
Age: ${employee.age}
Salary: $${employee.salary}`);
    }


// Display employee data in the table (reversed)
function displayEmployees(data = employees) {
    const tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Reverse the data to display in reverse order
    data.reverse();

    // Loop through employee data and create table rows
    data.forEach((employee, index) => {
        const row = document.createElement("tr");

        // S. No. column (reverse order)
        const snoCell = document.createElement("td");
        snoCell.textContent = data.length - index;
        row.appendChild(snoCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = employee.name;
        row.appendChild(nameCell);

        const ageCell = document.createElement("td");
        ageCell.textContent = employee.age;
        row.appendChild(ageCell);

        const salaryCell = document.createElement("td");
        salaryCell.textContent = employee.salary;
        row.appendChild(salaryCell);

        // Action column (View, Edit, Delete)
        const actionCell = document.createElement("td");

        const viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.classList.add("action-btn");
        viewButton.onclick = () => viewEmployee(index);
        actionCell.appendChild(viewButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("action-btn");
        editButton.onclick = () => editEmployee(index);
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("action-btn");
        deleteButton.onclick = () => deleteEmployee(index);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

    // Initial display of employees
    displayEmployees();