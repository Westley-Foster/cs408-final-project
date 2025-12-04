/** Original code was replaced with working Javascript that allowed the inventory to be shared between webpages.
 *  I originally had two separate files (inventory.js and itempickup.js), but they conflicted. itempickup.js, as of now
 *  is unneeded and has been omitted from previous HTML webpages.
 */
document.addEventListener("DOMContentLoaded", function () {
    // --- Potion Pickup Button (PUT to AWS) ---
    const pickupButton = document.getElementById("pickup-potion");
    if (pickupButton) {
        pickupButton.addEventListener("click", function () {
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
    }
    
    // ADD ITEM FROM FORM
    document.getElementById("send-data").addEventListener("click", function () {
        const id = document.getElementById("put-id").value.trim();
        const name = document.getElementById("put-name").value.trim();

        if (!id || !name) {
            alert("Please enter both ID and Name.");
            return;
        }

        const item = { id, name };

        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(item));

        xhr.onload = function () {
            if (xhr.status === 200) {
                alert(`${item.name} added to inventory`);
                loadInventory(); // <-- refresh table immediately
            } else {
                alert("Error: " + xhr.statusText);
            }
        };
    });

    // INVENTORY BUTTON OPENS TABLE
    document.getElementById("inventory-button").addEventListener("click", function () {
        const panel = document.getElementById("inventory-panel");

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
            loadInventory(); // <-- load items from AWS
        }
    });

    // LOAD INVENTORY FROM AWS AND POPULATE TABLE
    function loadInventory() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const items = JSON.parse(xhr.responseText);

                const tbody = document.getElementById("inventory-body");
                tbody.innerHTML = ""; // clear previous

                // Sort IDs properly (numeric inside strings like "potion12")
                items.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

                items.forEach(item => {
                    const tr = document.createElement("tr");

                    // ID
                    const tdId = document.createElement("td");
                    tdId.textContent = item.id;

                    // Name
                    const tdName = document.createElement("td");
                    tdName.textContent = item.name;

                    // DROP BUTTON
                    const tdAction = document.createElement("td");
                    const btn = document.createElement("button");
                    btn.textContent = "Drop";
                    btn.onclick = () => deleteItem(item.id, tr);
                    tdAction.appendChild(btn);

                    tr.appendChild(tdId);
                    tr.appendChild(tdName);
                    tr.appendChild(tdAction);
                    tbody.appendChild(tr);
                });
            } else {
                alert("Failed to load inventory.");
            }
        };

        xhr.send();
    }

    // DELETE ITEM FROM AWS & REMOVE ROW
    function deleteItem(id, row) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://gm93zn2dn7.execute-api.us-east-2.amazonaws.com/inventory/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onload = function () {
            if (xhr.status === 200) {
                row.remove();
                alert(`Removed ${id}`);
            } else {
                alert("Error: " + xhr.statusText);
            }
        };
    }
});