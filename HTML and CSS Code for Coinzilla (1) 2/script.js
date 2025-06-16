// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', initializePageFunctionality);

// Initialize functionality based on current page
function initializePageFunctionality() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'login': initializeLoginPage(); break;
        case 'signup': initializeSignupPage(); break;
        case 'dashboard': initializeDashboardPage(); break;
        case 'landing': initializeLandingPage(); break;
    }
    initializeCommonFunctionality();
}

// Get current page based on body class
function getCurrentPage() {
    const body = document.body;
    if (body.classList.contains('login-page')) return 'login';
    if (body.classList.contains('signup-page')) return 'signup';
    if (body.classList.contains('dashboard-page')) return 'dashboard';
    if (body.classList.contains('landing-page')) return 'landing';
    return 'unknown';
}

// LOGIN PAGE FUNCTIONALITY
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('.eye-icon').textContent = type === 'password' ? '👁' : '🙈';
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (!email || !password) return showNotification('Please fill in all fields', 'error');
            if (!isValidEmail(email)) return showNotification('Invalid email address', 'error');
            showLoadingState(loginForm);
            setTimeout(() => {
                hideLoadingState(loginForm);
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            }, 2000);
        });
    }
}

// SIGNUP PAGE FUNCTIONALITY
function initializeSignupPage() {
    const accountOptions = document.querySelectorAll('.account-option');
    const nextBtn = document.getElementById('nextBtn');
    let selectedAccountType = null;
    
    accountOptions.forEach(option => {
        option.addEventListener('click', function() {
            accountOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedAccountType = this.getAttribute('data-type');
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
        });
    });
    
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
        nextBtn.addEventListener('click', function() {
            if (!selectedAccountType) return showNotification('Select an account type', 'error');
            showLoadingState(this);
            setTimeout(() => {
                hideLoadingState(this);
                showNotification(`${selectedAccountType} account created!`, 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            }, 2000);
        });
    }
}

// DASHBOARD PAGE FUNCTIONALITY
function initializeDashboardPage() {
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.parentElement.classList.add('active');
            showNotification(`Navigating to ${this.textContent.trim()}...`, 'info');
        });
    });
    
    const marketplaceItems = document.querySelectorAll('.marketplace-item');
    marketplaceItems.forEach(item => {
        item.addEventListener('click', function() {
            showNotification(`Opening ${this.querySelector('h4').textContent}...`, 'info');
        });
    });
}

// LANDING PAGE FUNCTIONALITY
function initializeLandingPage() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// COMMON FUNCTIONALITY
function initializeCommonFunctionality() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.textContent = 'Loading...';
        });
    });
    
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('click', () => window.location.href = 'index.html');
        logo.style.cursor = 'pointer';
    });
}


