CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra -O2
TARGET = main.cgi
SOURCE = main.cpp

all: $(TARGET)

$(TARGET): $(SOURCE)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SOURCE)

clean:
	rm -f $(TARGET)

install: $(TARGET)
	cp $(TARGET) /usr/lib/cgi-bin/ || echo "Please run with sudo or copy manually to your web server's cgi-bin directory"

.PHONY: all clean install 