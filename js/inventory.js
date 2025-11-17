/* inventory.js was written entirely with ChatGPT */
document.addEventListener("DOMContentLoaded", function () {
    // PUT Request
    // Written with help from ChatGPT
            document.getElementById("send-data").addEventListener("click", function () {
                const id = document.getElementById("put-id").value.trim();
                const name = document.getElementById("put-name").value.trim();
                const price = parseFloat(document.getElementById("put-price").value);

                if (!id || !name || isNaN(price)) {
                    alert("Please enter valid ID, name, and price.");
                    return;
                }

                const xhr = new XMLHttpRequest();
                xhr.open("PUT", "https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory");
                xhr.setRequestHeader("Content-Type", "application/json");

                const data = { id: id, name: name, price: price};
                xhr.send(JSON.stringify(data));

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        alert("Item added or updated successfully!");
                    } else {
                        alert("Error: " + xhr.statusText);
                    }
                };
            });

    // GET Request
    // Written with help from ChatGPT
        document.getElementById("load-data").onclick = function() {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory");

            xhr.onload = function() {
                if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const tbody = document.getElementById("lambda-info");
                tbody.innerHTML = ""; // clear previous table contents

                // Sort items by ID (assuming numeric IDs; if string, this still works lexically)
                data.sort((a, b) => {
                    // If IDs are numbers
                    if (!isNaN(a.id) && !isNaN(b.id)) return a.id - b.id;
                    // Otherwise, compare as strings
                    return a.id.toString().localeCompare(b.id.toString());
                });

                // Add sorted rows
                data.forEach(item => addRowToTable(item));

                } else {
                alert("Failed to load items.");
                }
            };

                xhr.send();

            };

            // Helper function to add a row dynamically
            function addRowToTable(item) {
                const tbody = document.getElementById("lambda-info");
                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = item.id;

                const tdName = document.createElement("td");
                tdName.textContent = item.name;

                const tdPrice = document.createElement("td");
                tdPrice.textContent = item.price;

                const tdAction = document.createElement("td");
                const delBtn = document.createElement("button");
                delBtn.textContent = "Delete";
                delBtn.classList.add("delete-btn"); // ← add this line
                delBtn.onclick = function() { deleteItem(item.id, tr); };
                tdAction.appendChild(delBtn);

                tr.appendChild(tdId);
                tr.appendChild(tdName);
                tr.appendChild(tdPrice);
                tr.appendChild(tdAction);
                tbody.appendChild(tr);
            }

    // DELETE Request
    // Written with help from ChatGPT
            document.getElementById("delete-data").addEventListener("click", function () {
                const id = document.getElementById("delete-id").value.trim();

                if (!id) {
                    alert("Please enter an ID to delete");
                    return;
                }

                const xhr = new XMLHttpRequest();
                xhr.open("DELETE", `https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory/${id}`);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send();

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        alert(`Item with ID ${id} deleted successfully!`);
                    } else {
                        alert("Error deleting item: " + xhr.statusText);
                    }
                };
            });

        // Helper for delete buttons inside table
        function deleteItem(id) {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", `https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory/${id}`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            xhr.onload = function() {
                if (xhr.status === 200) {
                    alert(`Item ${id} deleted.`);
                }
            }
        }
});