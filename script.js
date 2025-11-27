// Mental Health Simulator - JavaScript Controller
class MentalHealthApp {
    constructor() {
        this.currentUser = null;
        this.currentMood = null;
        this.isLoggedIn = false;
        this.sessionActive = false;
        
        // Data structures for recommendations (DSA concepts)
        this.moodData = {
            happy: {
                quotes: [
                    "Happiness is a journey, not a destination. Keep smiling!",
                    "The joy of life comes from our encounters with new experiences.",
                    "Happiness is when what you think, what you say, and what you do are in harmony.",
                    "Every day is a new beginning. Take a deep breath and start again.",
                    "The only way to do great work is to love what you do."
                ],
                activities: [
                    "Share your joy with friends and family",
                    "Try a new hobby or activity",
                    "Go for a walk in nature",
                    "Listen to uplifting music",
                    "Practice gratitude journaling"
                ],
                tips: [
                    "Maintain your positive energy throughout the day",
                    "Help others to spread happiness",
                    "Stay hydrated and get enough sleep",
                    "Celebrate small victories",
                    "Keep a gratitude journal"
                ]
            },
            sad: {
                quotes: [
                    "This too shall pass. Every storm runs out of rain.",
                    "You are stronger than you think. Brighter days are ahead.",
                    "It's okay to not be okay. Healing takes time.",
                    "The sun will rise again. Hold on to hope.",
                    "You are not alone in your struggles."
                ],
                activities: [
                    "Talk to someone you trust",
                    "Watch a comforting movie",
                    "Take a warm bath or shower",
                    "Write down your feelings",
                    "Listen to calming music"
                ],
                tips: [
                    "Be gentle with yourself",
                    "Reach out to friends or family",
                    "Practice self-compassion",
                    "Get some fresh air",
                    "Consider talking to a professional"
                ]
            },
            stressed: {
                quotes: [
                    "Breathe. You are stronger than you think.",
                    "Take it one step at a time. You've got this.",
                    "Stress is not a sign of weakness, it's a sign of strength.",
                    "In the midst of chaos, there is also opportunity.",
                    "Peace begins with a deep breath."
                ],
                activities: [
                    "Practice deep breathing exercises",
                    "Try meditation or mindfulness",
                    "Take a short break and stretch",
                    "Go for a walk outside",
                    "Listen to calming nature sounds"
                ],
                tips: [
                    "Break tasks into smaller steps",
                    "Practice time management",
                    "Set realistic expectations",
                    "Take regular breaks",
                    "Prioritize self-care"
                ]
            },
            anxious: {
                quotes: [
                    "You are in control. Take it one moment at a time.",
                    "Anxiety is just a feeling. It will pass.",
                    "You are safe. You are capable. You are enough.",
                    "Focus on what you can control.",
                    "This moment is temporary."
                ],
                activities: [
                    "Practice grounding techniques",
                    "Write in a journal",
                    "Try progressive muscle relaxation",
                    "Go for a run or exercise",
                    "Use a stress ball or fidget toy"
                ],
                tips: [
                    "Focus on your breathing",
                    "Challenge negative thoughts",
                    "Limit caffeine and alcohol",
                    "Establish a routine",
                    "Consider professional help if needed"
                ]
            },
            neutral: {
                quotes: [
                    "Every day is a new opportunity to grow.",
                    "Find beauty in the ordinary moments.",
                    "Balance is the key to a happy life.",
                    "Small steps lead to big changes.",
                    "You are exactly where you need to be."
                ],
                activities: [
                    "Try something new today",
                    "Connect with a friend",
                    "Learn a new skill",
                    "Explore your neighborhood",
                    "Read a book you've been meaning to read"
                ],
                tips: [
                    "Set small, achievable goals",
                    "Practice mindfulness",
                    "Stay curious and open-minded",
                    "Maintain healthy habits",
                    "Find joy in simple pleasures"
                ]
            },
            excited: {
                quotes: [
                    "Your enthusiasm is contagious! Share it with the world.",
                    "Great things are coming your way.",
                    "Your energy can move mountains.",
                    "Embrace this moment of excitement.",
                    "You have the power to create amazing things."
                ],
                activities: [
                    "Channel your energy into a project",
                    "Share your excitement with others",
                    "Plan something fun for the future",
                    "Try a new adventure or activity",
                    "Express your creativity"
                ],
                tips: [
                    "Use your energy productively",
                    "Stay grounded while being excited",
                    "Share your enthusiasm with others",
                    "Plan and organize your ideas",
                    "Maintain healthy sleep habits"
                ]
            }
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Authentication forms
        document.getElementById('loginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Mood selection
        document.querySelectorAll('.mood-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectMood(e.currentTarget.dataset.mood);
            });
        });
    }

    // Authentication Methods
    async handleLogin() {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!username || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        this.showLoading('Signing you in...');

        try {
            // Simulate API call (replace with actual backend call)
            await this.simulateApiCall(1000);
            
            // For demo purposes, accept any login
            this.currentUser = {
                username: username,
                name: username,
                age: 25,
                gender: 'Not specified'
            };
            
            this.isLoggedIn = true;
            this.showApp();
            this.hideLoading();
            
        } catch (error) {
            this.hideLoading();
            this.showError('Login failed. Please try again.');
        }
    }

    async handleRegister() {
        const username = document.getElementById('regUsername').value.trim();
        const password = document.getElementById('regPassword').value;
        const name = document.getElementById('regName').value.trim();
        const age = document.getElementById('regAge').value;
        const gender = document.getElementById('regGender').value;

        if (!username || !password || !name || !age || !gender) {
            this.showError('Please fill in all fields');
            return;
        }

        this.showLoading('Creating your account...');

        try {
            // Simulate API call
            await this.simulateApiCall(1500);
            
            this.currentUser = {
                username: username,
                name: name,
                age: parseInt(age),
                gender: gender
            };
            
            this.isLoggedIn = true;
            this.showApp();
            this.hideLoading();
            this.showSuccess('Account created successfully!', 'Welcome to Mental Health Simulator');
            
        } catch (error) {
            this.hideLoading();
            this.showError('Registration failed. Please try again.');
        }
    }

    // UI Navigation Methods
    showLogin() {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('registerForm').classList.remove('active');
    }

    showRegister() {
        document.getElementById('registerForm').classList.add('active');
        document.getElementById('loginForm').classList.remove('active');
    }

    showApp() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        
        // Update user display
        document.getElementById('userDisplayName').textContent = this.currentUser.name;
        document.getElementById('welcomeUserName').textContent = this.currentUser.name;
        
        // Show session prompt
        this.showSessionPrompt();
    }

    showSessionPrompt() {
        document.getElementById('sessionPrompt').style.display = 'block';
        document.getElementById('moodAssessment').style.display = 'none';
        document.getElementById('recommendations').style.display = 'none';
    }

    startSession() {
        this.sessionActive = true;
        document.getElementById('sessionPrompt').style.display = 'none';
        document.getElementById('moodAssessment').style.display = 'block';
        document.getElementById('recommendations').style.display = 'none';
    }

    selectMood(mood) {
        this.currentMood = mood;
        
        // Update UI
        document.querySelectorAll('.mood-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
        
        // Show recommendations after a short delay
        setTimeout(() => {
            this.showRecommendations();
        }, 500);
    }

    showRecommendations() {
        document.getElementById('sessionPrompt').style.display = 'none';
        document.getElementById('moodAssessment').style.display = 'none';
        document.getElementById('recommendations').style.display = 'block';
        
        this.populateRecommendations();
    }

    populateRecommendations() {
        const moodData = this.moodData[this.currentMood];
        if (!moodData) return;

        // Update mood badge
        document.getElementById('selectedMood').textContent = this.currentMood.charAt(0).toUpperCase() + this.currentMood.slice(1);

        // Populate quote
        const randomQuote = moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
        document.getElementById('motivationalQuote').innerHTML = `"${randomQuote}"`;

        // Populate activities
        const activitiesHtml = moodData.activities.map(activity => `<li>${activity}</li>`).join('');
        document.getElementById('suggestedActivities').innerHTML = `<ul class="activities-list">${activitiesHtml}</ul>`;

        // Populate tips
        const tipsHtml = moodData.tips.map(tip => `<li>${tip}</li>`).join('');
        document.getElementById('selfCareTips').innerHTML = `<ul class="tips-list">${tipsHtml}</ul>`;
    }

    endSession() {
        this.sessionActive = false;
        this.currentMood = null;
        
        // Reset mood selection
        document.querySelectorAll('.mood-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        this.showSuccess('Session ended successfully!', 'Thank you for taking care of your mental health');
        this.showSessionPrompt();
    }

    restartSession() {
        this.currentMood = null;
        
        // Reset mood selection
        document.querySelectorAll('.mood-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        this.startSession();
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.sessionActive = false;
        this.currentMood = null;
        
        // Reset forms
        document.getElementById('loginFormElement').reset();
        document.getElementById('registerFormElement').reset();
        
        // Show auth container
        document.getElementById('authContainer').style.display = 'flex';
        document.getElementById('appContainer').style.display = 'none';
        
        // Show login form
        this.showLogin();
    }

    // Utility Methods
    async simulateApiCall(delay) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    showLoading(message = 'Processing...') {
        document.getElementById('loadingMessage').textContent = message;
        document.getElementById('loadingModal').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loadingModal').classList.remove('active');
    }

    showSuccess(message, title = 'Success!') {
        document.getElementById('successTitle').textContent = title;
        document.getElementById('successMessage').textContent = message;
        document.getElementById('successModal').classList.add('active');
    }

    showError(message) {
        alert(message); // Simple error display
    }

    closeModal() {
        document.getElementById('successModal').classList.remove('active');
    }
}

// Global functions for button clicks
function showLogin() {
    app.showLogin();
}

function showRegister() {
    app.showRegister();
}

function startSession() {
    app.startSession();
}

function endSession() {
    app.endSession();
}

function restartSession() {
    app.restartSession();
}

function logout() {
    app.logout();
}

function closeModal() {
    app.closeModal();
}

// Initialize app when page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MentalHealthApp();
    
    // Add click outside modal to close
    document.getElementById('successModal').addEventListener('click', (e) => {
        if (e.target.id === 'successModal') {
            e.target.classList.remove('active');
        }
    });
    
    document.getElementById('loadingModal').addEventListener('click', (e) => {
        if (e.target.id === 'loadingModal') {
            e.target.classList.remove('active');
        }
    });
});

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to mood options
    document.querySelectorAll('.mood-option').forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('selected')) {
                element.style.transform = 'translateY(-4px) scale(1.02)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('selected')) {
                element.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Add focus effects to inputs
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
}); 