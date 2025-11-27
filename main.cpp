#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
#include <algorithm>
#include <cstdlib>
#include <cstring>

using namespace std;

// Abstract base class for steps (OOP - Inheritance)
class Step {
protected:
    string title;
    string description;
public:
    Step(const string& t, const string& desc) : title(t), description(desc) {}
    virtual ~Step() = default;
    virtual string render() = 0;
    virtual void processInput(const string& input) = 0;
    virtual bool isValid() = 0;
    string getTitle() const { return title; }
    string getDescription() const { return description; }
};

// Data structure to store user data (DSA - Map)
class UserData {
private:
    map<string, string> data;
public:
    void set(const string& key, const string& value) {
        data[key] = value;
    }
    string get(const string& key) const {
        auto it = data.find(key);
        return it != data.end() ? it->second : "";
    }
    bool has(const string& key) const {
        return data.find(key) != data.end();
    }
    void clear() {
        data.clear();
    }
};

// Step 1: Project Name (OOP - Concrete class)
class ProjectNameStep : public Step {
private:
    string projectName;
public:
    ProjectNameStep() : Step("Step 1: Define your project", "Start step by step from step 1. Give your web CGI project a name.") {}
    
    string render() override {
        stringstream ss;
        ss << "<h2>" << title << "</h2>";
        ss << "<p>" << description << "</p>";
        ss << "<form method='post'>";
        ss << "<label>Project name<br><input type='text' name='project_name' value='" << projectName << "' required></label><br>";
        ss << "<button class='btn primary' type='submit' name='step' value='2'>Continue to Step 2</button>";
        ss << "</form>";
        return ss.str();
    }
    
    void processInput(const string& input) override {
        projectName = input;
    }
    
    bool isValid() override {
        return !projectName.empty() && projectName.length() <= 50;
    }
    
    string getProjectName() const { return projectName; }
};

// Step 2: Language Selection (OOP - Concrete class)
class LanguageStep : public Step {
private:
    string selectedLanguage;
    vector<string> languages; // DSA - Vector
public:
    LanguageStep() : Step("Step 2: Choose a language/runtime", "Select the runtime for your CGI-style app.") {
        languages = {"C++", "Python", "Perl", "Bash"};
    }
    
    string render() override {
        stringstream ss;
        ss << "<h2>" << title << "</h2>";
        ss << "<p>" << description << "</p>";
        ss << "<form method='post'>";
        
        for (const string& lang : languages) {
            string checked = (lang == selectedLanguage) ? " checked" : "";
            ss << "<label class='choice'><input type='radio' name='language' value='" << lang << "'" << checked << "> " << lang << "</label>";
        }
        
        ss << "<br><button class='btn' type='submit' name='step' value='1'>Back</button> ";
        ss << "<button class='btn primary' type='submit' name='step' value='3'>Continue to Step 3</button>";
        ss << "</form>";
        return ss.str();
    }
    
    void processInput(const string& input) override {
        selectedLanguage = input;
    }
    
    bool isValid() override {
        return find(languages.begin(), languages.end(), selectedLanguage) != languages.end();
    }
    
    string getSelectedLanguage() const { return selectedLanguage; }
};

// Step 3: Features Selection (OOP - Concrete class)
class FeaturesStep : public Step {
private:
    vector<string> selectedFeatures; // DSA - Vector
    vector<string> availableFeatures;
public:
    FeaturesStep() : Step("Step 3: Pick features", "Choose the features you want to include.") {
        availableFeatures = {"Form handling", "File upload", "Database connection", "Session management", "Templating"};
    }
    
    string render() override {
        stringstream ss;
        ss << "<h2>" << title << "</h2>";
        ss << "<p>" << description << "</p>";
        ss << "<form method='post'>";
        
        for (const string& feature : availableFeatures) {
            bool isSelected = find(selectedFeatures.begin(), selectedFeatures.end(), feature) != selectedFeatures.end();
            string checked = isSelected ? " checked" : "";
            ss << "<label class='choice'><input type='checkbox' name='features[]' value='" << feature << "'" << checked << "> " << feature << "</label>";
        }
        
        ss << "<br><button class='btn' type='submit' name='step' value='2'>Back</button> ";
        ss << "<button class='btn primary' type='submit' name='step' value='4'>Continue to Step 4</button>";
        ss << "</form>";
        return ss.str();
    }
    
    void processInput(const string& input) override {
        // Parse comma-separated features
        stringstream ss(input);
        string feature;
        selectedFeatures.clear();
        while (getline(ss, feature, ',')) {
            if (!feature.empty()) {
                selectedFeatures.push_back(feature);
            }
        }
    }
    
    bool isValid() override {
        return true; // All features are optional
    }
    
    vector<string> getSelectedFeatures() const { return selectedFeatures; }
};

// Step 4: Summary (OOP - Concrete class)
class SummaryStep : public Step {
private:
    UserData& userData;
public:
    SummaryStep(UserData& data) : Step("Step 4: Summary", "Review your selections"), userData(data) {}
    
