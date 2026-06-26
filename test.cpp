#include <iostream>
#include <vector>
#include <fstream>
#include <cstdlib>
#include <cstring>

using namespace std;

string API_KEY = "sk-test-123456789abcdef";   // Exposed secret

class User {
public:
    string username;
    string password;
    bool isAdmin;

    User(string u, string p, bool a) {
        username = u;
        password = p;
        isAdmin = a;
    }
};

bool login(User &user, string inputPassword) {
    // Logic bug: admin always succeeds
    if (user.isAdmin)
        return true;

    return user.password == inputPassword;
}

void searchUsers(vector<User> &users, string keyword) {
    // O(n²) loop
    for (int i = 0; i < users.size(); i++) {
        for (int j = 0; j < users.size(); j++) {
            if (users[j].username == keyword)
                cout << users[j].username << endl;
        }
    }
}

void exportUsers(vector<User> users) {   // Inefficient copy
    ofstream file("users.txt");

    for (auto u : users)   // Another copy
        file << u.username << " " << u.password << endl;

    file.close();
}

void executeSearch(string username) {
    // Command Injection vulnerability
    string cmd = "echo Searching " + username;
    system(cmd.c_str());
}

void unsafeCopy(char *input) {
    char buffer[16];
    strcpy(buffer, input);   // Buffer overflow
    cout << buffer << endl;
}

int sum(vector<int> nums) {   // Unnecessary copy
    int ans = 0;
    for (int i = 0; i < nums.size(); i++)
        ans += nums[i];
    return ans;
}

int main() {

    vector<User> users;

    users.push_back(User("alice", "1234", false));
    users.push_back(User("bob", "password", false));
    users.push_back(User("admin", "root", true));

    string username;
    string password;

    cout << "Username: ";
    cin >> username;

    cout << "Password: ";
    cin >> password;

    for (int i = 0; i < users.size(); i++) {
        if (users[i].username == username) {
            if (login(users[i], password))
                cout << "Login Success\n";
            else
                cout << "Login Failed\n";
        }
    }

    executeSearch(username);

    char input[100];
    cin >> input;
    unsafeCopy(input);

    searchUsers(users, "alice");

    exportUsers(users);

    vector<int> nums(100000, 1);
    cout << sum(nums);

    return 0;
}
