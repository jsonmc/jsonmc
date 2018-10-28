#include <iostream>
#include <list>

using namespace std;

class Graph {

	int n;

	list<int> *adj;

public:

	Graph(int n) {
		this->n = n;

		adj = new list<int>[n];
	}

	void addEdge(int v, int w) {
		adj[v].push_back(w);
	}

	void DFS_util(int v, bool visited[]) {

		visited[v] = true;

		cout << v << " ";

		for(auto it : adj[v]) {
			if(visited[it] == false) {
				DFS_util(it, visited);
			}
		}

	}

	void DFS(int s) {

		bool *visited = new bool[n];

		for(int i =0; i < n;i++) {
			visited[i] = false;
		}

		DFS_util(s, visited);

	}

};

int main()
{
    // Create a graph given in the above diagram
    Graph g(7);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(2, 3);
    g.addEdge(2, 5);
    g.addEdge(1, 6);
    g.addEdge(3, 4);
 
    cout << "Following is Depth First Traversal"
            " (starting from vertex 2) \n";
    g.DFS(0);
 
    return 0;
}
