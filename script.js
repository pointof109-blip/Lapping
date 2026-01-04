// Database Simulation using LocalStorage
class Database {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        if (!localStorage.getItem('lostFoundItems')) {
            localStorage.setItem('lostFoundItems', JSON.stringify([]));
        }
        if (!localStorage.getItem('claimRequests')) {
            localStorage.setItem('claimRequests', JSON.stringify([]));
        }
        if (!localStorage.getItem('itemIdCounter')) {
            localStorage.setItem('itemIdCounter', '1');
        }
        if (!localStorage.getItem('claimIdCounter')) {
            localStorage.setItem('claimIdCounter', '1');
        }
        
        // Add sample data if empty
        const items = this.getItems();
        if (items.length === 0) {
            this.addSampleData();
        }
    }

    addSampleData() {
        const sampleItems = [
            {
                id: 'ITEM-001',
                name: 'Blue Nike Backpack',
                category: 'bags',
                description: 'Navy blue Nike backpack with gray straps. Contains textbooks and a calculator.',
                color: 'blue',
                brand: 'Nike',
                location: 'cafeteria',
                specificLocation: 'Near the vending machines',
                dateFound: '2025-01-02',
                finderName: 'Sarah Johnson',
                finderEmail: 'sarah.j@westmec.edu',
                finderPhone: '(555) 123-4567',
                status: 'active',
                image: null,
                dateSubmitted: new Date().toISOString()
            },
            {
                id: 'ITEM-002',
                name: 'iPhone 13 Pro',
                category: 'electronics',
                description: 'Black iPhone 13 Pro with a cracked screen protector. Has a blue case with cartoon characters.',
                color: 'black',
                brand: 'Apple',
                location: 'library',
                specificLocation: 'Study desk near the fiction section',
                dateFound: '2025-01-03',
                finderName: 'Michael Chen',
                finderEmail: 'michael.c@westmec.edu',
                finderPhone: '(555) 234-5678',
                status: 'active',
                image: null,
                dateSubmitted: new Date().toISOString()
            },
            {
                id: 'ITEM-003',
                name: 'Set of Car Keys',
                category: 'keys',
                description: 'Toyota car keys with a red keychain that says "Class of 2025".',
                color: 'multicolor',
                brand: 'Toyota',
                location: 'parking',
                specificLocation: 'Found near entrance B',
                dateFound: '2025-01-01',
                finderName: 'Emily Rodriguez',
                finderEmail: 'emily.r@westmec.edu',
                finderPhone: '(555) 345-6789',
                status: 'active',
                image: null,
                dateSubmitted: new Date().toISOString()
            },
            {
                id: 'ITEM-004',
                name: 'Chemistry Textbook',
                category: 'books',
                description: 'Pearson Chemistry textbook, 5th edition. Name "J. Smith" written inside the front cover.',
                color: 'multicolor',
                brand: 'Pearson',
                location: 'classroom',
                specificLocation: 'Room 204, left on desk',
                dateFound: '2024-12-20',
                finderName: 'David Park',
                finderEmail: 'david.p@westmec.edu',
                finderPhone: '(555) 456-7890',
                status: 'active',
                image: null,
                dateSubmitted: new Date().toISOString()
            },
            {
                id: 'ITEM-005',
                name: 'Black North Face Jacket',
                category: 'clothing',
                description: 'Black North Face puffer jacket, size medium. Has a small coffee stain on the left sleeve.',
                color: 'black',
                brand: 'North Face',
                location: 'gym',
                specificLocation: 'Left on bleachers',
                dateFound: '2025-01-04',
                finderName: 'Jessica Martinez',
                finderEmail: 'jessica.m@westmec.edu',
                finderPhone: '(555) 567-8901',
                status: 'active',
                image: null,
                dateSubmitted: new Date().toISOString()
            }
        ];

        sampleItems.forEach(item => {
            this.addItem(item);
        });
    }

    getItems() {
        return JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
    }

    getItemById(id) {
        const items = this.getItems();
        return items.find(item => item.id === id);
    }

    addItem(item) {
        const items = this.getItems();
        if (!item.id) {
            const counter = parseInt(localStorage.getItem('itemIdCounter'));
            item.id = `ITEM-${String(counter).padStart(3, '0')}`;
            localStorage.setItem('itemIdCounter', String(counter + 1));
        }
        items.push(item);
        localStorage.setItem('lostFoundItems', JSON.stringify(items));
        return item;
    }

    updateItem(id, updates) {
        const items = this.getItems();
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            localStorage.setItem('lostFoundItems', JSON.stringify(items));
            return items[index];
        }
        return null;
    }

    deleteItem(id) {
        const items = this.getItems();
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem('lostFoundItems', JSON.stringify(filtered));
    }

    getClaimRequests() {
        return JSON.parse(localStorage.getItem('claimRequests') || '[]');
    }

    addClaimRequest(claim) {
        const claims = this.getClaimRequests();
        const counter = parseInt(localStorage.getItem('claimIdCounter'));
        claim.id = `CLAIM-${String(counter).padStart(3, '0')}`;
        claim.dateSubmitted = new Date().toISOString();
        claim.status = 'pending';
        localStorage.setItem('claimIdCounter', String(counter + 1));
        claims.push(claim);
        localStorage.setItem('claimRequests', JSON.stringify(claims));
        return claim;
    }

    updateClaimRequest(id, updates) {
        const claims = this.getClaimRequests();
        const index = claims.findIndex(claim => claim.id === id);
        if (index !== -1) {
            claims[index] = { ...claims[index], ...updates };
            localStorage.setItem('claimRequests', JSON.stringify(claims));
            return claims[index];
        }
        return null;
    }
}

