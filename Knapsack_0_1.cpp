#include <iostream>
#include <vector>
#include <bits/stdc++.h>

using namespace std;

int max (int a, int b) {
	
	return (a > b) ? a : b;
}

int main() {
	int maxWt, n;
	
  // this is the max weight which our sack can have
	cin >> maxWt;
	
  // no of items available
	cin >> n;
	
  // vector of pairs will contain weight and cost (val) of every item
	vector < pair <int, int> > items;
	
	int wt, val;
	
  // taking input of weight and cost of all items
	for(int i = 0; i < n; i++) {
		cin >> wt >> val;	
		items.push_back( make_pair(wt, val));
	}
	
  // creating a matrix of (n + 1) X (maxWt + 1) 
  // basically rows = no. of items and cols = 1, 2, 3 ... maxWt
  // both rows and cols will have one additional size for intial 0s
	int mat[n+1][maxWt + 1];
	
  // initializing every cell with 0
	for (int i = 0; i < n + 1; i++) {
		for (int j = 0; j < maxWt+1; j++) {
			mat[i][j] = 0;
		}
	}
	
	for (int i = 1; i < n + 1; i++) {
		for (int j = 1; j < maxWt+1; j++) {
			if(j < items[i-1].first) {
      
        // if j means total weight is less than weight of next item
        // then we will not consider that item
        // so value of last row means value till inclusion of last item will be copied
				
        mat[i][j] = mat[i-1][j] ;
        
			} else {
      
        // if we can accommodate this item 
        // then we will tak max of, value till last item included 
        // and value after this element included (in this case we will subtract weight of
        // this item from total weight which can be accommated
        
				mat[i][j] = max ( items[i-1].second + mat[i-1][j - items[i-1].first], mat[i-1][j]);
        
			}
		}
	}
	
	for (int i = 0; i < n + 1; i++) {
		for (int j = 0; j < maxWt+1; j++) {
			cout << mat[i][j] << " ";
		}
		cout << endl;
	}	
	
	cout << endl << "Max value can be achieved in weight " << wt << " is : " << mat[n][maxWt];
	
	cout << endl << "Items which will be included are : " << endl ;
	
	int i = n, j = maxWt;
	
	while(i > 0 && j > 0) {
		if(mat[i][j] == mat[i-1][j]) {
			i--;
		} else {
			cout << "Item no : " << i << " , weight : " << items[i-1].first << " and value : " << items[i-1].second << endl;
			j = j - items[i-1].first;
			i--;
		}
	}
	
	return 1;
}
