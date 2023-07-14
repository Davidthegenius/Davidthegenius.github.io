/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// Mocked data for testing
let incidents = [];

// Function to render the incidents
function renderIncidents() {
    const incidentList = document.getElementById('incident-list');
    incidentList.innerHTML = '';

    incidents.forEach((incident) => {
        const incidentItem = document.createElement('div');
        incidentItem.classList.add('incident-item');
        incidentItem.innerHTML = `
      <h2>${incident.title}</h2>
      <p><strong>Category:</strong> ${incident.category}</p>
      <p><strong>Description:</strong> ${incident.description}</p>
      <p><strong>Location:</strong> ${incident.location}</p>
    `;
        incidentList.appendChild(incidentItem);
    });
}

// Function to handle incident submission
function submitIncident(event) {
    event.preventDefault();

    const title = document.getElementById('incident-title').value;
    const description = document.getElementById('incident-description').value;
    const category = document.getElementById('incident-category').value;
    const location = document.getElementById('incident-location').value;

    const incident = {
        title: title,
        description: description,
        category: category,
        location: location
    };

    incidents.push(incident);
    renderIncidents();
    event.target.reset();
}

// Function to filter incidents by category
function filterIncidents() {
    const categoryFilter = document.getElementById('category-filter');
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === 'All') {
        renderIncidents();
    } else {
        const filteredIncidents = incidents.filter(incident => incident.category === selectedCategory);
        const incidentList = document.getElementById('incident-list');
        incidentList.innerHTML = '';

        filteredIncidents.forEach((incident) => {
            const incidentItem = document.createElement('div');
            incidentItem.classList.add('incident-item');
            incidentItem.innerHTML = `
        <h2>${incident.title}</h2>
        <p><strong>Category:</strong> ${incident.category}</p>
        <p><strong>Description:</strong> ${incident.description}</p>
        <p><strong>Location:</strong> ${incident.location}</p>
      `;
            incidentList.appendChild(incidentItem);
        });
    }
}

// Attach event listeners
document.getElementById('add-incident-form').addEventListener('submit', submitIncident);
document.getElementById('category-filter').addEventListener('change', filterIncidents);