// Initialize database
const db = new Database();

// Navigation
function navigateTo(pageName) {
    // Update active page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName).classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Load data for specific pages
    if (pageName === 'browse') {
        loadItems();
    } else if (pageName === 'admin') {
        loadAdminData();
    } else if (pageName === 'home') {
        updateStats();
    }
}

// Setup navigation
document.addEventListener('DOMContentLoaded', function() {
    // Nav link click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize
    updateStats();
    loadItems();

    // Setup form handlers
    setupFormHandlers();
});

// Update statistics
function updateStats() {
    const items = db.getItems();
    const activeItems = items.filter(item => item.status === 'active').length;
    const returnedItems = items.filter(item => item.status === 'claimed').length;
    const claims = db.getClaimRequests().filter(claim => claim.status === 'pending').length;

    document.getElementById('totalItems').textContent = activeItems;
    document.getElementById('returnedItems').textContent = returnedItems;
    document.getElementById('activeSearches').textContent = claims;

    // Animate numbers
    animateNumber('totalItems', 0, activeItems, 1000);
    animateNumber('returnedItems', 0, returnedItems, 1000);
    animateNumber('activeSearches', 0, claims, 1000);
}

function animateNumber(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Browse Items
function loadItems(filters = {}) {
    const items = db.getItems().filter(item => item.status === 'active');
    const container = document.getElementById('itemsContainer');
    const noItems = document.getElementById('noItems');

    let filteredItems = items;

    // Apply search
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.location.toLowerCase().includes(searchLower)
        );
    }

    // Apply category filter
    if (filters.category) {
        filteredItems = filteredItems.filter(item => item.category === filters.category);
    }

    // Apply location filter
    if (filters.location) {
        filteredItems = filteredItems.filter(item => item.location === filters.location);
    }

    // Apply color filter
    if (filters.color) {
        filteredItems = filteredItems.filter(item => item.color === filters.color);
    }

    // Clear existing items
    container.innerHTML = '';

    if (filteredItems.length === 0) {
        noItems.style.display = 'block';
    } else {
        noItems.style.display = 'none';
        filteredItems.forEach(item => {
            container.appendChild(createItemCard(item));
        });
    }
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.style.animation = 'fadeIn 0.5s ease';

    const categoryLabels = {
        'electronics': 'Electronics',
        'clothing': 'Clothing & Accessories',
        'books': 'Books & Supplies',
        'keys': 'Keys & ID',
        'bags': 'Bags & Backpacks',
        'jewelry': 'Jewelry',
        'sports': 'Sports Equipment',
        'other': 'Other'
    };

    const locationLabels = {
        'cafeteria': 'Cafeteria',
        'library': 'Library',
        'gym': 'Gymnasium',
        'parking': 'Parking Lot',
        'classroom': 'Classroom',
        'hallway': 'Hallway',
        'office': 'Main Office',
        'other': 'Other'
    };

    const imageHTML = item.image 
        ? `<img src="${item.image}" alt="${item.name}" class="item-image">`
        : `<div class="item-image" style="display: flex; align-items: center; justify-content: center; font-size: 4rem;">📦</div>`;

    card.innerHTML = `
        ${imageHTML}
        <div class="item-content">
            <div class="item-header">
                <span class="item-id">${item.id}</span>
                <span class="item-category">${categoryLabels[item.category] || item.category}</span>
            </div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-details">
                <div class="item-detail">
                    <span class="detail-icon">📍</span>
                    <span>${locationLabels[item.location] || item.location}</span>
                </div>
                <div class="item-detail">
                    <span class="detail-icon">📅</span>
                    <span>Found: ${formatDate(item.dateFound)}</span>
                </div>
                ${item.color ? `
                <div class="item-detail">
                    <span class="detail-icon">🎨</span>
                    <span>${item.color.charAt(0).toUpperCase() + item.color.slice(1)}</span>
                </div>
                ` : ''}
                ${item.brand ? `
                <div class="item-detail">
                    <span class="detail-icon">🏷️</span>
                    <span>${item.brand}</span>
                </div>
                ` : ''}
            </div>
            <div class="item-footer">
                <button class="btn btn-primary" onclick="claimItem('${item.id}')">Claim This Item</button>
            </div>
        </div>
    `;

    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function claimItem(itemId) {
    navigateTo('claim');
    setTimeout(() => {
        document.getElementById('claimItemId').value = itemId;
        document.getElementById('claimItemId').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

// Search and Filter Functions
function performSearch() {
    applyFilters();
}

function applyFilters() {
    const filters = {
        search: document.getElementById('searchInput').value,
        category: document.getElementById('categoryFilter').value,
        location: document.getElementById('locationFilter').value,
        color: document.getElementById('colorFilter').value
    };
    loadItems(filters);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('colorFilter').value = '';
    loadItems();
}

// Form Handlers
function setupFormHandlers() {
    // Report Form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReportSubmit();
        });
    }

    // Claim Form
    const claimForm = document.getElementById('claimForm');
    if (claimForm) {
        claimForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleClaimSubmit();
        });
    }

    // Set max date to today for date inputs
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.max = today;
    });
}