    string render() override {
        stringstream ss;
        ss << "<h2>" << title << "</h2>";
        ss << "<div class='summary'>";
        ss << "<p><strong>Project:</strong> " << userData.get("project_name") << "</p>";
        ss << "<p><strong>Runtime:</strong> " << userData.get("language") << "</p>";
        
        string features = userData.get("features");
        if (!features.empty()) {
            ss << "<p><strong>Features:</strong></p><ul>";
            stringstream featureStream(features);
            string feature;
            while (getline(featureStream, feature, ',')) {
                ss << "<li>" << feature << "</li>";
            }
            ss << "</ul>";
        } else {
            ss << "<p><strong>Features:</strong> None selected</p>";
        }
        
        ss << "<p>You can restart the wizard or go back to change selections.</p>";
        ss << "</div>";
        return ss.str();
    }
    
    void processInput(const string& input) override {
        // No input processing needed for summary
    }
    
    bool isValid() override {
        return true;
    }
};

// Wizard controller class (OOP - Composition)
class Wizard {
private:
    vector<Step*> steps; // DSA - Vector of pointers
    UserData userData;
    int currentStep;
    
public:
    Wizard() : currentStep(1) {
        steps.push_back(new ProjectNameStep());
        steps.push_back(new LanguageStep());
        steps.push_back(new FeaturesStep());
        steps.push_back(new SummaryStep(userData));
    }
    
    ~Wizard() {
        for (Step* step : steps) {
            delete step;
        }
    }
    
    void setCurrentStep(int step) {
        if (step >= 1 && step <= static_cast<int>(steps.size())) {
            currentStep = step;
        }
    }
    
    int getCurrentStep() const { return currentStep; }
    
    string renderCurrentStep() {
        return steps[currentStep - 1]->render();
    }
    
    void processFormData(const string& data) {
        // Parse form data
        stringstream ss(data);
        string pair;
        while (getline(ss, pair, '&')) {
            size_t pos = pair.find('=');
            if (pos != string::npos) {
                string key = pair.substr(0, pos);
                string value = pair.substr(pos + 1);
                
                // URL decode
                for (size_t i = 0; i < value.length(); ++i) {
                    if (value[i] == '+') value[i] = ' ';
                    else if (value[i] == '%' && i + 2 < value.length()) {
                        string hex = value.substr(i + 1, 2);
                        char ch = static_cast<char>(strtol(hex.c_str(), nullptr, 16));
                        value[i] = ch;
                        value.erase(i + 1, 2);
                    }
                }
                
                if (key == "step") {
                    setCurrentStep(stoi(value));
                } else if (key == "project_name") {
                    userData.set("project_name", value);
                } else if (key == "language") {
                    userData.set("language", value);
                } else if (key == "features[]") {
                    string currentFeatures = userData.get("features");
                    if (!currentFeatures.empty()) currentFeatures += ",";
                    currentFeatures += value;
                    userData.set("features", currentFeatures);
                }
            }
        }
    }
    
    string renderStepsIndicator() {
        stringstream ss;
        ss << "<ol class='steps'>";
        for (size_t i = 0; i < steps.size(); ++i) {
            string cls = (i + 1 == currentStep) ? "current" : (i + 1 < currentStep ? "done" : "");
            ss << "<li class='" << cls << "'>Step " << (i + 1) << "</li>";
        }
        ss << "</ol>";
        return ss.str();
    }
    
    string renderNavigation() {
        stringstream ss;
        ss << "<div class='nav'>";
        if (currentStep > 1) {
            ss << "<a class='btn' href='?step=" << (currentStep - 1) << "'>Back</a>";
        }
        if (currentStep < static_cast<int>(steps.size())) {
            ss << "<a class='btn primary' href='?step=" << (currentStep + 1) << "'>Next</a>";
        } else {
            ss << "<a class='btn success' href='?reset=1'>Restart</a>";
        }
        ss << "</div>";
        return ss.str();
    }
};

// Main CGI function
int main() {
    cout << "Content-Type: text/html\r\n\r\n";
    
    // Read form data
    string method = getenv("REQUEST_METHOD") ? getenv("REQUEST_METHOD") : "";
    string queryString = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string formData;
    
    if (method == "POST") {
        int contentLength = atoi(getenv("CONTENT_LENGTH") ? getenv("CONTENT_LENGTH") : "0");
        if (contentLength > 0) {
            char* buffer = new char[contentLength + 1];
            cin.read(buffer, contentLength);
            buffer[contentLength] = '\0';
            formData = string(buffer);
            delete[] buffer;
        }
    }
    
    Wizard wizard;
    
    // Handle reset
    if (queryString.find("reset=1") != string::npos) {
        wizard.setCurrentStep(1);
    }
    
    // Process form data
    if (!formData.empty()) {
        wizard.processFormData(formData);
    }
    
    // Handle step parameter
    size_t stepPos = queryString.find("step=");
    if (stepPos != string::npos) {
        string stepStr = queryString.substr(stepPos + 5);
        size_t ampPos = stepStr.find('&');
        if (ampPos != string::npos) {
            stepStr = stepStr.substr(0, ampPos);
        }
        wizard.setCurrentStep(stoi(stepStr));
    }
    
    // Output HTML
    cout << "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>";
    cout << "<title>Web CGI Wizard</title>";
    cout << "<link rel='stylesheet' href='style.css'>";
    cout << "</head><body><div class='container'>";
    
    cout << "<h1>Web CGI Wizard</h1>";
    cout << wizard.renderStepsIndicator();
    cout << wizard.renderCurrentStep();
    cout << wizard.renderNavigation();
    
    cout << "</div></body></html>";
    
    return 0;
} 