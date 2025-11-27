#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
#include <algorithm>

using namespace std;

// Simplified test version
class TestWizard {
private:
    vector<string> steps;
    map<string, string> data;
    int currentStep;
    
public:
    TestWizard() : currentStep(1) {
        steps = {"Project Name", "Language Selection", "Features", "Summary"};
    }
    
    void run() {
        cout << "=== C++ CGI Wizard Test ===\n\n";
        
        for (int i = 0; i < steps.size(); i++) {
            cout << "Step " << (i + 1) << ": " << steps[i] << "\n";
            
            if (i == 0) {
                cout << "Enter project name: ";
                string name;
                getline(cin, name);
                data["project_name"] = name;
            }
            else if (i == 1) {
                cout << "Choose language (C++/Python/Perl): ";
                string lang;
                getline(cin, lang);
                data["language"] = lang;
            }
            else if (i == 2) {
                cout << "Enter features (comma separated): ";
                string features;
                getline(cin, features);
                data["features"] = features;
            }
            else {
                cout << "\n=== SUMMARY ===\n";
                cout << "Project: " << data["project_name"] << "\n";
                cout << "Language: " << data["language"] << "\n";
                cout << "Features: " << data["features"] << "\n";
            }
            cout << "\n";
        }
        
        cout << "Test completed successfully!\n";
    }
};

int main() {
    TestWizard wizard;
    wizard.run();
    return 0;
} 