function handleReportSubmit() {
    const form = document.getElementById('reportForm');
    const formData = new FormData(form);

    const item = {
        name: formData.get('itemName'),
        category: formData.get('category'),
        description: formData.get('description'),
        color: formData.get('color'),
        brand: formData.get('brand'),
        location: formData.get('location'),
        specificLocation: formData.get('specificLocation'),
        dateFound: formData.get('dateFound'),
        finderName: formData.get('finderName'),
        finderEmail: formData.get('finderEmail'),
        finderPhone: formData.get('finderPhone'),
        status: 'active',
        dateSubmitted: new Date().toISOString()
    };

    // Handle image if uploaded
    const imageInput = document.getElementById('itemPhoto');
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            item.image = e.target.result;
            completeReportSubmit(item, form);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        completeReportSubmit(item, form);
    }
}

function completeReportSubmit(item, form) {
    db.addItem(item);
    form.style.display = 'none';
    document.getElementById('reportSuccess').style.display = 'block';
    form.reset();
    removeFile();
    updateStats();
}

function handleClaimSubmit() {
    const form = document.getElementById('claimForm');
    const formData = new FormData(form);

    const claim = {
        itemId: formData.get('claimItemId'),
        itemDescription: formData.get('itemDescription'),
        dateLost: formData.get('dateLost'),
        whereLost: formData.get('whereLost'),
        claimerName: formData.get('claimerName'),
        studentId: formData.get('studentId'),
        claimerEmail: formData.get('claimerEmail'),
        claimerPhone: formData.get('claimerPhone'),
        proofOfOwnership: formData.get('proofOfOwnership')
    };

    db.addClaimRequest(claim);
    form.style.display = 'none';
    document.getElementById('claimSuccess').style.display = 'block';
    form.reset();
    updateStats();
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    if (formId === 'reportForm') {
        removeFile();
    }
}

