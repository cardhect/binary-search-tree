function createNode(data, left, right) {
	return {
		data: data,
		left: left,
		right: right,
	};
}

class Tree {
	root;
	constructor(array, root) {
		root = this.buildTree(array);
		this.root = root;
	}

	buildTree(arr) {
		const sortedArray = mergeSort(arr);

		let start = 0;
		let end = sortedArray.length - 1;
		//If there is no other nodes to left or right of array left / right gets set to null.
		if (start > end) {
			return null;
		}
		let mid = Math.floor((start + end) / 2);
		let leftArray = sortedArray.slice(start, mid);
		let rightArray = sortedArray.slice(mid + 1, end + 1);
		//Creates new root node.
		let rootNode = new createNode(sortedArray[mid]);
		//sets left / right properties to correct node recusively
		rootNode.left = this.buildTree(leftArray);
		rootNode.right = this.buildTree(rightArray);

		return rootNode;
	}

	insert(val, nodeValue = this.root) {
		let value = val;
		let newNode = new createNode(value, null, null);

		if (nodeValue == null) {
			return this.root;
		}
		if (value < nodeValue.data) {
			// nodeValue = nodeValue.left;
			if (nodeValue.left == null) {
				nodeValue.left = newNode;
			}
			this.insert(value, (nodeValue = nodeValue.left));
		}
		if (value > nodeValue.data) {
			if (nodeValue.right == null) {
				nodeValue.right = newNode;
			}
			// nodeValue = nodeValue.right;
			this.insert(value, (nodeValue = nodeValue.right));
		}
	}

	minValue(root) {
		let minV = root.data;
		while (root.left != null) {
			minV = root.left.data;
			root = root.left;
		}
		return minV;
	}

	delete(value, root = this.root) {
		//Base Case
		if (root == null) {
			return root;
		}

		//Otherwise recursivley go down the tree.
		if (value < root.data) {
			root.left = this.delete(value, root.left);
		} else if (value > root.data) {
			root.right = this.delete(value, root.right);
		}
		//If it is not less or greater it is equal soo...
		//Since the value is the same as root, Then this node will be deleted.
		else {
			//Node with only one child or no children.
			if (root.left == null) {
				return root.right;
			} else if (root.right == null) {
				return root.left;
			}
			//Node with two children: Get the inorder successor (Next biggest number in the right sub tree, AKA The smallest in the right subtree.)
			root.data = this.minValue(root.right);
			//This deletes the inorder successor
			root.right = this.delete(root.data, root.right);
		}

		return root;
	}

	find(value, root = this.root) {
		if (value == root.data) {
			console.log(root);
			return root;
		}
		if (value < root.data) {
			root = this.find(value, root.left);
		}
		if (value > root.data) {
			root = this.find(value, root.right);
		}
		return root;
	}
	//Iteration Level Order Func
	levelOrder(func) {
		let root = this.root;
		let queue = [];
		queue.push(root);
		// let values = [];

		while (queue.length > 0) {
			if (queue[0].left != null) {
				queue.push(queue[0].left);
			}
			if (queue[0].right != null) {
				queue.push(queue[0].right);
			}

			func(queue[0]);

			queue.shift();
		}
	}
	//Recursive Level Order func
	RecursivelevelOrder(func, root = this.root, array = [null]) {
		//If no function is given
		if (func == undefined) {
			this.RecursivelevelOrder(printValue, root, array);
		}

		if (array.length == 0) {
			return;
		}

		if (array[0] == null) {
			array.shift();
			array.push(root);
		}

		if (array[0].left != null) {
			array.push(array[0].left);
		}
		if (array[0].right != null) {
			array.push(array[0].right);
		}

		func(array[0]);

		array.shift();

		this.RecursivelevelOrder(func, (root = array[0]), (array = array));
	}

	//Inorder traveses from smallest node to biggest. Left to right of tree
	inOrder(func, root = this.root, array = []) {
		//Returns an array of the node values inorder if no function is given.
		if (func === undefined) {
			var blah = function () {
				/* empty because ... */
			};
			func = blah;
			this.inOrder(blah, root, array);
			console.log(array);
			return array;
		}

		if (root.left != null) {
			this.inOrder(func, root.left, array);

			func(root);
			array.push(root.data);
			if (root.right != null) {
				this.inOrder(func, root.right, array);
			}
		}

		if (root.left == null) {
			func(root);
			array.push(root.data);
			//Checks root.right to make sure the rest of the tree is visited.
			if (root.right != null) {
				this.inOrder(func, root.right, array);
			}
			return;
		}
		//
	}
	//Preorder traveses in root -> left tree -> right tree
	preOrder(func, root = this.root, array = []) {
		if (root == null) {
			this.RecursivelevelOrder(printValue, root, array);
		}
		if (func != undefined) {
			func(root);
			array.push(root);
			// console.log(array);
		} else {
			var blah = function () {
				/* empty because ... */
			};
			func = blah;
			this.preOrder(func, root, array);
			return array;
		}

		if (root.left != null) {
			this.preOrder(func, root.left, array);
		}
		if (root.right != null) {
			this.preOrder(func, root.right, array);
		}

		if ((root.left && root.right) == null) {
			return;
		}
	}

