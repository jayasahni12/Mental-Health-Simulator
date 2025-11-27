# Web CGI Wizard - C++ Project

A step-by-step web wizard built in C++ using CGI (Common Gateway Interface) that demonstrates Object-Oriented Programming (OOP) and Data Structures & Algorithms (DSA) concepts.

## Features Demonstrated

### Object-Oriented Programming (OOP)
1. **Inheritance**: Abstract base class `Step` with derived classes
   - `ProjectNameStep`
   - `LanguageStep` 
   - `FeaturesStep`
   - `SummaryStep`

2. **Polymorphism**: Virtual functions for rendering and input processing
   - `virtual string render() = 0`
   - `virtual void processInput(const string& input) = 0`
   - `virtual bool isValid() = 0`

3. **Encapsulation**: Private data members with public interfaces
   - `UserData` class with private `map<string, string> data`
   - Step classes with private member variables

4. **Composition**: `Wizard` class contains vector of `Step*` pointers

### Data Structures & Algorithms (DSA)
1. **Vector**: Dynamic arrays for storing steps and features
   - `vector<Step*> steps`
   - `vector<string> languages`
   - `vector<string> selectedFeatures`

2. **Map**: Key-value storage for user data
   - `map<string, string> data` in `UserData` class

3. **String Processing**: Algorithms for parsing and manipulation
   - URL decoding
   - Form data parsing
   - String tokenization

4. **Search Algorithms**: 
   - `find()` for vector searching
   - Map lookup operations

## Compilation

```bash
cd webcgi
make
```

## Installation

For XAMPP on Windows:
1. Copy `main.cgi` to `C:\xampp\cgi-bin\`
2. Ensure CGI is enabled in Apache configuration
3. Access via: `http://localhost/cgi-bin/main.cgi`

## Usage

The wizard guides users through 4 steps:
1. **Project Name**: Enter project name
2. **Language Selection**: Choose programming language
3. **Features**: Select desired features
4. **Summary**: Review all selections

## Technical Details

- **CGI Protocol**: Handles HTTP requests/responses
- **Form Processing**: Parses POST data and query strings
- **Session Management**: Maintains state across steps
- **HTML Generation**: Dynamic HTML output
- **Error Handling**: Input validation and error checking

## Educational Value

This project demonstrates:
- Modern C++ features (C++11)
- Web development with C++
- Real-world application of OOP principles
- Practical use of STL containers and algorithms
- CGI programming concepts 