function hideSuccessMessage(messageId) {
    document.getElementById(messageId).style.display = 'none';
    const formId = messageId === 'reportSuccess' ? 'reportForm' : 'claimForm';
    document.getElementById(formId).style.display = 'block';
}

// File Upload Handlers
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.querySelector('.file-upload-prompt').style.display = 'none';
            document.getElementById('filePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function removeFile() {
    document.getElementById('itemPhoto').value = '';
    document.getElementById('previewImage').src = '';
    document.querySelector('.file-upload-prompt').style.display = 'block';
    document.getElementById('filePreview').style.display = 'none';
}

// Admin Functions
function loadAdminData() {
    loadPendingItems();
    loadAllAdminItems();
    loadClaimRequests();
    loadAdminStats();
}

function loadPendingItems() {
    const items = db.getItems().filter(item => item.status === 'pending');
    const container = document.getElementById('pendingItemsList');
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="no-items">
                <div class="no-items-icon">✓</div>
                <p>No pending approvals</p>
            </div>
        `;
    } else {
        container.innerHTML = '';
        items.forEach(item => {
            container.appendChild(createAdminItemCard(item, true));
        });
    }
}

function loadAllAdminItems() {
    const statusFilter = document.getElementById('adminStatusFilter')?.value || '';
    let items = db.getItems();
    
    if (statusFilter) {
        items = items.filter(item => item.status === statusFilter);
    }
    
    const container = document.getElementById('allItemsList');
    container.innerHTML = '';
    
    items.forEach(item => {
        container.appendChild(createAdminItemCard(item, false));
    });
}

function createAdminItemCard(item, isPending) {
    const card = document.createElement('div');
    card.className = 'admin-item-card';

    const statusBadge = {
        'active': '<span style="background: var(--success-color); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Active</span>',
        'pending': '<span style="background: var(--warning-color); color: var(--text-primary); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Pending</span>',
        'claimed': '<span style="background: var(--info-color); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Claimed</span>',
        'archived': '<span style="background: var(--text-light); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Archived</span>'
    };

    const actionsHTML = isPending ? `
        <button class="btn btn-primary btn-small" onclick="approveItem('${item.id}')">Approve</button>
        <button class="btn btn-danger btn-small" onclick="rejectItem('${item.id}')">Reject</button>
    ` : `
        <button class="btn btn-secondary btn-small" onclick="editItem('${item.id}')">Edit</button>
        ${item.status === 'active' ? `<button class="btn btn-primary btn-small" onclick="markAsClaimed('${item.id}')">Mark Claimed</button>` : ''}
        <button class="btn btn-danger btn-small" onclick="deleteItemAdmin('${item.id}')">Delete</button>
    `;

    card.innerHTML = `
        <div class="admin-item-header">
            <div class="admin-item-info">
                <h3>${item.name} (${item.id})</h3>
                <div class="admin-item-meta">
                    <span>📁 ${item.category}</span>
                    <span>📍 ${item.location}</span>
                    <span>📅 Found: ${formatDate(item.dateFound)}</span>
                    <span>👤 ${item.finderName}</span>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: start;">
                ${statusBadge[item.status] || ''}
            </div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${item.description}</p>
        <div class="admin-item-actions">
            ${actionsHTML}
        </div>
    `;

    return card;
}

function approveItem(itemId) {
    if (confirm('Approve this item for public listing?')) {
        db.updateItem(itemId, { status: 'active' });
        loadAdminData();
        alert('Item approved and published!');
    }
}

function rejectItem(itemId) {
    if (confirm('Reject this item? It will be deleted.')) {
        db.deleteItem(itemId);
        loadAdminData();
        alert('Item rejected and removed.');
    }
}

function markAsClaimed(itemId) {
    if (confirm('Mark this item as claimed?')) {
        db.updateItem(itemId, { status: 'claimed' });
        loadAdminData();
        updateStats();
        alert('Item marked as claimed!');
    }
}

function deleteItemAdmin(itemId) {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        db.deleteItem(itemId);
        loadAdminData();
        updateStats();
        alert('Item deleted successfully.');
    }
}

function editItem(itemId) {
    alert('Edit functionality would open a modal or form with the item details. For this demo, use the delete and re-add workflow.');
}

function loadClaimRequests() {
    const claims = db.getClaimRequests();
    const container = document.getElementById('claimsList');
    
    if (claims.length === 0) {
        container.innerHTML = `
            <div class="no-items">
                <div class="no-items-icon">📋</div>
                <p>No claim requests</p>
            </div>
        `;
    } else {
        container.innerHTML = '';
        claims.forEach(claim => {
            container.appendChild(createClaimCard(claim));
        });
    }
}

function createClaimCard(claim) {
    const card = document.createElement('div');
    card.className = 'admin-item-card';

    const statusBadge = {
        'pending': '<span style="background: var(--warning-color); color: var(--text-primary); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Pending Review</span>',
        'approved': '<span style="background: var(--success-color); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Approved</span>',
        'rejected': '<span style="background: var(--danger-color); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8125rem; font-weight: 600;">Rejected</span>'
    };

    card.innerHTML = `
        <div class="admin-item-header">
            <div class="admin-item-info">
                <h3>Claim Request ${claim.id} - Item: ${claim.itemId}</h3>
                <div class="admin-item-meta">
                    <span>👤 ${claim.claimerName}</span>
                    <span>🆔 ${claim.studentId}</span>
                    <span>📧 ${claim.claimerEmail}</span>
                    <span>📞 ${claim.claimerPhone}</span>
                </div>
            </div>
            ${statusBadge[claim.status] || ''}
        </div>
        <div style="margin: 1rem 0;">
            <strong>Item Description Provided:</strong>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">${claim.itemDescription}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
                <strong>Date Lost:</strong> ${formatDate(claim.dateLost)}
            </div>
            <div>
                <strong>Location Lost:</strong> ${claim.whereLost}
            </div>
        </div>
        ${claim.proofOfOwnership ? `
        <div style="margin-bottom: 1rem;">
            <strong>Proof of Ownership:</strong>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">${claim.proofOfOwnership}</p>
        </div>
        ` : ''}
        ${claim.status === 'pending' ? `
        <div class="admin-item-actions">
            <button class="btn btn-primary btn-small" onclick="approveClaim('${claim.id}', '${claim.itemId}')">Approve & Release Item</button>
            <button class="btn btn-danger btn-small" onclick="rejectClaim('${claim.id}')">Reject Claim</button>
        </div>
        ` : ''}
    `;

    return card;
}

function approveClaim(claimId, itemId) {
    if (confirm('Approve this claim and mark the item as returned?')) {
        db.updateClaimRequest(claimId, { status: 'approved' });
        db.updateItem(itemId, { status: 'claimed' });
        loadAdminData();
        updateStats();
        alert('Claim approved! Please contact the claimer to arrange item pickup.');
    }
}

function rejectClaim(claimId) {
    if (confirm('Reject this claim request?')) {
        db.updateClaimRequest(claimId, { status: 'rejected' });
        loadAdminData();
        alert('Claim rejected. The item remains available for other claims.');
    }
}

function loadAdminStats() {
    const items = db.getItems();
    const claims = db.getClaimRequests();

    document.getElementById('adminTotalItems').textContent = items.length;
    document.getElementById('adminReturnedItems').textContent = items.filter(i => i.status === 'claimed').length;
    document.getElementById('adminPendingItems').textContent = items.filter(i => i.status === 'pending').length;
    document.getElementById('adminActiveItems').textContent = items.filter(i => i.status === 'active').length;
}

function switchAdminTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Load data for the tab
    if (tabName === 'pending') {
        loadPendingItems();
    } else if (tabName === 'items') {
        loadAllAdminItems();
    } else if (tabName === 'claims') {
        loadClaimRequests();
    } else if (tabName === 'stats') {
        loadAdminStats();
    }
}

function filterAdminItems() {
    loadAllAdminItems();
}

function refreshAdminData() {
    loadAdminData();
    alert('Admin data refreshed!');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        navigateTo('home');
        alert('Logged out successfully.');
    }
}

// Utility function to handle Enter key in search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});