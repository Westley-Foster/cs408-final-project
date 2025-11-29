/* inventory.js was written entirely with ChatGPT */
document.addEventListener("DOMContentLoaded", function () {
    // PUT Request
    // Written with help from ChatGPT
    document.getElementById("pickup-potion").addEventListener("click", function () {
        const item = { name: "Health Potion" };

        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(item));

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                alert(`${item.name} added to inventory! (ID: ${response.id})`);
            } else {
                alert("Error: " + xhr.statusText);
            }
        };
    });

     // DELETE Request
    // Written with help from ChatGPT
    // Inventory button (single listener)
    document.getElementById("inventory-button").addEventListener("click", function () {
        const panel = document.getElementById("inventory-panel");

        // Toggle panel visibility
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
            loadInventory();  // fetch items from AWS
        }
    });

    
    // Function to fetch and populate inventory
    function loadInventory() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const tbody = document.getElementById("inventory-body");

                // Clear previous rows
                tbody.innerHTML = "";

                // Sort items by ID numerically if possible
                data.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

                // Populate table
                data.forEach(item => {
                    const tr = document.createElement("tr");

                    const tdId = document.createElement("td");
                    tdId.textContent = item.id;

                    const tdName = document.createElement("td");
                    tdName.textContent = item.name;

                    // Action column
                    const tdAction = document.createElement("td");
                    const delBtn = document.createElement("button");
                    delBtn.textContent = "Drop";
                    delBtn.addEventListener("click", () => deleteItem(item.id, tr));
                    tdAction.appendChild(delBtn);

                    // Append all columns to row
                    tr.appendChild(tdId);
                    tr.appendChild(tdName);
                    tr.appendChild(tdAction);

                    // Append row to tbody
                    tbody.appendChild(tr);
                });
            } else {
                alert("Failed to load inventory: " + xhr.statusText);
            }
        };

        xhr.send();
    }

    function deleteItem(id, rowElement) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onload = function() {
            if (xhr.status === 200) {
                // Remove row from table
                rowElement.remove();
                alert(`Dropped ${id} from inventory.`);
            } else {
                alert("Error deleting item: " + xhr.statusText);
            }
        };
    }
});