	//Postorder traverses starting from bottom level of left tree to top of left tree -> bottom level right tree to top of right tree, then ending with root node.
	postOrder(func, root = this.root, array = []) {
		if (func == undefined) {
			var blah = function () {
				/* empty because ... */
			};
			func = blah;
			this.postOrder(func, root, array);
			console.log(array);
			return array;
		}
		if (root.left != null) {
			this.postOrder(func, root.left, array);
		}
		if (root.right != null) {
			this.postOrder(func, root.right, array);
		}
		if (root.left == null && root.right == null) {
			func(root);
			array.push(root);
			return;
		}
		func(root);
		array.push(root);
	}
	
	height(value,root = this.root, height = 0, level = 0) {
		if (value == root.data) {
			if ((root.left == null) && (root.right == null)) {
				//level = 1 return height as 0;
				return height;
			}

			if ((root.left != null) || (root.right != null)) {
				if (height == level) {
					height++;
					level++;
				}
				if (root.left != null) {
					height = this.height(root.left.data,root.left,height,level)
				}
				if (root.right != null) {
					if (level == 1) {
						height = 1;
					}
					height =  this.height(root.right.data,root.right,height,level)
				}
			}
			
		} else if (value < root.data) {
			let leftNode = root.left;
			return this.height(value, leftNode);
		} else if (value > root.data) {
			let rightNode = root.right;
			return this.height(value, rightNode);
		}

		return height;
	

	}

	depth(nodeVal,root = this.root, depthCount = 0){
		if ((depthCount == 0) && (nodeVal == root.data)) {
			return depthCount;
		}
		if (nodeVal < root.data) {
			depthCount++;
			return this.depth(nodeVal, root.left, depthCount);
		}
		if (nodeVal > root.data) {
			depthCount++;
			return this.depth(nodeVal, root.right, depthCount)
		}

		if (nodeVal == root.data) {
			return depthCount;
		}

	}

	isBalanced(nodeTree = this.root){
		let leftTreeHeight = this.height(nodeTree.left.data);	
		let rightTreeHeight = this.height(nodeTree.right.data);
		let differenceLeft = leftTreeHeight - rightTreeHeight;
		let differenceRight = rightTreeHeight - leftTreeHeight;
		
		if ((differenceLeft === 1) || (differenceRight === 0))  {
			console.log('tree is balanced');
			return true;
		} else {
			console.log('tree is not balanced');
			return false;

		}

	}

	rebalance() {
		let balancedArray = this.inOrder();
		this.root = this.buildTree(balancedArray);
		return this.root;
	}
}

function removeDuplicates(array) {
	//remove duplicated from sorted array
	let i = 0;
	let j = 1;
	while (true) {
		if (j == array.length) {
			break;
		}
		if (array[i] == array[j]) {
			array.splice(i,1);
			continue;
		} else if (array[i] != array[j]) {
			i++;
			j++;
			continue;
		}
	}
	console.log('duplicates removed: ' + array);
	return array;

}

//Seperate Functions...
function mergeSort(array) {

	if (array.length < 2) {
		return array;
	}
	let arrayHalf = Math.round(array.length / 2);
	let splicedArray = array.splice(0, arrayHalf);
	let leftSide = mergeSort(splicedArray);
	let rightSide = mergeSort(array);

	return mergeArrays(leftSide, rightSide);
}

function mergeArrays(left, right) {
	let sortedArray = [];
	while (true) {
		if (left[0] < right[0]) {
			sortedArray.push(left.shift());
		} else if (left[0] > right[0]) {
			sortedArray.push(right.shift());
		} else if (left[0] == right[0]) {
			sortedArray.push(left.shift());
			sortedArray.push(right.shift());
		}

		if (left.length == 0) {
			sortedArray.push(...right);
			break;
		} else if (right.length == 0) {
			sortedArray.push(...left);
			break;
		}
	}


	return sortedArray;
}

//Code from TOP to print out the binary search tree.
const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

function printValue(node) {
	console.log(node.data);
}

function printNodeValues(node) {
	console.log('printing.... ' + node.data);
}

//Testing
function runTestScript() {
	let arrOne = [4, 1, 6, 85, 7, 8, 2, 3,10,9,12,55,0];
	removeDuplicates(arrOne);
	const binaryTree = new Tree(arrOne);
	binaryTree.isBalanced();
	binaryTree.levelOrder(printNodeValues);
	binaryTree.preOrder(printNodeValues);
	binaryTree.postOrder(printNodeValues);
	binaryTree.inOrder()
	binaryTree.insert(24);
	binaryTree.insert(76);
	binaryTree.insert(16);
	binaryTree.insert(44);
	binaryTree.insert(42);
	binaryTree.insert(98);
	binaryTree.insert(23);
	binaryTree.isBalanced();
	binaryTree.rebalance();
	
	binaryTree.levelOrder(printNodeValues);
	binaryTree.postOrder(printNodeValues);
	binaryTree.inOrder(printNodeValues)
	binaryTree.preOrder(printNodeValues);


	prettyPrint(binaryTree.root);
}

runTestScript();

